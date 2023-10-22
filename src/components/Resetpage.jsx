import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AxiosService from "../common/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Resetpage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  let navigate = useNavigate();

  const validatePassword = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword)
      return toast.error(
        "New and Confirm Passwords are mismatched . Please try again"
      );

    try {
      let res = await AxiosService.put("/user/resetPassword", {
        id,
        password: newPassword,
      });
      toast.success("Password Reset Successfuuly");
      navigate("/");
    } catch (error) {
      toast.error("Error Occurred. Please try again later");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="card">
        <div className="card-header text-center h5 text-white bg-primary">
          Reset Password
        </div>
        <div className="row d-flex  justify-content-center my-5 ">
          <div className="col col-md-5">
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                classNameName="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Button
              variant="primary"
              className=" my-4"
              onClick={(e) => validatePassword(e)}
            >
              Reset
            </Button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Resetpage;
