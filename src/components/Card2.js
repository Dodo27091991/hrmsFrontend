import React, { useEffect, useState } from 'react'

const Card2 = (props) => {
    
  const {emp,year,month,day,empName}=props
  const [attendance, setAttendance] = useState('')

  useEffect(() => {
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
      <td style={{border:'1px solid',textAlign:"left"}}><b style={{marginLeft:"60px"}}>{empName}</b></td>
      <td style={{border:'1px solid'}}><li style={{color:attendance==='Not Marked'?'red':attendance==='Absent'?'red':attendance==='Half-Day'?'yellow':'green'}}>{attendance}</li></td>
      </tr>
    </>
  )
}

export default Card2