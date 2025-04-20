import React,{useState} from 'react';
import { toast } from 'sonner';

const UserInput=({userhandle,setUserhandle,success,setsuccess})=>{
   const[userHandle,setUserHandle]=useState('')
   const [loginStatus, setLoginStatus] = useState('');
   const [rating, setrating] = useState('');
    const [maxrating, setmaxrating] = useState('');
     const [rank, setrank] = useState('');
     const [maxrank, setmaxrank] = useState('');
     const [friends, setfriends] = useState('');
     
  const login = async () => {
    
    if(success){
      setrating('');
      setUserhandle('');
      setmaxrating('');
      setrank('');
      setmaxrank('');
      setfriends('');
      setsuccess(false);
      setUserHandle('')
      setLoginStatus('Please enter a Codeforces handle.');
      toast.success('Logged Out')
      return 
    }

    if (!userHandle) {
      setLoginStatus('Please enter a Codeforces handle.');
      return;
    }

    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${userHandle}`);
      const data = await response.json();

      if (data.status === 'OK') {
         setLoginStatus(`Logged in as ${userHandle}.`);
         setUserhandle(userHandle);
         setsuccess(true);
         setrating(data.result[0].rating);
         setmaxrating(data.result[0].maxRating);
         setrank(data.result[0].rank);
         setmaxrank(data.result[0].maxRank);
         setfriends(data.result[0].friendOfCount);
      } 
      else {
        setLoginStatus('Invalid handle. Please try again.');
        setUserHandle("");
        setsuccess(false);
      }
    } catch (error) {
      setLoginStatus('Error: Could not connect to Codeforces.');
      console.error('Fetch error:', error);
    }

  };
   return(
   	<div>
   	<label htmlFor="user">User</label>
   	<input 
   	type="text" 
   	id="user" 
   	value={userHandle}
   	onChange={(e)=>setUserHandle(e.target.value)}
   	placeholder="Enter Codeforces Handle"
   	/>
   	
   	<button className="btn" onClick={login}>{!success?'Login':'Logout'}</button>

   	<p id="loginMsg">{loginStatus}</p>


    {success && (<ul className="info bg-white shadow-lg rounded-xl p-4 w-80 mt-4 mx-auto text-gray-700">
                {rating && maxrating && (
                  <li className="flex justify-between py-2 border-b">
                    <span className="font-medium">Rating:</span>
                    <span>{rating} <span className="text-gray-500">(Max: {maxrating})</span></span>
                  </li>
                )}
                {rank && maxrank && (
                  <li className="flex justify-between py-2 border-b">
                    <span className="font-medium">Ranking:</span>
                    <span>{rank} <span className="text-gray-500">(Max: {maxrank})</span></span>
                  </li>
                )}
                {friends && (
                  <li className="flex justify-between py-2">
                    <span className="font-medium">Friends:</span>
                    <span>{friends}</span>
                  </li>
                )}
            </ul>)}

   	</div>
   	);

};


export default UserInput;
