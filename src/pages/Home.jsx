import React,{useEffect} from 'react'
import UserInput from '../components/UserInput';


function Home() {

	 useEffect(() => {
	    document.body.classList.add("overflow-hidden");

	    return () => {
	      document.body.classList.remove("overflow-hidden");
	    };
	  }, []);

	return (
		<div className='App'>
              <UserInput  />
		</div>
	)
}

export default Home