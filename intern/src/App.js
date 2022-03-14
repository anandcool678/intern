import './App.css';
import 'react-dropdown/style.css';
import React, {useState, useEffect, useCallback} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {LineChart, ResponsiveContainer, Legend, Tooltip, Line, XAxis, YAxis, CartesianGrid} from 'recharts';

function App() {
  const timeframe = ["1minute","2minute","3minute","5minute","10minute","15minute","30minute","1hour","2hour","4hour","1day"];

  const [instruments,setInstruments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeframes,setTimeframes] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectInstrument,setSelectInstrument] = useState(instruments[0]);
  const [currentTimeframe,setCurrentTimeframe] = useState(timeframe[0]);
  const [open,setOpen] = useState([]);
  const [high,setHigh] = useState([]);
  const [close,setClose] = useState([]);
  const [low,setLow] = useState([]);
  const [vol,setVol] = useState([]);
  const [oi,setOi] = useState([]);
  const [val,setVal] = useState([]);
  const [label,setLabel] = useState([]);
  const [dataSet,setData] = useState([]);
  const [openCheck,setOpenCheck] = useState(false);
  const [closeCheck,setCloseCheck] = useState(false);
  const [highCheck,setHighCheck] = useState(false);
  const [lowCheck,setLowCheck] = useState(false);
  const [volCheck,setVolCheck] = useState(false);
  const [oiCheck,setOiCheck] = useState(false);

  const makeArrayHandler = () => {
    let arr=[];
    label.map((item,index) => {
      arr.push({name : label[index],low : low[index], high: high[index],open : open[index],close: close[index],vol : vol[index]})
    })
    console.log(arr);
    setData(arr);
  }

  const bakchodi = () => {
    const url = `http://139.59.76.169:4002/api/candles?instrument=`+selectInstrument+`&timeframe=`+currentTimeframe+`&from=`+startDate+`&to=`+endDate
    console.log(url)
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        //console.log(result.data)
        const open=[]
        const close=[]
        const high=[]
        const low=[]
        const vol=[]
        const oi=[]
        const val=[]
        const label=[]
        result.data.map(ele => {
          let year=parseInt(ele[0].substr(0,4))*10000000;
          let mon=parseInt(ele[0].substr(5,2))*1000000;
          let date=parseInt(ele[0].substr(8,2))*10000;
          let time=parseInt(ele[0].substr(11,2)+ele[0].substr(14,2));
          label.push(ele[0])
          val.push(date+mon+year+time)
          open.push(ele[1])
          close.push(ele[4])
          high.push(ele[2])
          low.push(ele[3])
          vol.push(ele[5])
          oi.push(ele[6])
        })
        setLabel(label)
        setVal(val)
        setOpen(open)
        setClose(close)
        setHigh(high)
        setLow(low)
        setVol(vol)
        setOi(oi)
      })
      .then(() => {
        makeArrayHandler();
      })
  }

  useEffect(()=>{
    fetch("http://139.59.76.169:4002/api/instruments")
    .then(res => res.json())
    .then((result)=>{
      // console.log(result.data);
      setIsLoaded(true);
      setInstruments(result.data)
    })
    // console.log(selectInstrument,currentTimeframe,endDate);
    // console.log(instruments);
    // console.log(startDate,endDate);
  },[dataSet,highCheck,openCheck,lowCheck,closeCheck,volCheck,oiCheck])

  return (
    <div style={{paddingTop:"30px"}}>
     
     <div className='inputs'>
     <div>
      <label htmlFor="instrument" style={{paddingLeft:"30px"}}>Choose a Instrument:</label>
        <select name="instrument" value={selectInstrument} onChange={e=>setSelectInstrument(e.currentTarget.value)} id="instrument" style={{marginLeft:"5px"}}>
          {instruments.map(instrument => (
            <option className='instrument' value={instrument} key={instrument}>
              {instrument}
            </option>
          ))}
        </select>
     </div>
      <div>
        <label htmlFor="timeframe" style={{paddingLeft:"30px"}}>Choose a Timeframe:</label>
        <select name="timeframe" id="timeframe" className='timefram' value={currentTimeframe} onChange={e=>setCurrentTimeframe(e.target.value)}>
          {timeframe.map(timefra =>(
            <option className='timeframe-option' value={timefra}>
              {timefra}
            </option>
          ))}
        </select>
      </div>
      {/* <label htmlFor="timeframe">Start date:</label> */}
      {/* <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} /> */}
      <input type={"date"} id="startDate" name='startDate' onChange={(e)=>setStartDate(e.target.value)}></input>
      {/* <label htmlFor="timeframe">End date:</label> */}
      <input type={"date"} id="startDate" name='endDate' onChange={(e)=>setEndDate(e.target.value)}></input>
      {/* <DatePicker selected={endDate} style={{marginLeft:"-80px"}} onChange={(date:Date) => setStartDate(date)}  /> */}

      <button  className="fetchButton" onClick={bakchodi}>Fetch</button>
     </div>
      <div className='checkBoxes'>
        <div>
          <input type="checkbox" id="open" name="open" value="open" onClick={() => setOpenCheck(!openCheck)}></input>
          <label htmlFor="open">Open</label>
        </div>
        <div>
          <input type="checkbox" id="high" name="high" value="high" onClick={() => setHighCheck(!highCheck)}></input>
          <label htmlFor="high">High</label> 
        </div>
        <div>
          <input type="checkbox" id="low" name="low" value="low" onClick={() => setLowCheck(!lowCheck)}></input>
          <label htmlFor="low">Low</label> 
        </div>
        <div>
          <input type="checkbox" id="close" name="close" value="close" onClick={() => setCloseCheck(!closeCheck)}></input>
          <label htmlFor="close">Close</label>
        </div>
        <div>
          <input type="checkbox" id="vol" name="vol" value="vol" onClick={()=> setVolCheck(!volCheck)}></input>
          <label htmlFor="vol">Vol</label> 
        </div>
        <div>
          <input type="checkbox" id="oi" name="oi" value="oi" onClick={()=> setOiCheck(!oiCheck)}></input>
          <label htmlFor="oi">OI</label> 
        </div>
      </div>
      <div>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={dataSet} margin={{ right: 50 }}>
          <CartesianGrid />
          <XAxis dataKey="name" 
            tick={false}
            interval={'preserveStartEnd'} />
          <YAxis></YAxis>
          <Legend />
          <Tooltip />
          { lowCheck ? 
            <Line type="monotone" dataKey="low"
            stroke="black"  /> : null
          }
          {closeCheck ?
            <Line type="monotone" dataKey="close"
            stroke="green" /> : null
          }
          {highCheck ? 
            <Line type="monotone" dataKey="high"
            stroke="red" /> : null 
          }
          {openCheck ? 
            <Line type="monotone" dataKey="open"
              stroke="blue"  /> : null
          }
          {volCheck ? 
            <Line type="monotone" dataKey="vol"
              stroke="yellow"  /> : null
          }
          {oiCheck ? 
            <Line type="monotone" dataKey="oi"
              stroke="brown"  /> : null
          }
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}

export default App;
