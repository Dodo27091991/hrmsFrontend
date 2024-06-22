import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

const PasswordReset = (props) => {

    const {setAlert,setMessage,setType}=props
    const [progress, setProgress] = useState(false)
    // eslint-disable-next-line
    const navigate=useNavigate() 
    const [credential, setCredential] = useState({
        email:localStorage.getItem('tempPassword'),
        password:'',
        resetPassword:'',
        confirmResetPassword:''
    })

    
    

    const handleSubmit = async()=>{
       
        setProgress(true)
        const response = await fetch('http://localhost:5500/api/v1/resetPassword',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        email:credential.email,
        password:credential.password,
        changedPassword:credential.resetPassword,
        confirmChangedPassword:credential.confirmResetPassword
    })
    })

    const data= await response.json()
    console.log(data.status)
    console.log(data.message)
    setProgress(false)
    if(data.status==='Success')
    {
        setAlert(true)
        setType('success')
        setMessage(data.message)
        console.log('Pass 1')
        setTimeout(() => {
            setMessage('Redirecting to login page')
            console.log('Pass 2')  
        }, 3000);

        setTimeout(() => {
            setAlert(false)
            setType('danger')
            console.log('Pass 4')
            setMessage('')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            
            navigate('/login')

        }, 6000);


    }
    else{
        setAlert(true)
        setMessage(data.message)
        setTimeout(() => {
            setAlert(false)
        setMessage('')
        }, 3000);
    }
    }



   const handleChange = (e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
      }
    

  return (
    <>

    {progress && <Loading />}

    <div className='my-1' style={{marginTop:'100px',background:'rgb(60, 140, 166)'}}>




        <div className='row' >
<div className='col-md-6'>
<h2>Employement Policy :</h2>
<p style={{marginTop:'80px', marginLeft:'30px', width:'650px'}}>

Separation of Concerns: Consider breaking down your code into smaller components. Each component should ideally have a single responsibility. For example, you can create separate components for the dropdowns, the table, and each day cell.
<br />
Use of Hooks: You're using React hooks like useState and useEffect, which is good. Make sure to handle side effects correctly in useEffect and clean up when the component is unmounted if necessary.
<br />
CSS Classes: You're using Bootstrap classes for styling, which is good for quick styling. However, you might want to consider defining more of your own styles in your CSS files to make your components more customizable and easier to maintain.
<br />
Hardcoded API URL: The API URL is hardcoded as http://localhost:5500. In a production environment, you'd want to use environment variables or some dynamic way to set the API URL.
<br />
Conditional Rendering: Your conditional rendering for the "Present" button is quite complex. You might want to refactor that logic to make it more readable.
<br />
Unused Variables: There are some variables declared but not used, such as day, month, year in the Card component. Make sure to remove any unused variables for cleaner code.
<br />
Error Handling: Consider adding error handling for your API requests. Currently, you're assuming a successful request. Adding error handling would make your application more robust.
<br />
Code Duplications: There's a significant amount of code duplication in the rendering of days. Consider using a loop to render the days dynamically, which would reduce redundancy and make your code more maintainable.
<br />
Button Click Handler: The handleMarkAttendance function calls an API but doesn't handle any response or errors. You might want to add logic for this.
<br />
Styling: Pay attention to styling consistency. For example, you're using both Bootstrap and inline styles. Consider sticking to one for a cleaner codebase.
<br />
Refactor Hardcoded Values: You have some hardcoded values like years in the dropdown. It might be better to generate them dynamically or at least put them in constants for easier maintenance.
<br />
Remember, these are suggestions, and how much you implement depends on your specific requirements and coding style. Good luck with your React project!

</p>
</div>

<div className='col-md-6' >
{/*<form style={{marginTop:'80px',marginLeft:'40px',width:"600px", height:'800px', borderRadius:'5%'}}>*/}
<div style={{marginTop:'80px',marginLeft:'40px',width:"600px", height:'800px', borderRadius:'5%'}}>
  <div className="container mb-3 my-1" style={{background:'white', border:'1px solid',borderRadius:'5%' }} >
    
    <h4 className='my-2' style={{textAlign:'center'}}><b>Reset Password :</b></h4>
    
    <label className="form-label my-2">email</label>
    <input type="text" name='email' value={credential.email}  onChange={handleChange} className="form-control" />

    <label className="form-label my-2">Password</label>
    <input type="password" name='password'  onChange={handleChange} className="form-control" />

    <label className="form-label my-2">Changed Password</label>
    <input type="password" name='resetPassword'  onChange={handleChange} className="form-control" />

    <label className="form-label my-2">Confirm Changed Password</label>
    <input type="password" name='confirmResetPassword'  onChange={handleChange} className="form-control" />



  <button onClick={handleSubmit} className="btn btn-primary mx-3 my-3">Submit</button>
  </div>

</div>

</div>

</div>
</div>
</>

  )
  }

export default PasswordReset