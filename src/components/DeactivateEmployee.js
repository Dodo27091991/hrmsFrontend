import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const DeactivateEmployee = (props) => {

  const [load, setLoad] = useState(false)
  const [emp, setEmp] = useState('')
  const [employee, setEmployee] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState()
  const [action, setAction] = useState(true)

  const {setType,setAlert,setMessage}=props

  const handleMessage =(type,msg)=>{
    setAlert(true)
    setType(type)
    setMessage(msg);
  
    setTimeout(() => {
        setAlert(false)
    }, 5000);
  }

  

  const employeeHandler = (e)=>{
    e.preventDefault()
    const temp=e.target.value
    setEmp(temp)
    console.log(temp)
  
  }

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
  }

  const selectHandler=()=>{

    const temp=employee.filter((eemp)=>{ return emp===eemp.email })
    setSelectedEmployee(temp)
  }

  // ************************************************Deactivate Handler

  const deactivateHandler=(e)=>{
    e.preventDefault()
    setAction(e.target.value)
  }

  //_____________________________________________________End Function

  // *******************************************-------------------Handler Action Function to call the API
  const handleAction=async()=>{

    setLoad(true)

    const response = await fetch('http://localhost:5500/api/v1/deactivate',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        body:JSON.stringify({user:emp,action:action})  
      })
  
      const data= await response.json()
      setLoad(false)
      handleMessage(data.status,data.data)

  }

  // _____________________________________________________End Function

  

  useEffect(() => {
    fetchEmployee()
//    console.log(employee)
  }, [])
  
  return (
    <div >
      <h3 className='my-3' style={{ marginLeft: '350px', alignItems: 'center'}}>Deactivate Employee :</h3>
      {load && <Loading />}
<div className='my-5' style={{ display: 'flex', marginLeft: '350px', alignItems: 'center'}} >
      <select className="form-select" onClick={employeeHandler} style={{width:'200px'}}>
        <option  >--select Employee--</option>
        { employee.map((emp)=>{ return <option key={emp.email} value={emp.email}>{emp.name} :{emp.email}</option>}) }
      </select>
      <button className='btn btn-primary mx-3' onClick={selectHandler} >Select Employee</button>
      </div>

      {selectedEmployee && <div className='my-5' style={{textAlign:'left',marginLeft:'350px',border:'1px solid',height:'100px',width:'300px',borderRadius:'10%',background:'green'}}>
    <li style={{marginLeft:"20px",marginTop:"10px"}}><b>Name : </b>{selectedEmployee[0].name}</li>
    <li style={{marginLeft:"20px"}}><b>Designation : </b>{selectedEmployee[0].role}</li>
    <li style={{marginLeft:"20px"}}><b>Reporting To : </b>{selectedEmployee[0].Manager}</li>
    </div>}

    <div className='my-4' style={{display:'flex', marginLeft: '340px', alignItems: 'center'}} >
      <select onClick={deactivateHandler} className="form-select mx-2" style={{width:'250px'}}>
        <option >--Action--</option>
        <option value={true} >Activate</option>
        <option value={false} >Deactivate</option>
      </select>
    </div>
    <button className='btn btn-primary' style={{marginLeft:'350px'}} onClick={handleAction} >Submit</button>
        

        </div>
  )
}

export default DeactivateEmployee