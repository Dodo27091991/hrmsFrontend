import './NewStyle.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, { useEffect, useState } from 'react'
import Card from './Card';
import Loading from './Loading';


const Hrms = (props) => {

    const {setType, setAlert, setMessage1}=props
    const [progress, setProgress] = useState(false)

    const [month, setMonth] = useState('')
    const [monthNum, setMonthNum] = useState('')
    const [selectYear, setSelectYear] = useState('')
    const [days, setDays] = useState([])
            

    useEffect(() => {
      
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        yearHandle(year)
        monthHandle(month)

        getMonthDays(selectYear,monthNum)
        // eslint-disable-next-line
    }, [10000])
    
    //const [message, setMessage] = useState('')

    const handleMessage =()=>{
        setAlert(true)
        setType('success')
        setMessage1('Your attendance is marked successfully');

        setTimeout(() => {
            //setType('')
            setAlert(false)
            //setMessage1('');
        }, 5000);
    }


    const getMonthDays = (year,month)=>{

        // first day of the month in week
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const firstDayOfWeek = firstDayOfMonth.getDay();
        
        // last day of the month
        const lastDayOfMonth = new Date(year, month, 0)
        const dayOfMonth =lastDayOfMonth.getDate()
        
//        console.log("First day is :",firstDayOfWeek,"Last day of the month :",dayOfMonth )

        
        let count=1
        let daysArr=[]
        //let count1=0
        let i=0
        for (i=0;i<42;i++)
        {
            if(i>firstDayOfWeek-1 && i<=dayOfMonth+firstDayOfWeek-1){
                daysArr[i]=count
                count++
            }
            else{
                daysArr[i]=''
                //count1++
            }
        }
        setDays(daysArr)
//        console.log(daysArr)
        count=0
        //count1=0
        i=0
        daysArr=[]
    }
    

    const monthHandle = (a)=>{
        if (a===0){
            setMonth("January")
            setMonthNum(a)
            getMonthDays(selectYear,1)
        }
        else if(a===1){
            setMonth("Feburary")
            setMonthNum(a)
            getMonthDays(selectYear,2)
        }
        else if(a===2){
            setMonth("March")
            setMonthNum(a)
            getMonthDays(selectYear,3)
        }
        else if(a===3){
            setMonth("April")
            setMonthNum(a)
            getMonthDays(selectYear,4)
        }
        else if(a===4){
            setMonth("May")
            setMonthNum(a)
            getMonthDays(selectYear,5)
        }
        else if(a===5){
            setMonth("June")
            setMonthNum(a)
            getMonthDays(selectYear,6)
        }
        else if(a===6){
            setMonth("July")
            setMonthNum(a)
            getMonthDays(selectYear,7)
        }
        else if(a===7){
            setMonth("August")
            setMonthNum(a)
            getMonthDays(selectYear,8)
        }
        else if(a===8){
            setMonth("September")
            setMonthNum(a)
            getMonthDays(selectYear,9)
        }
        else if(a===9){
            setMonth("October")
            setMonthNum(a)
            getMonthDays(selectYear,10)
        }
        else if(a===10){
            setMonth("November")
            setMonthNum(a)
            getMonthDays(selectYear,11)
        }
        else if(a===11){
            setMonth("December")
            setMonthNum(a)
            getMonthDays(selectYear,12)
        }

//        getMonthDays(selectYear,monthNum)
    }


    const yearHandle = (a) =>{
        setSelectYear(a)

        getMonthDays(selectYear,monthNum)
    }


// **********************************************************Function To mark Attendance
    const handleMarkAttendance = async()=>{
        setProgress(true)

    const response = await fetch('http://localhost:5500/api/v1/attendance',{
    method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({day:currentDay,month:currentMonth+1,year:currentYear,attendance:"Present"})
    })
    const data= await response.json()
    console.log(data) 
    handleMessage()
    setProgress(false)
    // calling below function to disable button
      }

//___________________________________________________End Function

// logical Function to disable button after marking the attendance******************

const [logical, setLogical] = useState('')

const handleOnLoad=async(d,m,y)=>{
    console.log(d)
    console.log(m+1)
    console.log(y)

    const response = await fetch(`http://localhost:5500/api/v1/getAttendance`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({day:d,month:m+1,year:y})
    })
    const data= await response.json()
    if(data.data===null){
        setLogical('')
    }
    else{
        setLogical('none')
    }
}

