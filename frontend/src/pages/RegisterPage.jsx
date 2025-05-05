import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import FormikForm from "../components/FormikForm";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const fields = [
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      icon: <PersonIcon />,
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      icon: <PersonIcon />,
    },
    { name: "username", label: "Username", type: "text", icon: <PersonIcon /> },
    { name: "email", label: "Email", type: "email", icon: <EmailIcon /> },
    {
      name: "password",
      label: "Password",
      type: "password",
      icon: <LockIcon />,
    },
  ];

  const handleSubmit = async (values, { setSubmitting , resetForm}) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        values
      );
      alert(res.data.message);

      resetForm();//reset the form
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        sx={{
          p: 4,
          bgcolor: "#f0f4ff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Sign Up
        </Typography>
        <FormikForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          fields={fields}
          buttonText={loading ? "Processing..." : "Sign Up"}
        />
        <Box mt={2} textAlign="center">
          <Typography>
            Already have an account?{" "}
            <MuiLink component={Link} to="/login">
              Sign In
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
