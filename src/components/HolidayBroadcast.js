import React, { useEffect, useState } from 'react'
import Loading from './Loading'



const HolidayBroadcast = (props) => {

  const {setType,setAlert,setMessage}=props

  const [load, setLoad] = useState(false)
  const [monthNum, setMonthNum] = useState(0)
  const [year, setYear] = useState('')
  const [days, setDays] = useState([])
  const [day, setDay] = useState('')
  const [holiday, setHoliday] = useState('')

  const [selectedDate, setSelectedDate] = useState('')

  
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
    //setLoad(true)
  }
  
  const monthHandler = (e)=>{
    e.preventDefault()
    setMonthNum(e.target.value)
  
  }

  const dayHandler = (e)=>{
    e.preventDefault()
    setDay(e.target.value)
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

  const handleMessage =(type,msg)=>{
    setAlert(true)
    setType(type)
    setMessage(msg);
  
    setTimeout(() => {
        setAlert(false)
    }, 5000);
  }

  

  useEffect(() => {
   // fetchEmployee()
    const currentDate = new Date();
    monthHandle(currentDate.getMonth());
    setYear(currentDate.getFullYear());
    getDaysOfMonth()
     // eslint-disable-next-line
  }, [])
  
  const handleBroadCast = (e)=>{
    setSelectedDate(new Date(year,monthNum-1,day).toDateString())
   
  } 

  const changeHandler = (e)=>{
    e.preventDefault()
    setHoliday(e.target.value)
  }

  const handleChange = async()=>{
    setLoad(true)
    const response = await fetch('http://localhost:5500/api/v1/broadcast',{
      method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        body:JSON.stringify({holiday:holiday,year:year,month:monthNum,day:day})
      })
  
      const data= await response.json()
      setLoad(false)
      handleMessage(data.status,data.data)
    
  }


  
  return (
    <div>
      <h3 className='my-3' style={{ marginLeft: '350px', alignItems: 'center'}}>Holiday BroadCast :</h3>
      {load && <Loading />}
        <div className='my-5' style={{ display: 'flex', marginLeft: '50px', alignItems: 'center'}} >
      
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
        <option >--select Month--</option>
        
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
        
        {days.map((day)=> {return <option key={day} value={day}>{day}</option>})}
        </select>

      <button className='btn btn-primary' onClick={handleBroadCast} >Select Date</button>
      </div>


      <div style={{textAlign:'center',border:'1px solid',height:'100px',width:'200px',borderRadius:'10%',marginLeft:'400px',background:'grey'}}>
    Selected Date : <br /><h4 className='my-3'>{selectedDate}</h4>
    </div>


    <div className='my-4' style={{marginLeft:'385px'}}>
     <select className="form-select mx-3" onClick={changeHandler} style={{width:'200px'}}>
        <option >--select--</option>
        <option value="Holiday">Holiday</option>
        <option value="WeekOff">WeekOff</option>
        <option value="National Holiday">National Holiday</option>
         </select>

      </div>
      

      <button className='btn btn-primary' onClick={handleChange} style={{width:'200px',marginLeft:'400px'}}>BroadCast</button>

  
  </div>
  )
}

export default HolidayBroadcast