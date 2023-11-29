import { React } from "react";
import AxiosService from "../common/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

function Resetpage() {
  const { id } = useParams();
  console.log("rest --------id-----> ", id);
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("Password is required")
      .min(6, "Password Should be minimum 6 char"),
    confirmPassword: Yup.string()
      .required("Password should not be empty")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });
  const onSubmit = async (value) => {
    const { newPassword, confirmPassword } = value;

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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  let navigate = useNavigate();

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="card">
        <div className="card-header text-center h5 text-white bg-primary">
          Reset Password
        </div>
        <div className="row d-flex  justify-content-center my-5 ">
          <div className="col col-md-5">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label className="form-label  col-form-label">
                  New Password{" "}
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <label className="text-danger">
                    *{formik.errors.newPassword}
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group my-2">
                <label className="form-label  col-form-label">
                  Confirm Password{" "}
                </label>
                <input
                  name="confirmPassword"
                  className="form-control"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <label className="text-danger">
                    *{formik.errors.confirmPassword}
                  </label>
                ) : (
                  ""
                )}
              </div>
            <button
              className="btn btn-primary  btn-block mt-2 mb-4"
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
            >
              Reset
            </button>{" "}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resetpage;
