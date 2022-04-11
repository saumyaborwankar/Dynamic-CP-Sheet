import React, { useEffect, useState } from 'react'
import './App.css';
import Problem from './Problem';

const App = () => {
  const USERNAME='saumya.borwankar';

  const [problems,setProblems]=useState([]);
  const [allProb, setAllProb] = useState([]);

  useEffect((e)=>{
    // getReqAllprob();
    getReq();
    
  },[]);
  const getReqAllprob = async ()=>{
    const response=await fetch('https://codeforces.com/api/problemset.problems');
    const data=await response.json();
    setAllProb(data.result);
    
  };
  const getReq = async ()=>{
    const response = await fetch(`https://codeforces.com/api/user.status?handle=${USERNAME}`)
    const data = await response.json();
    console.log(data.result);
    setProblems(data.result);
  };

  function isSolved(problem){
    if(problem.verdict==="OK"){
      return true;
    }
    return false;
  }
  function isMatch(problem){

    var list=[[1665,'A'],[514,'A'],[263,'A']];
    var query=[problem.problem.contestId,problem.problem.index];
    console.log(problem);
    for(let i=0;i<list.length;i++){
      if(list[i][0]===query[0] && list[i][1]===query[1]){
        
        return true;
      }
    }
    return false;

  }
  return(
    <div className='App'>
      <form action="search-form">
        <input type="text" className='search-bar' />
          <button className='search-button' type='submit'> 
            Search
          </button>
        
      </form>
      {problems.slice(0,10).filter(isSolved).filter(isMatch).map(problem => (
        
        <Problem 
          key={problem.problem.name} 
          title={problem.problem.name} 
          solved={problem.verdict}/>
      ))};
      
    </div>
  );
}

export default App;
