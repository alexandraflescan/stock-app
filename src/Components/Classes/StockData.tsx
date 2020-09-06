
export default class StockData {
    stockData: any;
    company: string;
    labels: any = null;
    chartData = {} as any;
    newLines = [] as any;
   

    constructor(stockData: any, company: string) {
       this.stockData = stockData;
       this.company = company;    
    
    }

    populateChartData(dataType: Array<string>, startDate: string, endDate: string, average: boolean) {
        let newItems = {};
        let newLabels = {};
        let listOfData = [] as any;
        let listChartLines = [] as any;
    
         //list of data type 
          dataType.forEach((type: string) => {

            listChartLines.push(`${type}_${this.company}`);
            let arrayOfDays: string[] = [];
            let arrayOfLabels: string[] = [];
            arrayOfDays.length = 0;
            arrayOfLabels.length = 0;

            //loop through daily data
            for( let eachDay in this.stockData ){              
              let numbers = (this.stockData)[eachDay][type];
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
           
           newItems = {[`${type}_${this.company}`]: daysReversed};
           listOfData = {...listOfData, ...newItems}
           newLabels =  labelsReversed;
         
          
          });
          this.labels = newLabels;
          this.chartData = listOfData;
          this.newLines = listChartLines;
    }
}

