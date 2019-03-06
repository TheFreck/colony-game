import React from "react";

const DeleteBtn = props => {
  return (
    <button 
      onClick={() => props.delete(props.id)}
    >Delete</button>
  );

}

export default DeleteBtn;
