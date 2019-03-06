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
    responseArray: [],
    createMiner: (name, x, y) => {
      console.log("hit global state createMiner")
      this.setState({
        minerLocationX: x,
        minerLocationY: y,
        minerName: name
      })
      this.handleFormSubmit("Post")
    },
    updateGlobalState: event => {
      event.preventDefault();
      let name = event.target.name;
      let value = event.target.value;
      console.log("update global state name: ", name);
      console.log("update global state value: ", value)
      this.setState({ [name]: value });
    }
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

  handleFormSubmit = crud => {
    // event.preventDefault();
    // console.log("event: ", event);
    // let crud = event.target.name;
    let minerName = this.state.minerName;
    let x = this.state.minerLocationX;
    let y = this.state.minerLocationY;


    let minerObject = {
      minerName,
      minerLocation: {
        x,
        y
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
        console.log("switch minerObject: ", minerObject);
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
