import React from "react";

const Input = props => {

  return(
    // <div>pixie dust</div>
    <form onSubmit={props.submit}>
      <input
        type="text"
        placeholder={props.placeholder}
        onChange={props.change}
        name={props.named}
      />
    </form>
  )

}

export default Input;