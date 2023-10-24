import React from "react";
import AxiosService from "../common/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function ForgotPassword() {

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email should not be empty")
      .email("Invalid email"),
  });

  const onSubmit = async (value) => {
    console.log(value);

    const { email } = value;
    try {
      await AxiosService.post("user/forgotPassword", { email });
      toast.success("sent a mail to your registerd E-mail.pls check!");
      console.log(email);
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Please try after some time"
      );
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="card">
        <div className="card-header text-center h5 text-white bg-primary">
          Forgot Password
        </div>
        <div className="row d-flex  justify-content-center my-5 ">
          <div className="col col-md-5">
            <p className="font-weight-light py-2">
              Enter your email address and we'll send you an email with
              instructions to reset your password.
            </p>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {(formik) => {
                return (
                  <>
                    <Form>
                      <div className="form-outline my-3">
                        <label className="form-label" htmlFor="typeEmail">
                          Email
                        </label>
                        <Field
                          type="email"
                          id="typeEmail"
                          name="email"
                          placeholder="your@email.com"
                          className="form-control"
                        />
                        <ErrorMessage name="email">
                          {(msg) => (
                            <label className="text-danger">*{msg}</label>
                          )}
                        </ErrorMessage>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!(formik.dirty && formik.isValid)}
                      >
                        Submit
                      </button>
                    </Form>
                  </>
                );
              }}
            </Formik>
            <div className="d-flex justify-content-between mt-4">
              <Link to="/">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
