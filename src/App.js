import React, { useEffect, useState } from 'react'
import './App.css';
import Problem from './Problem';
import {BrowserRouter as Router, Switch, Route, Routes} from 'react-router-dom'
import Login from './login';
import Cookies from 'universal-cookie';
import { read_cookie } from 'sfcookies';

// const cookies = new Cookies();

// cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'));

const App = () => {

  return(
    <Router>
        <Routes>
          <Route path="/login" exact element={<Login/>} />
          <Route path="/ladder" exact element={<Ladder/>} />
        </Routes> 
    </Router>
  );
}

const Ladder=()=>{

  const [todisplay,setToDisplay]=useState([]);
  // const [user,setUser] = useState("");
  // const [query,setQuery]=useState("");
  const query=read_cookie('namedOFCookie');

  const allProbs=[[282,'A',"https://codeforces.com/problemset/problem/282/A"],[514,'A',"https://codeforces.com/contest/514/problem/A"],[52,'C',"https://codeforces.com/contest/52/problem/C"],[1023,'D',"https://codeforces.com/contest/1023/problem/D"]];

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
          list.push([prob.problems[i].contestId,prob.problems[i].index,prob.problems[i].name,"false",allProbs[j][2]]);
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
        display.push([allNeededProbs[i][0],allNeededProbs[i][1],allNeededProbs[i][2],"true",allNeededProbs[i][4]]);
      }
      else{
        display.push([allNeededProbs[i][0],allNeededProbs[i][1],allNeededProbs[i][2],allNeededProbs[i][3],allNeededProbs[i][4]]);
      }
    }
    // console.log(display);
    return display;
  };


  const getReqAllprob = async ()=>{
    const response=await fetch('https://codeforces.com/api/problemset.problems');
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
  

return(
  <div className='App'>
    {/* <form action="search-form" onSubmit={getUser}>
    <input type="text" className='search-bar' onChange={updateUser}  />
      <button className='search-button' type='submit'> 
        Search
      </button> */}
    
    {/* </form> */}
    <table>
          <tr>
              <th>Problem</th>
              <th>Solved</th>
          </tr>
          {todisplay.map(problem=>( <Problem key={problem[2]} title={problem[2]} solved={problem[3]} link={problem[4]} /> ))}
    </table>
  </div>
  
  
)}
export default App;
