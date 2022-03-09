import './App.css';
import 'react-dropdown/style.css';
import React, {useState, useEffect, useCallback} from 'react';

function App() {
  const [instruments,setInstruments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeframes,setTimeframes] = useState([]);
  const timeframe = ["1 Minutes","2 Minutes","3 Minutes","5 Minutes","10 minutes","15 Minutes","30 Minutes","1 Hour","2 hour","4 Hour","1 day"];
    useEffect(()=>{
      fetch("http://139.59.76.169:4002/api/instruments")
      .then(res => res.json())
      .then((result)=>{
        console.log(result.data);
        setIsLoaded(true);
        setInstruments(result.data)
      })
      
    },[])
 
  return (
    <div style={{paddingTop:"30px"}}>
     
     <label for="instrument" style={{paddingLeft:"30px"}}>Choose a Instrument:</label>
      <select name="instrument" id="instrument" style={{marginLeft:"5px"}}>
        {instruments.map(instrument => (
          <option className='instrument'>
            {instrument}
          </option>
        ))}
      </select>
      <label for="timeframe" style={{paddingLeft:"60px"}}>Choose a Timeframe:</label>
      <select name="timeframe" id="timeframe" className='timefram'>
        {timeframe.map(timefra =>(
          <option className='timeframe-option'>
            {timefra}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