// ________________________________________________-end Function

    const day1=new Date()
    const currentDay=day1.getDate();
    const currentMonth=day1.getMonth()
    const currentYear=day1.getFullYear()




  return (
    <>
    {progress && <Loading />}



    <div style={{background:'rgb(60, 140, 166)'}}>
    <div className='container-color container' style={{marginTop:'58px'}}>
        {day1+''}
        <div className='row'> 
        {/*<div className='col-sm-3'></div>*/}
        <div className='col-sm-3'>
{/* ***********************Creating Drop down**************************** */}
        <div className="btn-group">
  <button type="button" className="btn btn-secondary dropdown-toggle my-1" style={{width:"200px"}} data-bs-toggle="dropdown" aria-expanded="false">
    {selectYear}
  </button>
  <ul className="dropdown-menu">
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2023)}}>2023</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2024)}}>2024</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2025)}}>2025</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2026)}}>2026</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2027)}}>2027</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2028)}}>2028</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2029)}}>2029</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2030)}}>2030</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2031)}}>2031</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2032)}}>2032</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2033)}}>2033</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2034)}}>2034</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2035)}}>2035</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2036)}}>2036</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2037)}}>2037</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2038)}}>2038</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2039)}}>2039</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2040)}}>2040</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2041)}}>2041</p></li>
  <li><p className='dropdown-item' onClick={()=>{yearHandle(2042)}}>2042</p></li>
  </ul>
</div>
{/* ***********************Ending Drop down**************************** */}
 </div>

        <div className='col-sm-3'>
        {/* ***********************Creating Drop down**************************** */}
        <div className="btn-group">
  <button type="button" className="btn btn-secondary dropdown-toggle my-1" style={{width:"200px"}} data-bs-toggle="dropdown" aria-expanded="false">
    {month}
  </button>
  <ul className="dropdown-menu">
    <li><p className='dropdown-item' onClick={()=>{monthHandle(0)}}>January</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(1)}}>Febuary</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(2)}}>March</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(3)}}>April</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(4)}}>May</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(5)}}>June</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(6)}}>July</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(7)}}>August</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(8)}}>September</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(9)}}>October</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(10)}}>November</p></li>
    <li><p className='dropdown-item' onClick={()=>{monthHandle(11)}}>December</p></li>
  </ul>
