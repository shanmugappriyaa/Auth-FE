import React, { useState } from "react";
import AxiosService from "../common/ApiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const validateForgotPassword = async (e) => {
    e.preventDefault();
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
            <div className="form-outline">
              <label className="form-label" htmlFor="typeEmail">
                Email
              </label>
              <input
                type="email"
                id="typeEmail"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control my-3"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => validateForgotPassword(e)}
            >
              Submit
            </button>
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
