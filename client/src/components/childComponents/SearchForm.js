import React from "react";
import Button from "../buttons/Button";

const SearchForm = props => {
  return (
    <div>
      <form 
        className="searchForm"
        onSubmit={props.goofy}
      >
        <label htmlFor="minerName">Name:</label>
        <input
          onChange={props.handleInputChange}
          value={props.minerName}
          name="minerName"
          type="text"
          className="form-control"
          placeholder="the name goes here"
          id="minerName"
        />
        <label htmlFor="minerLocationX">Location X:</label>
        <input
          onChange={props.handleInputChange}
          value={props.minerLocationX}
          name="minerLocationX"
          type="text"
          className="form-control"
          placeholder="the left-right coordinate"
          id="minerLocationX"
        />
        <label htmlFor="minerLocationY">Location Y:</label>
        <input
          onChange={props.handleInputChange}
          value={props.minerLocationY}
          name="minerLocationY"
          type="text"
          className="form-control"
          placeholder="the up-down coordinate"
          id="minerLocationY"
        />
        <Button
          click={props.handleFormSubmit}
          id="Get"
        />
        <Button
          click={props.handleFormSubmit}
          id="Post"
        />
        <Button
          click={props.handleFormSubmit}
          id="Put"
        />
        <Button
          click={props.handleFormSubmit}
          id="Delete"
        />
      </form>
        <Button
          click={props.mapToggle}
          id="Map"
        />

    </div>
  );

}

export default SearchForm;
