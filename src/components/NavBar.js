import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


const NavBar = () => {
   
  const navigate=useNavigate()
  

  const handleLogOut = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    navigate('/login')
  }

  

  return (
    <>
    <nav className="navbar navbar-expand-lg fixed-top" style={{background:'rgb(140, 157, 162)'}} >
  <div className="container-fluid" >
    <Link className="navbar-brand" to="/">Human Resource (HRMS)</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
        {localStorage.getItem('token')?<li className="nav-item">
          <Link className="nav-link" to="/hrms">HRMS</Link>
        </li>:null}

        {localStorage.getItem('token')?<li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Profile</Link>
        </li>:null}

        {localStorage.getItem('role')==='Super'||localStorage.getItem('role')==='Manager'||localStorage.getItem('role')==='Supervisor'? localStorage.getItem('token')?<li className="nav-item">
          <Link className="nav-link" to="/createUser">CreateUser</Link>
        </li>:null:null}
{/****************************************************************************** */}      
{/* The below Link is Disabled As the feature is not required right now. It can be enabled and will be called by 
ManageAttandance component from App.js and will render ManageAttandance.js file */}      
        {/* localStorage.getItem('role')==='Super'||localStorage.getItem('role')==='Manager'||localStorage.getItem('role')==='Supervisor'?localStorage.getItem('token')?<li className="nav-item">
          <Link className="nav-link" to="/manageAttandance">Manage Attendance</Link>
  </li>:null:null */}

        {localStorage.getItem('role')==='Super'||localStorage.getItem('role')==='Manager'||localStorage.getItem('role')==='Supervisor'?localStorage.getItem('token')?<li className="nav-item">
          <Link className="nav-link" to="/changeSupervisor">Manage Employee</Link>
        </li>:null:null}
        


        </ul>
      
      
      
    {!localStorage.getItem('token')
    ?
    <><button className="btn btn-outline-light mx-2" ><Link className="nav-link" to="/login">Login</Link></button>
    <button className="btn btn btn-outline-light" > <Link className="nav-link" to='/resetPassword'>Reset Password</Link></button></>
    :
    <div>
      {/*<img style={{width:"40px",height:"40px",borderRadius:'50%'}} src="http://localhost:5500/img/photo.jpeg" alt="Girl in a jacket"></img> */}
      Hello:<b className='mx-2'>{localStorage.getItem('name')}</b>
    <button className="btn btn btn-outline-light mx-2" onClick={handleLogOut}>Log Out</button>
    <button className="btn btn btn-outline-light" > <Link className="nav-link" to='/resetPassword'>Reset Password</Link></button>
    </div>}
      
      
    </div>
  </div>
</nav>
    </> 
  )
}

export default NavBar