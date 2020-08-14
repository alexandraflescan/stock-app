import  React, {  useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import ChartLine from './ChartLine'
import '../../App.css'



function Chart (props: any) {
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({} as any);
    const [labels, setLabels] = useState([] as any);
    const [chartLines, setChartLines] = useState([] as any);
    
    const receivedPeriodFrom = parseDate(props.periodRange.from);
    const receivedPeriodTo = parseDate(props.periodRange.to);

  
  function parseDate(date: Date) {
    const newDate =  {
      day: date.getDate().toString(),
      month: (date.getMonth() + 1).toString(),
      year: date.getFullYear().toString()
    } 
    if (parseInt(newDate.day) < 10) { 
      newDate.day = '0' + newDate.day.toString(); 
  } 
    if (parseInt(newDate.month) < 10) { 
    newDate.month = '0' + newDate.month.toString(); 
}  
    return newDate;
  }

  const symbol = props.symbol;
  
   const apiUrl = "https://www.alphavantage.co/";
   const daily = `query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=`;
   const apiKey = "&apikey=JVDZKJANGFTHYKV7";
   const fetchUrl = `${apiUrl}${daily}${symbol}${apiKey}`;


   let startDate = `${receivedPeriodFrom.year}-${receivedPeriodFrom.month}-${receivedPeriodFrom.day}`;
   let endDate = `${receivedPeriodTo.year}-${receivedPeriodTo.month}-${receivedPeriodTo.day}`
  
  
   useEffect(() => {
    fetch((fetchUrl))
    .then(res => res.json())
    .then(
        (result) => {        
            const priceData = result["Time Series (Daily)"]
            
            let newLines = [] as any; 
            let newItems = {};
            let newLabels = {};
           //empty data type
          if (props.dataType.length < 1) {
            props.dataType = ["2. high"];
          }

        
             //list of data type 
              props.dataType.forEach((type: any) => {

               
                newLines.push(type);

                let arrayOfDays: string[] = [];
                let arrayOfLabels: string[] = [];
                arrayOfDays.length = 0;
                arrayOfLabels.length = 0;
                for( let eachDay in priceData ){              
                  let numbers = priceData[eachDay][type];
                  let dateInArray = new Date(eachDay);
                  let compareStart = new Date(startDate);
                  let compareEnd = new Date(endDate);

                //get data for selcted period
                  if(dateInArray > compareStart && dateInArray < compareEnd){
                    arrayOfDays.push(numbers);
                    arrayOfLabels.push(eachDay);
                  }         
                  
              }   
              const daysReversed = arrayOfDays.reverse();
              const labelsReversed = arrayOfLabels.reverse()

               newItems = {...newItems, [type]: daysReversed}
               newLabels =  labelsReversed;

              }
              
              );
        
            setItems(newItems);
            setLabels(newLabels);
            setChartLines(newLines)

            setIsLoaded(true);
           
        },
        (error) => {
        
            setIsLoaded(true);
            setError(error)
        }
    )

},  [fetchUrl, props.dataType, props.periodRange])



    if(error) {
    return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading....</div>
    } else{
      return(<div className="container">
                    <ChartLine items={items}  labels={labels} chartLines={chartLines} average={props.average}/>
          </div>)         
    }
}

export default Chart;