import React from "react";
// import ReadBtn from "../buttons/ReadBtn";
// import DeleteBtn from "../buttons/DeleteBtn";

const SavedList = props => {
  let results = props.results;
  // console.log("saved results: ", results);
  return(
    <div className="minerDisply">
      {results.map(result => {
        // console.log("saved list result: ", result);
        return (
          <div 
            className="miner" 
            key={result.minerName}
          >
            <h3>{result.minerName}</h3>
            <h3>({result.minerLocation.x}: {result.minerLocation.y})</h3>
            <h4>Fill Level: {result.fillLevel}</h4>
          </div>
        )})
      }
    </div>
  )
};

export default SavedList;
