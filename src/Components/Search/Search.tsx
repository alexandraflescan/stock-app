import  React, {useState, useEffect} from 'react';
import Automcomplete from './Autocomplete';

function Search(props: any) {
  const [symbol, setSymbol] = useState("");
  
  function searchHandler(symbol: string) {
    props.searchSymbol(symbol);
    setSymbol("")
  }
  function selectItemHandler (property: string) {
    setSymbol(property)
}
  const isSymbol = () => {
    if(symbol !== ""){
      return <Automcomplete symbol={symbol} selectItemHandler={selectItemHandler}></Automcomplete>
    }
  }
  const showSuggestions = isSymbol();
    return(
     <div className="form-inline">
        <input className="form-control mr-sm-2"
         type="search" placeholder="Search" aria-label="Search" 
         value={symbol}
       onChange={e => setSymbol(e.target.value)}
       onKeyPress={(e) => (e.key === 'Enter' ? searchHandler(symbol) : null)
      }
      data-type={props.secondCompany}
       />
        <button className = "btn btn-outline-success my-2 my-sm-0" 
        onClick={() => searchHandler(symbol)} type="submit"
         >Search</button>
         
       {showSuggestions}
     </div>
    )

}

export default Search;