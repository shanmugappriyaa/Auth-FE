import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AxiosService from "../common/ApiService";
import { useFormik } from "formik";
import * as Yup from "yup";

function OtpPage() {
  let navigate= useNavigate()
  const initialValues = {
    Otp:"", 
  };
  const validationSchema = Yup.object({
    Otp:Yup.string()
    .required("OTP should not be empty")
    .min(6,"OTP Should be  6 char"),
  });
  const onSubmit = async (value) => {
    const { Otp} = value;
    const { id } = useParams();
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
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema,
    });
 
  
 
    
  return (
    <>
      <ToastContainer position="top-right" />
      
        <div className="card">
        <div className="card-header text-center h5 text-white bg-primary">
           OTP Verification
        </div>
        <div className="row d-flex  justify-content-center my-5 ">
          <div className="col col-md-5">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group my-2">
                  <label className=" col-form-label">Enter Your OTP</label>
                <input
                  type="text"  className="form-control"
                  value={formik.values.Otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Otp"
                />
                           {formik.touched.Otp && formik.errors.Otp ? (
                    <label className="text-danger">
                      *{formik.errors.Otp}
                    </label>
                  ) : (
                    ""
                  )}
              </div>
              <div className="form-outline mb-4">
                <button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
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
