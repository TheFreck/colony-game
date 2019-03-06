import React, { Component } from "react";
import SearchForm from "./childComponents/SearchForm";
import Map from "./childComponents/Map";
import API from "../utils/API";
import SavedList from "./childComponents/SavedList";

class Container extends Component {
  state = {
    map: true,
    minerName: "",
    minerLocationX: "",
    minerLocationY: "",
    responseObject: {},
    responseArray: []
  };

  componentDidMount() {
    // console.log("it's off to the races");
    this.gitem();
  };
  
  gitem = () => {
    API.getMany()
    .then(response => {
      // console.log("on mount response.data: ", response.data);
      this.setState({ responseArray: response.data })
    })
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name + ": " + value);
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let crud = event.target.name;
    let minerName = this.state.minerName;

    let minerObject = {
      minerName,
      minerLocation: {
        x: this.state.minerLocationX,
        y: this.state.minerLocationY
      }
    };
    switch(crud) {
      case "Get":
        API.get(minerName)
        .then(response => {
          console.log("response; ", response);
          this.setState({ responseObject: response })
        })
        break;
      case "Post":
        API.post(minerObject)
        .then(response => {
          console.log("response: ", response);
          this.setState({ responseObject: response })
        })
        break;
      case "Put":
        API.put(minerObject)
        .then(response => {
          console.log("response: ", response);
          this.setState({ responseObject: response })
        })
        break;
      case "Delete":
        API.delete(minerName)
        .then(response => {
          console.log("response: ", response);
          this.setState({ responseObject: response })
        })
        break;
      default:
        console.log("ain't nuttin comin. let's pack em up and go home");
    }
    this.gitem();
    console.log("it is done, My Liege");
  };

  beGoofy = event => {
    event.preventDefault();
    console.log("you got me!")
  }

  mapToggle = event => {
    event.preventDefault();
    console.log("mapToggle");
    this.setState({ map: !this.state.map });
  }

  render() {
    // if map is false in state then display saved list
    // otherwise display map
    if(this.state.map) {
      return (
        <Map
          state={this.state}
          mapToggle={this.mapToggle}
        />
      )
    } else {
      return (
        <div className="container">
          <SearchForm
            minerName={this.state.minerName}
            minerLocation={this.state.minerLocation}
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            goofy={this.beGoofy}
            mapToggle={this.mapToggle}
          />
          <SavedList
            results={this.state.responseArray}
          />
        </div>
      );
    }
  }
}

export default Container;
