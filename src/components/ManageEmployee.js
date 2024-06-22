import React from 'react'
import {Link, Outlet} from 'react-router-dom';



const ManageEmployee = () => {
  return (
    <>
    
    <div className='row' style={{marginTop:'60px'}}>
        <div className='col-md-2' style={{border:'1px solid',height:'auto',background:'rgb(140, 157, 162)'}}>
            
            <Link className='nav-link' to='/changeSupervisor/attendanceCorrection'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Attendance Correction</li></Link>
            <Link className='nav-link' to='/changeSupervisor/roleChange'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Role Change</li></Link>
            <Link className='nav-link' to='/changeSupervisor/appreciation'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Appreciation</li></Link> 
            <Link className='nav-link' to='/changeSupervisor/employeeAttendance'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Employee Attendance</li></Link>
            <Link className='nav-link' to='/changeSupervisor/todayTeamAttendance'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Todays Team Attendance</li></Link>
            <Link className='nav-link' to='/changeSupervisor/holidayBroadcast'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Holiday BroadCast</li></Link>
            <Link className='nav-link' to='/changeSupervisor/deactivateEmployee'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Deactivate Employee</li></Link>
            <Link className='nav-link' to='/changeSupervisor/changeSupervisor'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>Change Supervisor</li></Link>
            <Link className='nav-link' to='/changeSupervisor/maternatyPaternaty'> <li className='btn btn-secondary my-1' style={{width:'230px',marginLeft:'8px'}}>MaternatyPaternaty</li></Link>
            
        </div>

        <div className='col-md-10' style={{border:'1px solid',minHeight:'620px', background:'rgb(60, 140, 166)'}}>
        <Outlet />   
        </div> 
    </div>
    
    </>
  )
}

export default ManageEmployee