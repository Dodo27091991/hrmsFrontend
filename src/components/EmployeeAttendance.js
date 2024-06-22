import React, { useEffect, useState } from 'react'
import Card1 from './Card1'

const EmployeeAttendance = () => {

  const [load, setLoad] = useState(false)
  const [emp, setEmp] = useState('')
  const [employee, setEmployee] = useState([])
  const [monthNum, setMonthNum] = useState(0)
  const [year, setYear] = useState('')
  const [days, setDays] = useState([])

  const employeeHandler = (e)=>{
    e.preventDefault()
    setEmp(e.target.value)
  
  }
  
  const yearHandler = (e) =>{
    e.preventDefault()

    setYear(e.target.value)
    //getDaysOfMonth(e.target.value,monthNum)
  
  }

  const getDaysOfMonth = ()=>{
    setDays([])
    const lastDayOfMonth = new Date(year, monthNum, 0)
    const dayOfMonth =lastDayOfMonth.getDate()
    let arr=[]
    for (let i=1;i<=dayOfMonth;i++)
    {
      arr.push(i)
    } 
    setDays(arr)
    setLoad(true)
  }
  
  const monthHandler = (e)=>{
    e.preventDefault()
    setMonthNum(e.target.value)
  
    //getDaysOfMonth(year,e.target.value)
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

  const monthHandle = (a)=>{
    if (a===0){
        setMonthNum(1)
      
    }
    else if(a===1){
        setMonthNum(2)
      
    }
    else if(a===2){
        setMonthNum(3)
      
    }
    else if(a===3){
        setMonthNum(4)
      
    }
    else if(a===4){
        setMonthNum(5)
      
    }
    else if(a===5){
        setMonthNum(6)
      
    }
    else if(a===6){
        setMonthNum(7)
      
    }
    else if(a===7){
        setMonthNum(8)
  
    }
    else if(a===8){
        setMonthNum(9)
      
    }
    else if(a===9){
        setMonthNum(10)
      
    }
    else if(a===10){
        setMonthNum(11)    
    }
    else if(a===11){
        setMonthNum(12)
    }
  
  }

  

  useEffect(() => {
    fetchEmployee()
    const currentDate = new Date();
    monthHandle(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    console.log('It ran again')
     //getDaysOfMonth()
     // eslint-disable-next-line
  }, [])
  
  const handleSearch = ()=>{
    setLoad(false)
  }
  

  
  return (
    <div>
            <h3 className='my-3' style={{ marginLeft: '350px', alignItems: 'center'}}>Employee Attendance :</h3>

        <div className='my-5' style={{ display: 'flex', marginLeft: '50px', alignItems: 'center'}} >
      {!load?
      <>
        <select className="form-select" onClick={employeeHandler} style={{width:'200px'}}>
        <option >--select Employee--</option>
        { employee.map((emp)=>{ return <option key={emp.email} value={emp.email}>{emp.name} :{emp.email}</option>}) }
      </select>
      

      <select className="form-select mx-3" onClick={yearHandler} style={{width:'200px'}}>
        <option >--Select Year--</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          <option value="2031">2031</option>
          <option value="2032">2032</option>
          <option value="2033">2033</option>
          <option value="2034">2034</option>
          <option value="2035">2035</option>
          <option value="2036">2036</option>
          <option value="2037">2037</option>
          <option value="2038">2038</option>
          <option value="2039">2039</option>
          <option value="2040">2040</option>
          <option value="2041">2041</option>
          <option value="2042">2042</option>
        
      </select>

      <select className="form-select mx-3" onClick={monthHandler} style={{width:'200px'}}>
        <option >--Select Month--</option>
        
        <option value="1">January</option>
        <option value="2">Febuary</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
</>
:null}

      {!load?<button className='btn btn-primary' onClick={getDaysOfMonth} >Search</button>:
      <button className='btn btn-danger' onClick={handleSearch} >Back</button> }
      
      </div>

      {!load?null: <div style={{border:"1px solid",width:"550px",marginLeft:"100px",background:"white"}}>
     <table >
      <thead style={{textAlign:'center'}}>
    <tr>
        <th style={{width:"275px",border:'1px solid'}}>Date</th>
        <th style={{width:"275px",border:'1px solid'}}>Attendance</th>
      </tr>
        </thead>

    <tbody style={{textAlign:'center'}}>
      
      {!load?null:days.map((day)=>{return <Card1 key={day} emp={emp} day={day} month={monthNum} year={year} />})}

    </tbody>

      </table> 

      </div>}
        </div>
  )
}

export default EmployeeAttendance