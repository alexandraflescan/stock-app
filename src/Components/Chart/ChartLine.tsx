import React from 'react';
import { Line } from "react-chartjs-2";

function ChartLine(props: any) {
    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return `${o(r()*s)},${o(r()*s)},${o(r()*s)}`;
    }
  
    let chartLinesList = [] as any;
   

    props.chartLines.forEach((line: any) => {
        let lineColor = random_rgba();   
        const retrievedData = {
                label: line,
                data: props.items[line],
                fill: true,
                backgroundColor: `rgba(${lineColor},0.2)`,
                borderColor: `rgba(${lineColor},1)`
          };
          chartLinesList.push(retrievedData)
    }  
    );

    //show average if one line
    if (props.average === true){
        let avg  = 0;
            const list = chartLinesList[0].data;
            var total = 0;
                for(var i = 0; i < list.length; i++) {
                    total +=  parseInt(list[i], 10);
                }
             avg = total / list.length;
        
      
        const averageData = Array(chartLinesList[0].data.length).fill(avg);
        let averageColor = random_rgba();   
      

        const valuesAverage = {
            label: "Average",
            data: averageData,
            fill: true,
            backgroundColor: `rgba(${averageColor},0.2)`,
            borderColor: `rgba(${averageColor},1)`
      };
      chartLinesList.push(valuesAverage)


    }



            //get chart line data
            const data = {
                labels: props.labels,
                //actual lines in chart
                datasets: chartLinesList
            };
         
            const legend = {
                display: true,
                position: "bottom",
                labels: {
                  fontColor: "#323130",
                  fontSize: 14
                }
              };
              
              const options = {
                title: {
                  display: true,
                  text: "Stock Market"
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        suggestedMin: 0,
                        suggestedMax: 100
                      }
                    }
                  ]
                }
              };
    

    return(
       <div>
           <Line data={data} legend={legend} options={options}/>
       </div>
    )
}

export default ChartLine;