import React from 'react';

export default function Dropdown(props: any){

    const optionsList = Array.from(props.dataTypes).map((element: any) => {
        let isSelected = element[1];
        let elemName = element[0]
      return <option 
      className ={(isSelected ? "btn-info" : "white")}
      selected={isSelected} data-filter={elemName}  key={elemName + "Key"}
      onClick={() => props.onCheckboxChange(elemName)}>{elemName}</option>
    })


   return ( 

    <div className="col-lg-6 ">
        <label className="mb-3 lead">Data types</label>
        <select multiple data-style="rounded-pill px-4 py-3 shadow-sm" className="selectpicker w-100"
      >
            {optionsList}
        </select>
    </div>
)
}