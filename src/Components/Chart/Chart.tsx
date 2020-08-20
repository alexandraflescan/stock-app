import  React, {  useState, useEffect } from 'react';
import ChartLine from './ChartLine'
import '../../App.css'

type ChartProps = {
  company: any,
  periodRange: {from: Date; to: Date},
  dataType: Array<string>,
  average: boolean
}

function Chart ({company, periodRange, dataType, average}: ChartProps) {
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState({} as any);
    const [labels, setLabels] = useState([] as any);
    const [chartLines, setChartLines] = useState([] as any);
    
    const receivedPeriodFrom = parseDate(periodRange.from);
    const receivedPeriodTo = parseDate(periodRange.to);

  
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

  let symbol = company;
  if (company.length > 1) symbol = company[1]

  let startDate = `${receivedPeriodFrom.year}-${receivedPeriodFrom.month}-${receivedPeriodFrom.day}`;
  let endDate = `${receivedPeriodTo.year}-${receivedPeriodTo.month}-${receivedPeriodTo.day}`;

   const apiUrl = "https://www.alphavantage.co/";
   const daily = `query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=`;
   const apiKey = "&apikey=JVDZKJANGFTHYKV7";
   let fetchUrl = `${apiUrl}${daily}${symbol}${apiKey}`;
  
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
            if (dataType.length < 1) {
               dataType = ["2. high"];
            }
  
          
               //list of data type 
                dataType.forEach((type: any) => {
  
                 
                  newLines.push(`${type}_${symbol}`);
                  let arrayOfDays: string[] = [];
                  let arrayOfLabels: string[] = [];
                  arrayOfDays.length = 0;
                  arrayOfLabels.length = 0;

                  //loop through daily data
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
  
                 newItems = {[`${type}_${symbol}`]: daysReversed}
                //  newItems[type] = daysReversed
                 newLabels =  labelsReversed;
                 console.log("newItems in loop", newItems)
  
                }
                
                );
              
                //update state with chart values to be displayed

              setItems((prevState: any) => {
               return {
                ...prevState,
                ...newItems             
               } 
              }
 
               );

              setLabels(newLabels);
              setChartLines((prevState: any) => [
                ...prevState,
                newLines
              ]);
  
              setIsLoaded(true);
             
          },
          (error) => {
          
              setIsLoaded(true);
              setError(error)
          }
      )
  
  },  [fetchUrl, dataType, periodRange, symbol])
 


  
  


    if(error) {
    return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading....</div>
    } else{
      return(<div className="container">
                    <ChartLine items={items}  labels={labels} chartLines={chartLines} average={average} companies={company}/>
          </div>)         
    }
}

export default Chart;