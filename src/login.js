import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';



function Login(){
    const cookie_key = 'namedOFCookie';
    const [user,setUser] = useState("");
    const [query,setQuery]=useState("");


  
    const allProbs=[[282,'A',"https://codeforces.com/problemset/problem/282/A"],[514,'A',"https://codeforces.com/contest/514/problem/A"],[52,'C',"https://codeforces.com/contest/52/problem/C"],[1023,'D',"https://codeforces.com/contest/1023/problem/D"]];
  
    useEffect((e)=>{
    },[query]);
  
    const updateUser=e=>{
      setUser(e.target.value);
    }
  
    const getUser=e=>{
      e.preventDefault();
      setQuery(user);
      bake_cookie(cookie_key, user);
      console.log(read_cookie(cookie_key))
  
    }
    return(
        <div>
            <h1>Login Page</h1>
            <form action="search-form" onSubmit={getUser}>
                <input type="text" className='search-bar' onChange={updateUser} />
                    <Link to="/ladder"> <button className='search-button' type='submit'> 
                    Search
                    </button>
                    </Link>
            </form>
            
        </div>
    );
}

export default Login;