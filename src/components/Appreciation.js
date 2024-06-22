import React, { useState } from 'react'

const Appreciation = () => {

    const [message, setMessage] = useState('')

    const handleChange = (e) =>{
        e.preventDefault()
        setMessage(e.target.value)
    }


  return (
    <div className='col-md-10' >
              <h3 className='my-3' style={{ marginLeft: '500px', alignItems: 'center'}}>Appreciation :</h3>
        <div style={{marginLeft:'250px',marginTop:'50px'}}>
            {message}
        </div>
        <div style={{marginLeft:'150px',marginTop:'50px',border:'1px solid',borderRadius:'2%'}}>
            <h4 style={{textAlign:'center'}}>Appreciation Email </h4>
            <b className='mx-4'>To :</b>
            <textarea className='form-control my-2 mx-4' onChange={handleChange} rows={1} style={{width:'860px',borderRadius:'5s%',overflow:'false'}} ></textarea>
            <b className='mx-4'>CC :</b>
            <textarea className='form-control my-2 mx-4' onChange={handleChange} rows={1} style={{width:'860px',borderRadius:'5s%',overflow:'false'}} ></textarea>
        
            <b className='mx-4'>Your Message :</b>
            <textarea className='form-control mx-4' onChange={handleChange} rows={10} style={{width:'860px',height:'250px',borderRadius:'5s%',overflow:'false'}} ></textarea>
        <button className='btn btn-primary my-2 mx-4' >Submit</button>
        </div>
        
        
        </div>
  )
}

export default Appreciation