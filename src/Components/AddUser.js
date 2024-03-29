import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import {
  adduser,
  statusOptions,
  genderOptions,
  headers,
  access,
} from "../utils/data";
import ApiServices from "../Constants/ApiServices";

const emailSchema = Yup.string()
  .email("Invalid email address")
  .required("Email is required")
  .matches(/@(gmail\.com|yahoo\.com|outlook\.com)$/, "Invalid email provider");

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: emailSchema,
  gender: Yup.string().required("Gender is required"),
  status: Yup.string().required("Status is required"),
});

const UserForm = ({ close, fetchData }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      gender: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await ApiServices.createData(values)
        fetchData();
        console.log("Success:", response.data);
        formik.resetForm();
        close();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">{adduser.name}</Form.Label>
        <Form.Control
          type="text"
          name="name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.name && formik.errors.name}
          required
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.name}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{adduser.email}</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.email && formik.errors.email}
          required
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{adduser.gender}</Form.Label>
        <Form.Select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.gender && formik.errors.gender}
          required
        >
          {genderOptions &&
            genderOptions.length > 0 &&
            genderOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.gender}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>{adduser.status}</Form.Label>
        <Form.Select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isInvalid={formik.touched.status && formik.errors.status}
          required
        >
          {statusOptions?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {formik.errors.status}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={() => {
          formik.isValid && close();
        }}
        disabled={!formik.isValid || !formik.dirty}
      >
        {access[4]}
      </Button>
    </Form>
  );
};

export default UserForm;