</div>
{/* ***********************Ending Drop down**************************** */}
</div>


        <div className='col-sm-3'><h3>{month}, {currentYear}</h3></div> 
        </div>

        <table style={{marginLeft:'30px'}}>
    <thead style={{textAlign:'center'}}>
    <tr>
        <th>Sun</th>
        <th>Mon</th>
        <th>Tue</th>
        <th>Wed</th>
        <th>Thu</th>
        <th>Fri</th>
        <th>Sat</th>
      </tr>
        </thead>

  <tbody>
    <tr>
    <td className='cardBody' style={{background:'lightgray'}}> {days[0]} <Card day={days[0]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[0]? <button onLoad={handleOnLoad(days[0],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[1]} <Card day={days[1]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[1]? <button onLoad={handleOnLoad(days[1],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[2]} <Card day={days[2]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[2]? <button onLoad={handleOnLoad(days[2],monthNum,selectYear)}style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[3]} <Card day={days[3]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[3]? <button onLoad={handleOnLoad(days[3],monthNum,selectYear)}style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[4]} <Card day={days[4]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[4]? <button onLoad={handleOnLoad(days[4],monthNum,selectYear)}style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[5]} <Card day={days[5]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[5]? <button onLoad={handleOnLoad(days[5],monthNum,selectYear)}style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody' style={{background:'lightgray'}}> {days[6]} <Card day={days[6]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[6]? <button onLoad={handleOnLoad(days[6],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      </tr>
    
      <tr>
      
    <td className='cardBody' style={{background:'lightgray'}}> {days[7]} <Card day={days[7]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[7]? <button onLoad={handleOnLoad(days[7],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[8]} <Card day={days[8]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[8]? <button onLoad={handleOnLoad(days[8],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[9]} <Card day={days[9]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[9]? <button onLoad={handleOnLoad(days[9],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[10]} <Card day={days[10]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[10]? <button onLoad={handleOnLoad(days[10],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[11]} <Card day={days[11]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[11]? <button onLoad={handleOnLoad(days[11],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody'> {days[12]} <Card day={days[12]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[12]? <button onLoad={handleOnLoad(days[12],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    <td className='cardBody' style={{background:'lightgray'}}> {days[13]} <Card day={days[13]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[13]? <button onLoad={handleOnLoad(days[13],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
    

      </tr>
    
      <tr>
     
      <td className='cardBody' style={{background:'lightgray'}}> {days[14]} <Card day={days[14]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[14]? <button onLoad={handleOnLoad(days[14],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[15]} <Card day={days[15]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[15]? <button onLoad={handleOnLoad(days[15],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[16]} <Card day={days[16]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[16]? <button onLoad={handleOnLoad(days[16],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[17]} <Card day={days[17]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[17]? <button onLoad={handleOnLoad(days[17],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[18]} <Card day={days[18]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[18]? <button onLoad={handleOnLoad(days[18],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[19]} <Card day={days[19]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[19]? <button onLoad={handleOnLoad(days[19],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody' style={{background:'lightgray'}}> {days[20]} <Card day={days[20]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[20]? <button onLoad={handleOnLoad(days[20],monthNum,selectYear)}style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
   

      </tr>
    
      <tr>
      <td className='cardBody' style={{background:'lightgray'}}> {days[21]} <Card day={days[21]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[21]? <button onLoad={handleOnLoad(days[21],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[22]} <Card day={days[22]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[22]? <button onLoad={handleOnLoad(days[22],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[23]} <Card day={days[23]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[23]? <button onLoad={handleOnLoad(days[23],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[24]} <Card day={days[24]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[24]? <button onLoad={handleOnLoad(days[24],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[25]} <Card day={days[25]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[25]? <button onLoad={handleOnLoad(days[25],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[26]} <Card day={days[26]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[26]? <button onLoad={handleOnLoad(days[26],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody' style={{background:'lightgray'}}> {days[27]} <Card day={days[27]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[27]? <button onLoad={handleOnLoad(days[27],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
   
      </tr>
    
      <tr>
      <td className='cardBody' style={{background:'lightgray'}}> {days[28]} <Card day={days[28]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[28]? <button onLoad={handleOnLoad(days[28],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[29]} <Card day={days[29]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[29]? <button onLoad={handleOnLoad(days[29],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[30]} <Card day={days[30]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[30]? <button onLoad={handleOnLoad(days[30],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[31]} <Card day={days[31]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[31]? <button onLoad={handleOnLoad(days[31],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[32]} <Card day={days[32]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[32]? <button onLoad={handleOnLoad(days[32],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[33]} <Card day={days[33]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[33]? <button onLoad={handleOnLoad(days[33],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody' style={{background:'lightgray'}}> {days[34]} <Card day={days[34]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[34]? <button onLoad={handleOnLoad(days[34],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      
      </tr>

      <tr>
      <td className='cardBody' style={{background:'lightgray'}}> {days[35]} <Card day={days[35]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[35]? <button onLoad={handleOnLoad(days[35],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[36]} <Card day={days[36]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[36]? <button onLoad={handleOnLoad(days[36],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[37]} <Card day={days[37]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[37]? <button onLoad={handleOnLoad(days[37],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[38]} <Card day={days[38]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[38]? <button onLoad={handleOnLoad(days[38],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[39]} <Card day={days[39]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[39]? <button onLoad={handleOnLoad(days[39],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody'> {days[40]} <Card day={days[40]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[40]? <button onLoad={handleOnLoad(days[40],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      <td className='cardBody' style={{background:'lightgray'}}> {days[41]} <Card day={days[41]} month={monthNum} year={selectYear}/> <br />{selectYear===currentYear? monthNum===currentMonth? currentDay===days[41]? <button onLoad={handleOnLoad(days[41],monthNum,selectYear)} style={{display:logical}} className='btn btn-outline-dark' onClick={handleMarkAttendance}>Present</button>:null:null:null}</td>
      
      </tr>


      </tbody>

      </table>

</div>
  </div>  
  </>
)}

export default Hrms