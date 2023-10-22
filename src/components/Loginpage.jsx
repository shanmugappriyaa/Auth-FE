import React, { useState } from 'react'
import { Link} from "react-router-dom"
import AxiosService from '../common/ApiService'

import { ToastContainer, toast } from "react-toastify";


function Loginpage() {
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')

 let validateLogin = async(e)=>{
  e.preventDefault()
  try {
    let res = await AxiosService.post('/user/login',{
      email,password
    })
    
      toast.success("Login Successfull")
  
    
  } catch (error) {
    toast.error(error.response.data.message || "Error occured ")
    
  }
  
 }
  return <>
   <ToastContainer position="top-right" />
  <section className="vh-100">
  <div className="container py-5 h-100">
    <div className="row d-flex align-items-center justify-content-center h-100">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone image" />
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form>
          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form1Example13">Email address</label>
            <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control form-control-lg" />
            
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form1Example23">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control form-control-lg" />
            
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            {/* <!-- Checkbox --> */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
              <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
            </div>
            <Link to="/forgetpassword">Forgot password?</Link>
          </div>

          {/* <!-- Submit button --> */}
          <button type="button" className="btn btn-primary  btn-block mb-4" onClick={(e)=>validateLogin(e)}>Sign in</button>

          {/* <!-- Register buttons --> */}
  <div className="text-center">
    <p>Not a member?  <Link to="/register">Register Here!</Link></p> 
  </div>
                   

        </form>
      </div>
    </div>
  </div>
</section>

    </>
}

export default Loginpage

  