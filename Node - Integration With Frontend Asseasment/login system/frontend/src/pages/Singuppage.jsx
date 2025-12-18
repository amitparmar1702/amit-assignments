import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../../util'
function Singuppage() {

  const [singinfo,setSinginfo] = useState({
    name:'',
    email:'',
    password:''
  })
const navigate = useNavigate();
const handleChange = (e) =>{
   const {name , value} = e.target;
   console.log(name,value);
   const copySinginfo = {...singinfo};
   copySinginfo[name] = value;
   setSinginfo(copySinginfo);
}

console.log('singinfo --', singinfo)


const handlesingup = async(e) =>{
  e.preventDefault();
  const {name , email , password} = singinfo
  if(!name || !email || !password){
      return handleError('name , email and password are required')
  }
  try {
    const url = "http://localhost:4545/auth/signup"
    const reaspose = await fetch(url , {
      method:'POST',
      headers:{
        'content-type' : 'application/json'
      },
      body: JSON.stringify(singinfo)
    }) 
 
const result = await reaspose.json(); 
const { success, message , error } = result;

if (success) {
  handleSuccess(message);
  setTimeout(() => {
    navigate('/');
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
      <h1>Signup Now</h1>
      <form className="signup-form" onSubmit={handlesingup}>
        <div className="form-group">
          <label htmlFor="name">Name :</label>
          <input type="text" name="name" id="name" value={singinfo.name} placeholder="Enter Your Name..." onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" name="email" id="email" value={singinfo.email} placeholder="Enter Your Email..." onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password :</label>
          <input type="password" name="password" id="password"value={singinfo.password} placeholder="Enter Your Password..." onChange={handleChange}/>
        </div>

        <button className="signup-button">Sign Up</button>
        <p className="login-link">
          Already have an account? <Link to="/">Login Now</Link>
        </p>
      </form>
    </div>
      <ToastContainer />
    </>
  )
}

export default Singuppage
