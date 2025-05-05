import React, { useState } from 'react';
import * as Yup from 'yup';
import { Container, Paper, Typography, Box, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import FormikForm from '../components/FormikForm';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const fields = [
    { name: 'email', label: 'Email', type: 'email', icon: <EmailIcon /> },
    { name: 'password', label: 'Password', type: 'password', icon: <LockIcon /> },
  ];

  const handleSubmit = async (values, { setSubmitting , resetForm }) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', values);
      alert(res.data.message);

      // Store token and redirect user
      localStorage.setItem('token', res.data.token);

      resetForm();//reset the form
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={10}
        sx={{
          p: 4,
          bgcolor: '#f0f4ff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Sign In
        </Typography>

        <FormikForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          fields={fields}
          buttonText={loading ? 'Processing...' : 'Login'}
        />
        <Box mt={2} textAlign="center">
          <Typography>
            Don't have an account?{' '}
            <MuiLink component={Link} to="/register">Sign Up</MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
