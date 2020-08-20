import React, { useState} from 'react';

import Search from './Components/Search/Search'
import Chart from './Components/Chart/Chart'
import TimeRange from './Components/TimeRange/TimeRange'
import Checkbox from './Components/Checkbox/Checkbox'
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import '../src/App.css'

function App() {
const [chart, setChart] = useState([] as any);
const [period, setPeriod] = useState(getInitialState());
const [dataType, setDataType] = useState([] as any);
const [secondComp, setSecondComp] = useState (false);
const [checkboxes, setCheckboxes] = useState( new Map([ 
["low", false],
["high", false],
["volume", false]])
);

const [average, setAverage] = useState(false);



  function searchSymbol(symbol: string){
    setChart((prevState: any) => [
      ...prevState,
      symbol
    ]);

  }

  function handleDayClick(day: any) {
    const range = DateUtils.addDayToRange(day, period);
    setPeriod(range);

  }


  function compareCompanyHandler () {
    setSecondComp(true)
  }

  function selectPeriodHandler(e: any){
  const currentBtn = e.target.id;
  return currentBtn;
}

  function getInitialState() {
    return {
      from: new Date(),
      to: new Date()
    };
  }
  
  const displayAverageHandler = () => setAverage(!average)
  
  function onCheckboxChange(checkName: string){
    setCheckboxes(checkboxes.set(checkName, !checkboxes.get(checkName)));
    const dataElements = mapDataTypes(checkboxes);
    setDataType(dataElements);

  }

function mapDataTypes(map: any){
  let newDataType = [] as any;
  let dataElem = "";
    for (let [key, value] of map) {
      if(value === true){
        switch(key){
          case("high"):
          dataElem = "2. high" ;
          break;
    
          case("low"):
          dataElem =  "3. low";
          break;
          
          case("volume"):
          dataElem = "6. volume";
          break;
        }
    
        newDataType.push(dataElem)
      }

  }
  return newDataType;
}


 

  function appInit() {
    
    if (chart.length > 0){
      return( 
      <div>
      <Chart company={chart} periodRange={period}  dataType={dataType} average={average} />
      <Checkbox
      isSelected={average} 
      onCheckboxChange={displayAverageHandler}
      name={"Show Average"}></Checkbox>


      </div>)
    }
  }

  const allCheckboxes =  Array.from(checkboxes).map(property => {
 
  const isSelected = property[1];

   return <Checkbox
  isSelected={isSelected} 
   onCheckboxChange={onCheckboxChange}
   name={property[0]}/>
  } 
    )
  const showChart = appInit();
  const { from, to } = period;
  const modifiers = { start: from, end: to };
  
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand">Stock Price</a>
    </nav>
    <div className="page-wrapper">
     <div className="search-container">
  
    <h2>Select custom or  default period</h2>
   <DayPicker 
   className="Selectable"
   selectedDays={[from, { from, to }]}
   modifiers={modifiers}
   onDayClick={handleDayClick}
   disabledDays={[new Date()]}
    />;
    
    <TimeRange selectPeriodHandler={selectPeriodHandler} />
    <h2>Select chart data type</h2>
     <div className="buttons-container">{allCheckboxes}</div>
  
       <Search searchSymbol={searchSymbol} secondCompany={false}/>
       <Checkbox
      isSelected={secondComp} 
      onCheckboxChange={compareCompanyHandler}
      name={"Compare with"}></Checkbox>
      {secondComp && <Search searchSymbol={searchSymbol} secondCompany={true}/>}
       </div>

    <div className="chart-container">{showChart}</div>
    </div>
    </div>

  );
}

export default App;
