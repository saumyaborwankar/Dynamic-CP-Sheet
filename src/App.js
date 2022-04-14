import React, { useEffect, useState } from 'react'
import './App.css';
import Problem from './Problem';
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom'
import Login from './login';
// import Cookies from 'universal-cookie';
import { read_cookie } from 'sfcookies';
import Cookies from 'js-cookie'
import { list } from './list';
// const cookies = new Cookies();

// cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'));

const App = () => {

  return(
    <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/ladder" exact element={<Ladder/>} />
        </Routes> 
    </Router>
  );
}

const Ladder=()=>{

  const [todisplay,setToDisplay]=useState([]);
  // const [user,setUser] = useState("");
  // const [query,setQuery]=useState("");
  // let query=read_cookie('namedOFCookie');
  let query=Cookies.get('auth')

  const allProbs=list;
  useEffect((e)=>{
    getReqAllprob();
    console.log(query);
  },[query]);

  function filterNeeded(prob){
    var list=[];
    // console.log(prob)
    // console.log(prob.problems.length);
    for(let j=0;j<allProbs.length;j++){
      for(let i=0;i<prob.problems.length;i++){
        if(allProbs[j][0]===prob.problems[i].contestId && allProbs[j][1]===prob.problems[i].index){
          list.push([prob.problems[i].contestId,prob.problems[i].index,prob.problems[i].name,"false",allProbs[j][2],allProbs[j][3]]);
        }
      }
    }
    // console.log('--------------------------------');
    // console.log(list);
    return list;
  };


  function indexOfArray(val, hash) {
    return (hash.hasOwnProperty(val)) ? hash[val] : -1;
  };


  function mySolved(mysolved,allNeededProbs){
    var mysolvedlist=[];
    var display=[];
    // console.log(mysolved);
    for(let i=0;i<mysolved.length;i++){
      if(mysolved[i].verdict==="OK"){
        mysolvedlist.push([mysolved[i].problem.contestId,mysolved[i].problem.index]);
      }
    };
    var hash = {};
    for (var i = 0; i < mysolvedlist.length; i++) {
      hash[mysolvedlist[i]] = i;
    }
    // console.log(hash);
    // console.log(mysolvedlist);
    for(let i=0;i<allNeededProbs.length;i++){
      if(indexOfArray([allNeededProbs[i][0],allNeededProbs[i][1]],hash) !== -1 ){
      // if(mysolvedlist.indexOf([allNeededProbs[i][0],allNeededProbs[i][1]]) != -1){
        // console.log('Reached_herer');
        display.push([allNeededProbs[i][0],allNeededProbs[i][1],allNeededProbs[i][2],"true",allNeededProbs[i][4],allNeededProbs[i][5]]);
      }
      else{
        display.push([allNeededProbs[i][0],allNeededProbs[i][1],allNeededProbs[i][2],allNeededProbs[i][3],allNeededProbs[i][4],allNeededProbs[i][5]]);
      }
    }
    // console.log(display);
    return display;
  };


  const getReqAllprob = async ()=>{
    const response=await fetch('https://codeforces.com/api/problemset.problems?locale=en');
    const data=await response.json();
    const allNeededProbs=filterNeeded(data.result);

    const response2 = await fetch(`https://codeforces.com/api/user.status?handle=${query}`)
    // console.log(user);
    const data2 = await response2.json();
    // console.log(data.result);
    // setMySolved(data2.result);
    const display=mySolved(data2.result,allNeededProbs);
    setToDisplay(display);
    // setAllProb(allNeededProbs);

  };
  const backToLogin = e =>{
    window.location.href = '/';
  }

return(
  <div className='App'>
    {/* <form action="search-form" onSubmit={getUser}>
    <input type="text" className='search-bar' onChange={updateUser}  />
      <button className='search-button' type='submit'> 
        Search
      </button> */}
    
    {/* </form> */}
    <table className='center'>
          <tr>
              <th>Topic</th>
              <th>Problem</th>
              <th>Solved</th>
          </tr>
          {todisplay.map(problem=>( <Problem key={problem[2]} title={problem[2]} solved={problem[3]} topic={problem[5]} link={problem[4]} /> ))}
          <button className='center' onClick={backToLogin}>Back to Login</button>
    </table>
  </div>
  
  
)}
export default App;
