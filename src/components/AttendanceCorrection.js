import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const AttendanceCorrection = (props) => {

  const {setType,setAlert,setMessage}=props
  
  const [load, setLoad] = useState(false)
  const [emp, setEmp] = useState('')
  const [employee, setEmployee] = useState([])
  const [attendance, setAttendance] = useState('')
  const [monthNum, setMonthNum] = useState(0)
  const [year, setYear] = useState('')
  const [day, setDay] = useState(0)
  const [days, setDays] = useState([])
  const [profile, setProfile] = useState({})
  const [gender, setGender] = useState('')
  

  
    
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

// *************************************************** Month Handler function
const monthHandler = (e)=>{
  e.preventDefault()
  setMonthNum(e.target.value)

  getDaysOfMonth(year,e.target.value)
}

// ____________________________________________________
// ****************************************Year Handler function*********************

const yearHandler = (e) =>{
  e.preventDefault()
  setYear(e.target.value)
  getDaysOfMonth(e.target.value,monthNum)

}
// ___________________________________________________End Function

//************************************************ */ Day Handler fuction

const dayHandler=(e)=>{
  e.preventDefault()
  setDay(e.target.value)
}

//____________________________________________End Function

//***************************************Employee handler 

const employeeHandler = (e)=>{
  e.preventDefault()
  setEmp(e.target.value)
  const ee=employee.filter((emp)=>{return emp.email===e.target.value})
  if(ee.length!==0){
  setGender(ee[0].gender)
  console.log(ee[0].gender)
  getProfile()
  }
  
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

const getProfile =async()=>{

  const response = await fetch('http://localhost:5500/api/v1/getEmpProfile',{
    method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({employee:emp})
    })

    const data= await response.json()
    setProfile(data.data)
    console.log(data.data)
}

// ****************************************************** getAttendance function

const getAttendance=async()=>{
  const response = await fetch('http://localhost:5500/api/v1/getAttendanceToUpdate',{
    method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({employee:emp,year:year,month:monthNum,day:day})
    })

    const data= await response.json()
    setAttendance(data.data)  
    getProfile()
    
}

// ______________________________________________________________End Function
// ******************************************************Handle Change Attendance

const handleChangeAttendance = async()=>{
  setLoad(true)
  const response = await fetch('http://localhost:5500/api/v1/handleChangeAttendance',{
    method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({employee:emp,year:year,month:monthNum,day:day,attendance:attendance})
    })

    const data= await response.json()
    setLoad(false)
    handleMessage(data.status,data.data)
}

// ________________________________________End Function

const getDaysOfMonth = (year,monthNum)=>{

  const lastDayOfMonth = new Date(year, monthNum, 0)
  const dayOfMonth =lastDayOfMonth.getDate()
  let arr=[]
  for (let i=1;i<=dayOfMonth;i++)
  {
    arr.push(i)
  } 
  setDays(arr)

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
  
   getDaysOfMonth()
   // eslint-disable-next-line
}, [])


const changeHandler =(e)=>{
  e.preventDefault()
  setAttendance(e.target.value)
}

  return (
    <div >
      <h3 className='my-3' style={{ marginLeft: '350px', alignItems: 'center'}}>AttendanceCorrection :</h3>
    {load && <Loading />}

    <div className='my-3' style={{ display: 'flex', marginLeft: '50px', alignItems: 'center'}} >
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

      <select className="form-select mx-3" onClick={dayHandler} style={{width:'200px'}}>
        <option >--select Day--</option>
        {days.map((day)=>{ return <option key={day} value={day}>{day}</option> } )}
        
      </select>

      <button className='btn btn-primary' onClick={getAttendance}>Search</button>

    </div>

    <div style={{textAlign:'center',border:'1px solid',height:'100px',width:'200px',borderRadius:'10%',marginLeft:'400px',background:attendance==='Absent'?'red':attendance==='Half-Day'?'yellow':'green'}}>
    Attendance is marked as : <br /><h4 className='my-3'>{attendance}</h4>
    </div>

    <div style={{marginLeft:"150px",marginTop:'50px',textAlign:'center',border:"1px solid",width:'750px'}}>Current Leave Balance for the Employee :
    <div style={{display:'flex',marginTop:'10px',border:"1px solid"}}>
          <h5 className='mx-5' >Sick Leave : <br /> {profile.sickLeave}</h5>
          <h5 className='mx-5' >Casual Leave : <br /> {profile.casualLeave}</h5>
          <h5 className='mx-5' >Plan Leave : <br /> {profile.planLeave}</h5>
          {gender==='Female'?<h5 className='mx-5' >Maternaty Leave : <br /> {profile.maternatyLeave}</h5>
          :<h5 className='mx-5' >Paternaty Leave : <br /> {profile.paternatyLeave}</h5>
  }
    </div>
    </div>
    
    <div className='my-5' style={{display: 'flex',alignItems:"center", marginLeft:'170px'}}>
      <h5>Change Attendance To :</h5>
    <select className="form-select mx-3" onClick={changeHandler} style={{width:'200px'}}>
        <option >--select--</option>
        <option value="Absent">Absent</option>
        <option value="Present">Present</option>
        <option disabled={profile.sickLeave <0.5}value="Half-Day">Half-Day</option>
        <option value="WeekOff">WeekOff</option>
        <option value="Present on WeekOff">Present On WeekOff</option>
        <option disabled={profile.casualLeave <1 } value="Casual Leave">Casual Leave</option>
        <option disabled={profile.sickLeave <1 } value="Sick Leave">Sick Leave</option>
        <option disabled={profile.planLeave <1 } value="Plan Leave">Plan Leave</option>
        <option value="Holiday">Holiday</option>
        <option value="Present on Holiday">Present on Holiday</option>
        <option value="National Holiday">National Holiday</option>
        <option value="Present On National Holiday">Present On National Holiday</option>
        <option disabled={profile.maternatyLeave <1 }value="Maternaty Leave">Maternaty Leave</option>
        <option disabled={profile.paternatyLeave <1 }value="Paternaty Leave">Paternaty Leave</option>
        <option value="Special Leave">Special Leave</option> 
      </select>
      </div>

      <button className='btn btn-primary' onClick={handleChangeAttendance} style={{width:'200px',marginLeft:'400px'}}>Update</button>


    </div>
  )
}


export default AttendanceCorrection