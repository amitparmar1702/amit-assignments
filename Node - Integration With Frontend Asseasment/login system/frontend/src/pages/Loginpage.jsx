import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
function Loginpage() {

  const [logininfo,setLogininfo] = useState({
    email:'',
    password:''
  })
const navigate = useNavigate();

const handleChange = (e) =>{
   const {name , value} = e.target;
   console.log(name,value);
   const copyLogininfo = {...logininfo};
   copyLogininfo[name] = value;
   setLogininfo(copyLogininfo);
}

console.log('singinfo --', logininfo)


const handleloginup = async(e) =>{
  e.preventDefault();
  const {email , password} = logininfo
  if(!email || !password){
      return handleError('email and password are required')
  }
  try {
    const url = "http://localhost:4545/auth/login"
    const reaspose = await fetch(url , {
      method:'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(logininfo)
    }) 
 
const result = await reaspose.json(); 
const { success, message , jwtToken, name, error } = result;

if (success) {
  handleSuccess(message);
  localStorage.setItem('token',jwtToken)
  localStorage.setItem('loggedInuser',name)
  setTimeout(() => {
    navigate('/home');
  }, 1000);
}else if(error){
const details = error.details[0].message
handleError(details)
} else if(!success){
  handleError(message)
}

    console.log(result)
  } catch (error) {
    handleError(error)
  }
}
  return (
    <>
        <div className="signup-container">
      <h1>Login  Now</h1>
      <form className="signup-form" onSubmit={handleloginup}>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" id="email" value={logininfo.email} placeholder="Enter Your Email..." onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input type="password" name="password" id="password"value={logininfo.password} placeholder="Enter Your Password..." onChange={handleChange}/>
        </div>

        <button className="signup-button">Sign Up</button>
        <p className="login-link">
          Doest'n have an account? 
          <Link to="/singup">Sign Now</Link>
        </p>
      </form>
    </div>
      <ToastContainer />
    </>
  )
}

export default Loginpage
