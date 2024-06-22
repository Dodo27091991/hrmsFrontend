import React, { useEffect, useState } from 'react'
import Card2 from './Card2'
import Loading from './Loading'

const TodayTeamAttendance = () => {


  const [employee, setEmployee] = useState([])
  const [load1, setLoad1] = useState(false)
  const [load, setLoad] = useState(false)
  const [days, setDays] = useState([])
  const [day, setDay] = useState('')
  
  const currentDate = new Date();
  const month= currentDate.getMonth();
  const year=currentDate.getFullYear();


  const getDaysOfMonth = ()=>{
    setDays([])
    const lastDayOfMonth = new Date(year, month, 0)
    const dayOfMonth =lastDayOfMonth.getDate()
    let arr=[]
    for (let i=1;i<=dayOfMonth;i++)
    {
      arr.push(i)
    } 
    setDays(arr)
    setLoad(true)
  }

  
  
  // ***************************************************** FetchEmployee Function*************
  const fetchEmployee = async() =>{
    setLoad(true)
    const response = await fetch('http://localhost:5500/api/v1/manageAttendance',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      }
    })
    const data= await response.json()
    setEmployee(data.data)
    setLoad(false)
    //setLoad1(true)
  }
  
  // _________________________________________________________End Function
  
  const employeeHandler = (e) =>{
    e.preventDefault()
    setDay(e.target.value)
  }

  //**************************************Search Button Function */
  const handleSearch = ()=>{
    setLoad1(false)
  }

  const getAttendance=()=>{
    
    setLoad1(true)
    
  }

  //___________________________________________________________End Function

  useEffect(() => {
    
    fetchEmployee()
    getDaysOfMonth()
    console.log(month)

  }, [])


  return (
    <div>
      {load && <Loading />}
      
<h3 className='my-3' style={{ marginLeft: '350px', alignItems: 'center'}}>Today's Team Attendance :</h3>
        <div className='my-5' style={{ display: 'flex', marginLeft: '350px', alignItems: 'center'}} >
       {!load1?
       <select className="form-select" onClick={employeeHandler} style={{width:'250px'}}>
        <option  >--select Date--</option>
        { days.map((day)=>{ return <option key={day} value={day}>{new Date(year,month,day).toDateString()}</option>}) }
      </select>
      :null} 
      
      {!load1?<button className='btn btn-success mx-2' style={{width:'150px'}} onClick={getAttendance} >Search</button>:
      <button className='btn btn-danger mx-2' style={{width:'150px'}} onClick={handleSearch} >Back</button> }

      
      </div>

        

      {!load1>0?null: <div style={{border:"1px solid",width:"550px",marginLeft:"100px",background:"white"}}> 
      <div style={{border:"1px solid",width:"550px",marginLeft:"100px",background:"white"}}>
     <table >
      <thead style={{textAlign:'center'}}>
    <tr>
        <th style={{width:"275px",border:'1px solid'}}>Employee</th>
        <th style={{width:"275px",border:'1px solid'}}>Attendance</th>
      </tr>
        </thead>

    <tbody style={{textAlign:'center'}}>
      
      {! load1>0?null:employee.map((emp)=>{return <Card2 key={emp.email} emp={emp.email} empName={emp.name} day={day} month={month+1} year={year} />}) }

   
    </tbody>

      </table> 

      </div>
        
    </div>}
    </div>
  )
}

export default TodayTeamAttendance