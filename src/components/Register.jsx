import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { ToastContainer, toast } from "react-toastify";

function Register() {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  let validateRegister = async (e) => {
    e.preventDefault();
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
              <form>
                <div className="form-group">
                  <label className="form-label  col-form-label">
                    Enter Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group  my-2">
                  <label className="form-label  col-form-label">
                    Enter Your Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                  />
                </div>
                <div className="form-group">
                  <label className=" col-form-label">Enter Your Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-outline my-4">
                  <button
                    type="button"
                    onClick={(e) => validateRegister(e)}
                    className="btn btn-primary"
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
