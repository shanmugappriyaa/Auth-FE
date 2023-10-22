import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService from "../common/ApiService";

function OtpPage() {
  const [Otp, setOtp] = useState("");
  const { id } = useParams();
  let navigate= useNavigate()
  
  const validateOtp = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/user/otp", {
        id,
        OTP: Otp,
      });

      toast.success("Register Successfully");
      navigate("/reset/"+id);
    } catch (error) {
      console.log("error", error);
      toast.error("Error Occurred. Please try again later");
    }
  };
  return (
    <>
      <ToastContainer position="top-right" />
      
        <div className="card">
        <div className="card-header text-center h5 text-white bg-primary">
           OTP Verification
        </div>
        <div className="row d-flex  justify-content-center my-5 ">
          <div className="col col-md-5">
            <form>
            <div className="form-group my-2">
                  <label className=" col-form-label">Enter Your OTP</label>
                <input
                  type="text"  className="form-control"
                  value={Otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4">
                <button
                  type="button"
                  onClick={(e) => validateOtp(e)}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          </div>
        </div>
      
    </>
  );
}

export default OtpPage;
