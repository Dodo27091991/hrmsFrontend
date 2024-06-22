//import logo from './logo.svg';
import './App.css';
import './components/NewStyle.css'
import Profile from './components/Profile';
import NavBar from './components/NavBar';
//import Hrms from './components/Hrms'; // Depricated
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import ManageAttandance from './components/ManageAttandance';
import ManageEmployee from './components/ManageEmployee';
import PasswordReset from './components/PasswordReset';
import Alert from './components/Alert';
import { useState } from 'react';


import AttendanceCorrection from './components/AttendanceCorrection';
import RoleChange from './components/RoleChange';
import Appreciation from './components/Appreciation';
import EmployeeAttendance from './components/EmployeeAttendance';
import TodayTeamAttendance from './components/TodayTeamAttendance';
import HolidayBroadcast from './components/HolidayBroadcast';
import DeactivateEmployee from './components/DeactivateEmployee';
import ChangeSupserviser from './components/ChangeSupserviser';
import MaternatyPaternaty from './components/MaternatyPaternaty';
import Hrms2 from './components/Hrms2';
import Hrms from './components/Hrms';



function App() {

  const [type, setType] = useState('danger')
  const [alert, setAlert] = useState(false)
  const [message, setMessage] = useState('this is alert')
  return (
    
    //<div className="app-style">
    <div className='z-0' >
    <Router>
    <NavBar />   
    {alert?<Alert  message={message} type={type} />:''}
 
      <Routes>    
         <Route path="/" element={<Profile setType={setType} setAlert={setAlert} setMessage={setMessage} />} />
         <Route path="/hrms" element={<Hrms setType={setType} setAlert={setAlert} setMessage1={setMessage} />} />
         <Route path="/login" element={<Login setType={setType} setAlert={setAlert} setMessage={setMessage}/>} />
         <Route path="/createUser" element={<CreateUser setType={setType} setAlert={setAlert} setMessage1={setMessage} />} />
         <Route path="/manageAttendance" element={<ManageAttandance />} />
         <Route path="/changeSupervisor" element={<ManageEmployee />}>
                <Route path='attendanceCorrection' element={<AttendanceCorrection setType={setType} setAlert={setAlert} setMessage={setMessage} />} />
                <Route path='roleChange' element={<RoleChange setType={setType} setAlert={setAlert} setMessage={setMessage}/>} />
                <Route path='appreciation' element={<Appreciation />} />
                <Route path='employeeAttendance' element={<EmployeeAttendance />} />
                <Route path='todayTeamAttendance' element={<TodayTeamAttendance />} />
                <Route path='holidayBroadcast' element={<HolidayBroadcast setType={setType} setAlert={setAlert} setMessage={setMessage}/>} />
                <Route path='deactivateEmployee' element={<DeactivateEmployee setType={setType} setAlert={setAlert} setMessage={setMessage} />} />
                <Route path='changeSupervisor' element={<ChangeSupserviser setType={setType} setAlert={setAlert} setMessage={setMessage} />} />
                <Route path='maternatyPaternaty' element={<MaternatyPaternaty setType={setType} setAlert={setAlert} setMessage={setMessage}/>} />
         </Route>
         <Route path="/resetPassword" element={<PasswordReset setAlert={setAlert} setMessage={setMessage} setType={setType} />} />
         </Routes>
      
      
        
      
      

    
    
    
    </Router>
    
    </div>

  );
}

export default App;
