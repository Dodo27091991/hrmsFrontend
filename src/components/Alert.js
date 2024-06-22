import React from 'react'

const Alert = (props) => {
  return (
    <div className={` z-1 position-absolute alert alert-${props.type==='success'?'success':'danger'}`} style={{marginTop:'350px',marginLeft:'500px'}} role="alert">
  <b style={{marginLeft:'50px'}}>{props.type}:</b>{props.message}
</div>
  )
}

export default Alert