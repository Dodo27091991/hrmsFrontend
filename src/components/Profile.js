import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = (props) => {

  const [profile, setProfile] = useState({})
  const [photo, setPhoto] = useState()
  const [boolPhone, setBoolPhone] = useState(false)
  const [phone, setPhone] = useState()
  const [boolAddress, setBoolAddress] = useState(false)
  const [address, setAddress] = useState('')
  const [boolPhoto, setBoolPhoto] = useState(false)
  const navigate = useNavigate()

  const {setType,setAlert,setMessage}=props

  const handleMessage =(type,msg)=>{
    setAlert(true)
    setType(type)
    setMessage(msg);
  
    setTimeout(() => {
        setAlert(false)
    }, 5000);
  }

// ******************************************* Get Profile Page  
  const getProfile =async()=>{

    const response = await fetch('http://localhost:5500/api/v1/getUserProfile',{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      }
    })
    const data= await response.json()
    setProfile(data.data)
    
  }

//________________________________________End Function


// *********************************************Handle Photo
  const handlePhoto=(e)=>{
    e.preventDefault();
    const selectedFile = e.target.files ? e.target.files[0] : null;

  if (selectedFile) {
    setPhoto(selectedFile);
    console.log(selectedFile);
  } else {
    // Handle the case when the user cancels file selection
    handleMessage("Fail","No file selected");
  }  
}
//________________________________________________________________________________End handlePhoto


//************************************************Handle Upload Photo */
  const handleUploadPhoto1=()=>{
    setBoolPhoto(true)
  }

  const handleUploadPhoto2=()=>{
    setBoolPhoto(false)
  }

  const handleUploadPhoto=async()=>{

    console.log(photo)

    const formData = new FormData();
    formData.append('photo', photo);

    const response = await fetch('http://localhost:5500/api/v1/updatePhoto',{
      method:'POST',
      headers:{
        //'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:formData
    })

    const data= await response.json()
    handleMessage(data.status,data.data)
    setBoolPhoto(false)
    getProfile()
  }
//*****************************3 Function to update Address */

const handleChangeAddress=()=>{
  setBoolAddress(true)
}

const handleChangeAddress2=(e)=>{
  e.preventDefault()
  setAddress(e.target.value)
}

const changeAddressCancel=()=>{
  setBoolAddress(false)
}

const changeAddressFinal=async()=>{

  if(address.length >10){
  const response = await fetch('http://localhost:5500/api/v1/updateAddress',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({address:address})
    })

    const data= await response.json()
    handleMessage(data.status,data.data)
    getProfile()
    setBoolAddress(false)
  }
  else{
    handleMessage('Fail',"Please Enter a valid Address")
  }
}


  //***************************************3 Function to change Phone number */
  const handleChangePhone =(e)=>{
    e.preventDefault()
    setPhone(e.target.value)
    setBoolPhone(e.target.value)
  }

  const handleUpdatePhone=(e)=>{
    e.preventDefault()
    setBoolPhone(true)
  }

  const handleUpdatePhoneCancel=()=>{
    setBoolPhone(false)
  }

  const handleUpdatePhoneFinal =async()=>{

    if(phone===undefined || phone===""){
      handleMessage('Fail','Your Phone number Should Not be Empty')
    }
    else if(!/^\d+$/.test(phone)){
      handleMessage('Fail','Your Phone number should be Numerical')
    }
    else if(phone.length===9 || phone.length===10){
      
      const response = await fetch('http://localhost:5500/api/v1/updatePhone',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'token':localStorage.getItem('token')
      },
      body:JSON.stringify({phone:phone})
    })

    const data= await response.json()
    handleMessage(data.status,data.data)
    getProfile()
    setBoolPhone(false)
    }
    
  else{
    handleMessage('Fail','Your Phone number should be of 10 Numbers')
  }
  }

// **************************************Use Effect
  useEffect(() => {
    var a=localStorage.getItem('token')
    
    if (a===null)
    {
      navigate('/login')
    }
    else{
    getProfile()
    }
  }, [])
  
