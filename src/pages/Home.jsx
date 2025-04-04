import React,{useEffect} from 'react'
import Controller from "../components/Controller"


function Home() {

	 useEffect(() => {
	    document.body.classList.add("overflow-hidden");

	    return () => {
	      document.body.classList.remove("overflow-hidden");
	    };
	  }, []);

	return (
		<div >
             <Controller />

		</div>
	)
}

export default Home