import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const RoleChange = (props) => {

  const {setType,setAlert,setMessage}=props

  const [load, setLoad] = useState(false)
  const [employee, setEmployee] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [role, setRole] = useState('')
  const [roleChange, setRoleChange] = useState('')

  const fetchEmployee = async() =>{
    const response = await fetch('http://localhost:5500/api/v1/manageAttendance',{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        }
      })
  
      const data= await response.json()
      setEmployee(data.data)
      console.log(data.data)
  }

  useEffect(() => {
    fetchEmployee()
  }, [])

  const employeeHandler= async(e)=>{
    e.preventDefault()
    const useremail=e.target.value
    setUserEmail(useremail)
    const response = await fetch('http://localhost:5500/api/v1/getRole',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        body:JSON.stringify({employee:useremail})  
      })
  
      const data= await response.json()
      //setEmployee(data.data)
      //console.log(data.data)
      setRole(data.data)

  }

  const roleHandler = (e) =>{
    e.preventDefault()
    setRoleChange(e.target.value)
  }

  //***************************** Handle Message function    **********************/
const handleMessage =(type,msg)=>{
  setAlert(true)
  setType(type)
  setMessage(msg);

  setTimeout(() => {
      setAlert(false)
  }, 5000);
}

//+__________________________________________________End Function


  const roleUpdateHandler=async()=>{
      setLoad(true)
    const response = await fetch('http://localhost:5500/api/v1/updateRole',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        body:JSON.stringify({employee:userEmail,role:roleChange})  
      })
  
      const data= await response.json()
      setLoad(false)
      handleMessage(data.status,data.data)

  }
  
  

  return (
    <div className='col-md-10' >
      <h3 className='my-3' style={{ marginLeft: '350px', alignItems: 'center'}}>Role Change :</h3>
      {load && <Loading />}
    <div className='my-5' style={{ marginLeft: '340px', alignItems: 'center'}} >
      <select className="form-select" onClick={employeeHandler} style={{width:'250px'}}>
        {employee.map((emp)=>{ return  <option key={emp.email} value={emp.email}>{emp.name}</option>})}
      </select>

      <div className='my-5' style={{textAlign:'center',border:'1px solid',height:'100px',width:'250px',borderRadius:'10%',background:'green'}}>
    <b>Current Role : </b><br /><h4 className='my-3'>{role}</h4>
    </div>
    </div>

    <div className='my-4' style={{display:'flex', marginLeft: '240px', alignItems: 'center'}} >
      Change Role :<select onClick={roleHandler} className="form-select mx-2" style={{width:'250px'}}>
        <option >--Assign New Role--</option>
        <option value="Associate">Associate</option>
        <option value="Supervisor">Supervisor</option>
        <option value="Manager">Manager</option>
      </select>
    </div>

    <button className='btn btn-primary' onClick={roleUpdateHandler} style={{ marginLeft: '350px', alignItems: 'center'}}>Change Role</button>

      
    </div>
  )
}

export default RoleChange