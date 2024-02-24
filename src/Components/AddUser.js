import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const UserForm = ( close ) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      gender: Yup.string().required("Gender is required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://gorest.co.in/public/v2/users",
          values,
          {
            headers: {
              Authorization: `Bearer 7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7`,
            },
          }
        );
        console.log("Success:", response.data);
        formik.resetForm();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
  });
 

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          id="nameß"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && formik.errors.name}
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && formik.errors.email}
          required
        />
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Gender:</Form.Label>
        <Form.Select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.gender && formik.errors.gender}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.gender}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status:</Form.Label>
        <Form.Select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.status && formik.errors.status}
          required
        >
          <option value="">Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Form.Select>
        <Form.Control.Feedback type="invalid">{formik.errors.status}</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={close}>
        Add User
      </Button>
    </Form>
  );
};

export default UserForm;
