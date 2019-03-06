import React from "react";

const ReadBtn = props => {
  return (
    <button 
      onClick={()=> {
        console.log("read click props: ", props);
        return props.click(props.result)
      }}
    >{props.name}</button>
  );

}

export default ReadBtn;
