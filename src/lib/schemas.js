export const LoginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
});

import * as yup from "yup";

export const updateSchoolSchema = yup.object({
  school_name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "School Name must be at most 50 characters")
    .required("School Name is required"),
  local_government: yup.string().trim().required("LGA is required"),
  school_code: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .required("School code is required"),
  owner: yup.string().trim().required("School Owner  is required"),
  pin_limit: yup.number().required("School Quota  is required"),
  exam_type: yup.string().trim().required("Exam type is required"),
});

export const addAdminSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Admin Name must be at most 50 characters")
    .required("Admin Name is required"),
  email: yup
    .string()
    .email("Invalid email address entered")
    .trim()
    .required("Admins Email is required"),
  password: yup
    .string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .required("Password is required")
    .max(15, "Password must be at most 15 characters"),
  password_confirmation: yup
    .string()
    .trim()
    .strict(true)
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .max(15, "Confirm password must be at most 15 characters"),
  status: yup.string().trim().required("Admin status is required"),
});

export const editAdminSchema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9\s]*$/, "Invalid characters")
    .max(50, "Admin Name must be at most 50 characters"),
  email: yup
    .string()
    .email("Invalid email address entered")
    .trim()
    .required("Admins Email is required"),
  password: yup
    .string()
    .trim()
    .strict(true)
    .min(7, "Password must be at least 7 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .max(15, "Password must be at most 15 characters"),
  password_confirmation: yup
    .string()
    .trim()
    .strict(true)
    .when("password", {
      is: (val) => val && val.length > 0,
      then: (schema) =>
        schema
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*#?&]/,
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
          )
          .max(15, "Password must be at most 15 characters")
          .required("Confirm password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  status: yup.string().trim(),
});
