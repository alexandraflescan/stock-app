import React, {useState, useEffect} from 'react';

function Autocomplete (props: any){
    const [dataLoaded, setDataLoaded]  = useState(false);
    const [err, setErr] = useState("");
    const [autocompleteList, setAutocompleteList] = useState([] as any)
    const keyword = props.symbol;
    const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=JVDZKJANGFTHYKV7`;
    
    useEffect(() => {
        fetch((apiUrl))
        .then(res => res.json())
        .then(
            (result) => {
              {
                const resultList = result.bestMatches;
                let companyNames =  {} as any;
                resultList.forEach((element: any) => {
                    companyNames[element["1. symbol"]] =  element[ "2. name"];
                });
    
                setAutocompleteList(companyNames)
              }
             setDataLoaded(true);
            },
            (err) => {
            
              setDataLoaded(true);
              setErr(err)
            }
        )
          }, [props.symbol, apiUrl]);

          
         
            let displayedItems = [] as any;
            for (const property in autocompleteList) {
                displayedItems.push(<li className="list-item" onClick={() => props.selectItemHandler(property)} key={property}>{property}: {autocompleteList[property]} </li>) 
              }

        
          //DISPLAY SECTION
          if(err) {
            return <div>Error: {err}</div>
            } else if (!dataLoaded) {
                return <div>Loading....</div>
            } else{
    if (autocompleteList.length <= 0){
       return <p>No suggestions found</p>
        }
        else {
            return (<div><ul>{displayedItems}</ul></div>) 
        }
    } 
}

export default Autocomplete;