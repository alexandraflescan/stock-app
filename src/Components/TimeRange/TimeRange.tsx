import React from 'react';

function TimeRange(props:any){
    return( 
      
        <div className="buttons-container"  onClick={props.selectPeriodHandler}>
            <button id="5days" type="button" className="btn btn-info btn-lg">5 days</button>
            <button id="1month" type="button" className="btn btn-info btn-lg">1 month</button>
            <button id="6months"  type="button" className="btn btn-info btn-lg">6 months</button>  
        </div>
       
   
    )
}

export default TimeRange;