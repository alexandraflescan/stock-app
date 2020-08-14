import React from 'react';

function Checkbox(props: any) {
    return(
     <div onClick={() => props.onCheckboxChange(props.name)} key={props.name + "Key"}>
      <input className="checkbox" type="checkbox" name={props.name} data-filter={props.name} 
        checked={props.isSelected}
    ></input>
      <label id={props.name + "Check"} className={'btn btn-lg ' + (props.isSelected ? "btn-success" : "btn-info")} htmlFor={props.name}>{props.name}</label>
    </div>
    )
}

export default Checkbox;

