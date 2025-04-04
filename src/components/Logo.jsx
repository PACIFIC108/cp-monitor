import React from 'react';

const Logo=()=>{
    const openLogo=()=>{
    	window.open('https://codeforces.com/');
    };

    return(

           <div className="mylogo mt-5" onClick={openLogo}>
             <img src="images/CFlogo.png"
                height='50px'
                alt="Codeforces logo"
          
             />
    
           </div>
    	);
};


export default Logo;