// ____________________________________End Use Effect

  return (
    <div className='container-fluid my-5' style={{border:'1px solid', minHeight:'800px',background:'rgb(60, 140, 166)'}}>
      <div className='row container my-4' style={{background:'white', marginLeft:'87px'}}>
      <div className='col-md-3' style={{ minHeight:'450px'}}>
      
      <img style={{width:"250px",height:"280px",marginTop:'65px',marginLeft:"20px"}} src={profile.photo==='' || profile.photo===null?"http://localhost:5500/img/Photo.jpg":`http://localhost:5500/img/${profile.photo}`} alt="Girl in a jacket"></img>
      {boolPhoto?<input className='btn btn-outline-light mx-5 my-3' onChange={handlePhoto} type='file' />:null} {boolPhoto?<><button onClick={handleUploadPhoto} style={{marginLeft:'40px'}} className='btn btn-primary '>Update</button>
                                                                                                                             <button onClick={handleUploadPhoto2} className='btn btn-danger mx-2'>Cancel</button></>
                                                                                                                          :<><button onClick={handleUploadPhoto1} style={{marginLeft:'70px'}} className='btn btn-primary my-4'>Update Photo</button></>
                                                                                                                          }
    </div>

      <div className='col-md-9' style={{ minHeight:'450px',marginTop:'20px'}}>
      <div className='my-5' style={{marginLeft:'60px'}}>

                    <p style={{display:'flex'}}><b style={{marginRight:'155px'}}>Name :</b> {profile.name} <br /></p>
                    <p style={{display:'flex'}}><b style={{marginRight:'103px'}}>Date of Birth :</b>{profile.age}<br /></p>
                    <p style={{display:'flex'}}><b style={{marginRight:'147px'}}>Gender :</b>{profile.gender}<br /></p>
                    <p style={{display:'flex'}}><b style={{marginRight:'104px'}}>Reporting To :</b>{profile.manager} <br /></p>
                    <p style={{display:'flex'}}><b style={{marginRight:'113px'}}>Designation :</b>{profile.role}<br /></p>
                    {!boolPhone?<p style={{display:'flex'}}><b style={{marginRight:'128px'}}>Phone No :</b>{profile.phone} <button onClick={handleUpdatePhone} className='btn btn-primary mx-5'>Update Phone</button><br /></p>
                      :<div><b style={{marginRight:'128px'}}>Phone No :</b><input type='text' onChange={handleChangePhone} /> <button className='btn btn-primary mx-2' onClick={handleUpdatePhoneFinal}>Update</button> <button className='btn btn-danger' onClick={handleUpdatePhoneCancel}>Cancel</button></div> }
                                      

                   {!boolAddress? <p style={{display:'flex'}}><b style={{marginRight:'60px'}}>Residential Address:</b>{profile.address}<button onClick={handleChangeAddress} className='btn btn-primary mx-5'>Update Address</button><br /></p>
                      :<div><b style={{marginRight:'100px'}}>Residential Address:</b><textarea row='4' col='280' style={{width:"450px"}} onChange={handleChangeAddress2} /><button className='btn btn-primary mx-2' onClick={changeAddressFinal}>Update</button> <button className='btn btn-danger' onClick={changeAddressCancel}>Cancel</button></div>}
                    
                    
      </div>
      </div>
      </div>

      <div className='container my-3' style={{border:'1px solid', minHeight:'200px',background:'white'}}>
        <h3 style={{textAlign:"center"}}>Leave Balance</h3>
        <h4 style={{textAlign:'center',color:'aquamarine'}}>Total Leaves:{profile.sickLeave +profile.casualLeave+profile.planLeave+profile.maternatyLeave+profile.paternatyLeave}</h4>
        <div className='my-5' style={{display:"flex",marginLeft:"150px"}}>
          <h5 className='mx-5'>Sick Leave :{profile.sickLeave}</h5>
          <h5 className='mx-5'>Casual Leave :{profile.casualLeave}</h5>
          <h5 className='mx-5'>Plan Leave :{profile.planLeave}</h5>
          {profile.gender==='Male'?<h5 className='mx-5'>Paternaty Leave :{profile.paternatyLeave}</h5>
            :<h5 className='mx-5'>Maternaty Leave :{profile.maternatyLeave}</h5>}
        </div>
      </div>

     <div className='container my-2' style={{border:'1px solid', minHeight:'200px'}}>

     <b className='my-5'>Check Company Policies:</b>
<li>Review your company's leave policies to understand the procedures and guidelines for requesting and taking leave.
</li>

<b>Review Team Calendar:</b>
<li>Check your team calendar or scheduling system to identify periods with low workloads or potential conflicts with your absence.
</li>

<b>Communicate Early:</b>
<li>Inform your manager well in advance about your intention to take leave. Early communication allows your manager to plan accordingly.
</li>

<b>Provide Details:</b>
<li>Clearly communicate the dates of your intended leave, the duration, and the reason for the leave. If you have specific preferences or concerns, discuss them with your manager.
</li>

<b>Discuss Coverage:</b>
<li>Work with your manager to ensure there is sufficient coverage during your absence. If applicable, identify a colleague who can handle urgent matters in your absence.
</li>

<b>Submit Formal Request:</b>

<li>Follow the company's procedures for formally requesting leave. This may involve submitting a request through an HR portal or filling out a leave request form.
</li>

<b>Be Flexible:</b>
<li>Be open to discussing alternative dates or solutions if your manager suggests adjustments to your proposed leave dates.
</li>

<b>Plan Handover:</b>
<li>Prepare a handover document or checklist for tasks that need to be handled by others in your absence. Clearly outline the status of ongoing projects and any pending tasks.
</li>

<b>Stay Accessible:</b>
<li>Provide contact information in case of emergencies and assure your manager that you will be reachable during critical situations, if needed.
</li>

<b>Follow Up:</b>
<li>Once your leave is approved, follow up with any additional information your manager may need and ensure that your responsibilities are well-distributed among the team.
</li>
      </div>


      
        </div>
  )
}

export default Profile