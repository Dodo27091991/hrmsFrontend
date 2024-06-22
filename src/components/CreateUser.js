import React, { useEffect, useState } from 'react'

const CreateUser = (props) => {

    const [manager, setManager] = useState([])

    const [credential, setCredential] = useState({
    name:'',
    email:"",
    password:"",
    confirmPassword:"",
    role:"",
    age:0,
    gender:"",
    manager:"",
    address:"",
    phone:""
    })

    //const [message, setMessage] = useState('')
    const {setType, setAlert, setMessage1}=props

    const handleMessage =(type,msg)=>{
      setAlert(true)
      setType(type)
      setMessage1(msg);
    
      setTimeout(() => {
          setAlert(false)
      }, 5000);
    }
    
// *******************************************************Handle Submit
const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(credential)

    if(!credential.password===credential.confirmPassword){
      handleMessage('Fail','Entered Password does not match. Please try again')
    }
    else if(credential.name.length<3){
      handleMessage('Fail','Your name may not be below 3 character')
    }
    else if(!credential.email.includes('@')){
      handleMessage('Fail','Please enter a correct email address')
    }
    else if(credential.age<18){
      handleMessage('Fail','Employee below 18 year is illegal')
    }
    else if(credential.address.length<10){
      handleMessage('Fail','Please enter a correct address')
    }
    else if(!credential.phone.length===10 || !credential.phone.length===9){
      handleMessage('Fail','Incorrect phone number')
    }
    else{
    const response = await fetch('http://localhost:5500/api/v1/signup',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({
        name:credential.name,
        email:credential.email,
        password:credential.password,
        confirmPassword:credential.confirmPassword,
        role:credential.role,
        age:credential.age,
        gender:credential.gender,
        manager:credential.manager,
        address:credential.address,
        phone:credential.phone  

    })
    })
    const data= await response.json()
        if(data.status==='Success'){
            setAlert(true)
            setType('success')
            setMessage1(data.message);

            setTimeout(() => {
                //setType('')
                
                setAlert(false)
                setMessage1('');
                

            }, 5000);
        }
        else{
            setAlert(true)
            setType('Fail')
            setMessage1(data.message);

            setTimeout(() => {
                //setType('')
                setAlert(false)
                setMessage1('');
            }, 5000);
        
        }
    }
    }
// ____________________________________________________End Functions

const getManagers=async()=>{

  const response = await fetch('http://localhost:5500/api/v1/getManager',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        }
      })
  
      const data= await response.json()
      setManager(data.data)

}

useEffect(() => {
  getManagers()
}, [])


    const handleChange = (e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
        console.log(credential)
      }

  return (
    <div className='my-1' style={{marginTop:'100px',background:'rgb(60, 140, 166)'}}>
        <div className='row' >

<div className='col-md-6'>
<div style={{marginTop:'80px', marginLeft:'30px', width:'650px'}}>

    <h2>Employement Policy :</h2>
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

</div>
</div>

<div className='col-md-6' >
<form  style={{marginTop:'80px',marginLeft:'40px',width:"600px", height:'auto', borderRadius:'5%'}}>
  <div className="container mb-3 my-1" style={{background:'white', border:'1px solid',borderRadius:'5%' }} >
    
    <h4 className='my-2' style={{textAlign:'center'}}><b>Create User :</b></h4>
    
    <label className="form-label my-2">Name</label>
    <input type="text" name='name'onChange={handleChange} className="form-control" />
    
  <label htmlFor="exampleInputEmail1" className="form-label my-2">Email address</label>
    <input type="email" name='email' onChange={handleChange} className="form-control" />

    <label htmlFor="exampleInputEmail1" className="form-label my-2">Password</label>
    <input type="password" name='password' onChange={handleChange} className="form-control" />

    <label htmlFor="exampleInputEmail1" className="form-label my-2">Confirm Password</label>
    <input type="password" name='confirmPassword' onChange={handleChange} className="form-control" />

    <label className="form-label my-2">Address :</label>
    <input type="text" name='address'onChange={handleChange} className="form-control" />

    <label className="form-label my-2">Phone :</label>
    <input type="text" name='phone'onChange={handleChange} className="form-control" />


    <label className="form-label my-2">Designation </label>
    <select className="form-select" name='role' onChange={handleChange} >
    <option >---select role---</option>
  <option value="Associate">Associate</option>
  <option value="Supervisor">Supervisor</option>
  <option value="Manager">Manager</option>
</select>
    <label className="form-label my-2">Age </label>
    <input type="number" name='age' onChange={handleChange} className="form-control" />

    <label className="form-label my-2">Gender </label>
    <select className="form-select" name='gender'  onClick={handleChange} >
    <option >---Select Gender---</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Others">Others</option>
</select>

   <label className="form-label my-2">Reporting To :</label>
    {/* <input type="text" name='manager' onChange={handleChange} className="form-control" />*/}
    <select className="form-select" name='manager'  onClick={handleChange} >
    <option >---Select Reporting---</option>
  {manager.map((emp)=>{return <option value={emp.name}>{emp.name}</option>})}
  </select>

  <button type='submit' onClick={handleSubmit} className="btn btn-primary mx-3 my-3">Submit</button>
  </div>
</form>
</div>

</div>
</div>
  )
}

export default CreateUser