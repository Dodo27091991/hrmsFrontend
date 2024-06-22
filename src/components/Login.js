import React, { useState } from 'react'
//import {useHistory} from 'react-router-dom'
import   {useNavigate} from 'react-router-dom'


const Login = (props) => {

  let navigate =useNavigate()
  const [credential, setCredential] = useState({
    email:'',
    password:''
  })

  const {setType, setAlert, setMessage}=props

    const handleMessage =(type,msg)=>{
      setAlert(true)
      setType(type)
      setMessage(msg);
    
      setTimeout(() => {
          setAlert(false)
      }, 5000);
    }

  const handleLogin= async(e)=>{
    e.preventDefault()
    //  http://localhost:5500/api/v1/login

    
    const response = await fetch('http://localhost:5500/api/v1/login/',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email:credential.email,password:credential.password})
    })

    const data= await response.json()

    if(data.status==='Password reset required'){
      localStorage.setItem('tempPassword',credential.email)
      navigate('/resetPassword')
    }

    if(data.status==='success'){
    localStorage.setItem('token',data.token)
    localStorage.setItem('role',data.role)
    localStorage.setItem('name',data.name)
    console.log(data)
    navigate('/hrms')
    
    }
    else {
      handleMessage(data.status,data.message)
    }
  }
  
  
  const handleChange = (e)=>{
    e.preventDefault()
    setCredential({...credential,[e.target.name]:e.target.value})
  }




  return (
    <div className=' row' style={{height:"800px", background:'rgb(60, 140, 166)'}}>
        <div className='col-md-4'>  </div>
        <div className='col-md-4'></div>
        <div className='col-md-4 ' style={{borderLeft:'1px solid', marginTop:'80px', marginBottom:'350px', width:'450px' ,backgroundColor: 'rgb(139, 157, 164)'}}>

    <form className='my-5' onSubmit={handleLogin} >
    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" name='email' value={credential.email} onChange={handleChange} >{}</input>

  <br />
    <label htmlFor="inputPassword2" >Password</label>
    <input type="password" className="form-control" name='password' value={credential.password} onChange={handleChange}></input>
  <br />
    <button type="submit" className="btn btn-primary mb-3 my-3">Login</button>
  
</form>

</div>
    </div>
  )
}

export default Login