import React from "react";
import { Link } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { ErrorMessage, useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate} from "react-router-dom";
import * as Yup from "yup";

function Loginpage() {

  let navigate= useNavigate()

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email should not be empty")
      .email("Invalid email"),
    password: Yup.string()
      .required("Password should not be empty")
      .min(6, "password should be minimum 6 char"),
  });

  const onSubmit = async (value) => {
    const { email, password } = value;
    try {
      let res = await AxiosService.post("/user/login", {
        email,
        password,
      });
      toast.success("Login Successfull");
      navigate('/home')
    } catch (error) {
      toast.error(error.response.data.message || "Error occured ");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <>
      <ToastContainer position="top-right" />
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={formik.handleSubmit}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    className="form-control form-control-lg"
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <label className="text-danger">
                      *{formik.errors.email}
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                  <input
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    className="form-control form-control-lg"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <label className="text-danger">
                      *{formik.errors.password}
                    </label>
                  ) : (
                    ""
                  )}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <Link to="/forgetpassword">Forgot password?</Link>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn btn-primary  btn-block mb-4"
                >
                  Sign in
                </button>

                {/* <!-- Register buttons --> */}
                <div className="text-center">
                  <p>
                    Not a member? <Link to="/register">Register Here!</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Loginpage;
