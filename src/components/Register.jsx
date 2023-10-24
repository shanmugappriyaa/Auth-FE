import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function Register() {
  const initialValues = {
    userName:"",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName:Yup.string()
    .required("UserName should not be empty")
    .min(5,"UserName Should be minimum 5 char"),
    email: Yup.string()
      .required("Email should not be empty")
      .email("Invalid email"),
    password: Yup.string()
      .required("Password should not be empty")
      .min(6, "password should be minimum 6 char"),
  });

  const onSubmit = async (value) => {
    const { userName,email, password } = value;
    try {
      let res = await AxiosService.post("/user/create", {
        userName,
        email,
        password,
      });
      if (res != null) {
        toast.success("Register Successfully");
        // navigate('/')
      }
    } catch (error) {
      toast.error("Error Occurred. Please try again later");
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });


  let navigate = useNavigate();

      

  return (
    <>
      <ToastContainer position="top-right" />
      <section className="vh-100">
        <div className="card">
          <div className="card-header text-center h5 text-white bg-primary">
            CREATE AN ACCOUNT
          </div>
          <div className="row d-flex  justify-content-center my-5 ">
            <div className="col col-md-6">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className="form-label  col-form-label">
                    Enter Your Name
                  </label>
                  <input  type="text"  className="form-control"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="userName"
                    placeholder="Your Name"
                  />
                       {formik.touched.userName && formik.errors.userName ? (
                    <label className="text-danger">
                      *{formik.errors.userName}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group  my-2">
                  <label className="form-label  col-form-label">
                    Enter Your Email
                  </label>
                  <input
                      type="email" className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email"
                    placeholder="Your Email"
                  />
                          {formik.touched.email && formik.errors.email ? (
                    <label className="text-danger">
                      *{formik.errors.email}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label className=" col-form-label">Enter Your Password</label>
                  <input
                     type="password"  className="form-control"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     name="password"
                    placeholder="Your Password"
                  />
                       {formik.touched.password && formik.errors.password ? (
                    <label className="text-danger">
                      *{formik.errors.password}
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-outline my-4">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                  className="btn btn-primary  btn-block mb-4"
                >
                    Register
                  </button>
                </div>
                <div className="form-group row">
                  <p className="text-center text-muted mt-5 mb-0">
                    Have already an account?
                    <Link to="/">Login here</Link>
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

export default Register;
