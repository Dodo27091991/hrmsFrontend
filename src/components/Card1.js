import React, { useEffect, useState } from 'react'

const Card1 = (props) => {

  const [date, setDate] = useState('')
  const {emp,year,month,day}=props
  const [attendance, setAttendance] = useState('')

  useEffect(() => {
    const formattedDate = new Date(year, month - 1, day).toDateString();
    setDate(formattedDate);
    getAttendance()

  }, [])

  const getAttendance=async()=>{
    const response = await fetch('http://localhost:5500/api/v1/getAttendanceToUpdate',{
      method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'token':localStorage.getItem('token')
        },
        body:JSON.stringify({employee:emp,year:year,month:month,day:day})
      })
  
      const data= await response.json()
      setAttendance(data.data)  
  }
  

  return (
    <>
    <tr>
      <td style={{border:'1px solid',textAlign:"left"}}><b style={{marginLeft:"60px"}}>{date}</b></td>
      <td style={{border:'1px solid'}}><li style={{color:attendance==='Not Marked'?'red':attendance==='Absent'?'red':attendance==='Half-Day'?'yellow':'green'}}>{attendance}</li></td>
      </tr>
    </>
  )
}

export default Card1