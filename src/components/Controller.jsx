import React,{useState} from 'react';
import Logo from './Logo';
import UserInput from './UserInput';
import MonitoringControls from './MonitoringControls';
import Options from './Options'

function Controller() {
  const [userHandle, setUserHandle] = useState('');
  const [success,setsuccess]=useState(false);
  return (
    <div className="App">
          <Logo />
          <UserInput userhandle={userHandle} setUserhandle={setUserHandle} success={success} setsuccess={setsuccess}/>
          <MonitoringControls userHandle={userHandle} success={success}/>
          <Options userHandle={userHandle} success={success}/>
    </div>
  );
}

export default Controller;