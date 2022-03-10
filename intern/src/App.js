import './App.css';
import 'react-dropdown/style.css';
import React, {useState, useEffect, useCallback} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  const [instruments,setInstruments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeframes,setTimeframes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const timeframe = ["1 Minutes","2 Minutes","3 Minutes","5 Minutes","10 minutes","15 Minutes","30 Minutes","1 Hour","2 hour","4 Hour","1 day"];
    useEffect(()=>{
      fetch("http://139.59.76.169:4002/api/instruments")
      .then(res => res.json())
      .then((result)=>{
        // console.log(result.data);
        setIsLoaded(true);
        setInstruments(result.data)
      })
      // console.log(startDate,endDate);
    },[])
 
  return (
    <div style={{paddingTop:"30px"}}>
     
     <div className='inputs'>
     <div>
      <label htmlFor="instrument" style={{paddingLeft:"30px"}}>Choose a Instrument:</label>
        <select name="instrument" id="instrument" style={{marginLeft:"5px"}}>
          {instruments.map(instrument => (
            <option className='instrument'>
              {instrument}
            </option>
          ))}
        </select>
     </div>
      <div>
        <label htmlFor="timeframe" style={{paddingLeft:"30px"}}>Choose a Timeframe:</label>
        <select name="timeframe" id="timeframe" className='timefram'>
          {timeframe.map(timefra =>(
            <option className='timeframe-option'>
              {timefra}
            </option>
          ))}
        </select>
      </div>
      {/* <label htmlFor="timeframe">Start date:</label> */}
      {/* <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} /> */}
      <input type={"date"} id="startDate" name='startDate'></input>
      {/* <label htmlFor="timeframe">End date:</label> */}
      <input type={"date"} id="startDate" name='startDate'></input>
      {/* <DatePicker selected={endDate} style={{marginLeft:"-80px"}} onChange={(date:Date) => setStartDate(date)}  /> */}

      <button  className="fetchButton">Fetch</button>
     </div>
      <div className='checkBoxes'>
        <div>
          <input type="checkbox" id="open" name="open" value="open"></input>
          <label for="open">Open</label>
          </div>
        <div>
          <input type="checkbox" id="high" name="high" value="high"></input>
          <label for="high">High</label> 
        </div>
        <div>
          <input type="checkbox" id="low" name="low" value="low"></input>
          <label for="low">Low</label> 
        </div>
        <div>
          <input type="checkbox" id="close" name="close" value="close"></input>
          <label for="close">Close</label>
        </div>
        <div>
          <input type="checkbox" id="vol" name="vol" value="vol"></input>
          <label for="vol">Vol</label> 
        </div>
        <div>
          <input type="checkbox" id="oi" name="oi" value="oi"></input>
          <label for="oi">OI</label> 
        </div>
      </div>
    </div>
  );
}

export default App;
