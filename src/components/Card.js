import './NewStyle.css'
import React, { useState } from 'react'

const Card = (props) => {

  const [attendance, setAttendance] = useState('')

  const day = props.day;
  const month = props.month;
  const year = props.year;
  



  const fetchNow =async() =>{

    try{
    const response = await fetch(`http://localhost:5500/api/v1/getAttendance`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({day:day,month:month+1,year:year})
    })
    const data= await response.json()
    //console.log(data)
    if (data.status==='Fail'){

    setAttendance('')
    }
    else{

      setAttendance(data.data.attendance)
      console.log(data.data.attendance)
    }
  }catch(e){console.log(e)}
}
   

  return (

    <p onLoad={fetchNow()} style={attendance==='Present'?{color:'green'}:{color:'dark'}}>{attendance}</p>
    )
}

export default Card