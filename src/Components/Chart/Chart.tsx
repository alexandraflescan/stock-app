import  React, {  useState, useEffect } from 'react';
import ChartLine from './ChartLine';
import '../../App.css';
import StockData from '../Classes/StockData';

type ChartProps = {
  company: any,
  periodRange: {from: Date; to: Date},
  dataType: Array<string>,
  average: boolean
}

export default function Chart ({company, periodRange, dataType, average}: ChartProps) {
    const [error, setError] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [store, setStore] = useState({} as StockData)
    const [chartData, setChartData] = useState({} as any);
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
  if (company.length > 1) symbol = company[company.length -1];

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
              const dataStore = result["Time Series (Daily)"];
              if (dataStore === undefined) {
                console.error(result);
                setError("Please try again");
                
              } 
              else {
                //get object of type StockData
                const dataObj = new StockData(dataStore, symbol);
                //save data in store
                setStore(dataObj)
                //populate chart lines data (from props)
                dataObj.populateChartData(dataType, startDate, endDate, average);
              
                setChartData((prevState: any) => {
                  return{
                    ...prevState,
                    ...dataObj.chartData
                  }
                });
                
                setLabels(dataObj.labels);

                setChartLines((prevState: any) => {
                  return[
                    ...prevState,
                    ...dataObj.newLines
                ]
                });
                
              }

              setIsLoaded(true);                                

          },
          (error) => {
          
              setIsLoaded(true);
              setError(error)
          }
      )

     
  
  },  [symbol])

  useEffect(() => {
    if (Object.keys(store).length === 0 && store.constructor === Object ) return;

    const storeHolder = new StockData(store.stockData, store.company);
    storeHolder.populateChartData(dataType, startDate, endDate, average);

    setChartData(storeHolder.chartData);
    setLabels(storeHolder.labels);
    setChartLines(storeHolder.newLines);

  }, [periodRange, average, dataType]);
 


    if(error != "") {
    return <div>Error: {error}</div>
    } else if (!isLoaded) {
        return <div>Loading....</div>
    } else{
      return(<div className="container">
                    <ChartLine items={chartData}  labels={labels} chartLines={chartLines} average={average} companies={company}/>
          </div>)         
    }
}

