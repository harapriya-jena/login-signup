import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { Button, Box, InputAdornment, IconButton, Stack } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const FormikForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  buttonText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box
            maxWidth={400}
            mx="auto"
            p={4}
            borderRadius={3}
            boxShadow={3}
            sx={{
              backgroundColor: "#ffffff", // Light white background
            }}
          >
            <Stack spacing={2}>
              {fields.map((field) => (
                <Field
                  key={field.name}
                  component={TextField}
                  fullWidth
                  name={field.name}
                  type={
                    field.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field.type
                  }
                  label={field.label}
                  InputProps={{
                    startAdornment: field.icon && (
                      <InputAdornment position="start">
                        {field.icon}
                      </InputAdornment>
                    ),
                    endAdornment:
                      field.name === "password" ? (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                  }}
                />
              ))}

              {/* Submit Button directly below fields */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {buttonText}
              </Button>
            </Stack>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormikForm;
