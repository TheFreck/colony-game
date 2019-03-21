import React, { Component } from "react";
// import SearchForm from "./childComponents/SearchForm";
import Map from "./childComponents/Map";
import API from "../utils/API";
// import SavedList from "./childComponents/SavedList";

class Container extends Component {
  state = {
    list: [],
    mapId: "",
    minerName: "",
    minerLocationX: 0,
    minerLocationY: 0,
    responseObject: {},
    responseArray: [],
    minerLocationArray: [],
    updateGlobal: event => {
      // console.log("event: ", event);
      // console.log("event.target: ", event.target);
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  };


  componentDidMount = () => {
    // console.log("first: ", this.state.list);
    let list = this.state.list;
    for(let i=0; i<this.state.detail; i++) {
      list.push(i);
      this.setState({list})
      // console.log("loop list: ", this.state.list);
    }

  };
  
  componentWillMount = () => {
    // this.gitem();
  }
  
  // gitem = () => {
  //   API.getAll()
  //   .then(response => {
  //     console.log("on mount response.data: ", response);
  //     console.log("container state: ", this.state);
  //     let minerLocationArrayStandIn = this.state.minerLocationArray;
  //     for(let i=0; i<minerLocationArrayStandIn.length; i++) {
  //       minerLocationArrayStandIn.push(response.data[i].minerLocation);

  //     }
  //     console.log("minerLocationArrayStandIn: ", minerLocationArrayStandIn);
  //     this.setState({ 
  //       ...this.state,
  //       responseArray: response.data,
  //       minerLocationArray: response.data.minerLocation
  //     })
  //   })
  // }

  updateGlobalState = event => {
    event.preventDefault();
    // console.log("update global state event.target: ", event.target);
    let name = event.target.name;
    let value = event.target.value;
    // console.log("update global state name: ", name);
    // console.log("update global state value: ", value)
    this.setState({ [name]: value });
  }

  // createMiner = (minerName, minerLocationX, minerLocationY, map, purity) => {
  //   console.log("hit global state createMiner: ", purity)

  //   let stateObject = {
  //     minerLocationX,
  //     minerLocationY,
  //     minerName,
  //     map,
  //     purity
  //   }
  //   console.log("miner to be created: ", stateObject);
  //   this.setState(stateObject)
  //   stateObject.crud = "Post";
  //   this.doIt(stateObject)
  // }

  findMap = map => {
    API.findMap({ mapName: map })
    .then(mapReturn => {
      // console.log("mapReturn: ", mapReturn);
      return mapReturn;
    })
    .catch(err => console.log("findMap error: ", err));
  }

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    // console.log(name + ": " + value);
    this.setState({
      [name]: value
    });
  };

  // doIt = stateObject => {
  //   let minerName = stateObject.minerName;
  //   let x = stateObject.minerLocationX;
  //   let y = stateObject.minerLocationY;
  //   let purity = stateObject.purity;
  //   let map = stateObject.map;
  //   let crud = stateObject.crud;
  //   console.log("x minerName y: ", this.state);


  //   let minerObject = {
  //     minerName,
  //     minerLocation: {
  //       x,
  //       y
  //     },
  //     purity,
  //     map
  //   };


  //   switch(crud) {
  //     case "Get":
  //       API.get(minerName)
  //       .then(response => {
  //         console.log("response; ", response);
  //         this.setState({ responseObject: response })
  //       })
  //       break;
  //     case "Post":
  //       console.log("switch minerObject: ", minerObject);
  //       API.post(minerObject)
  //       .then(response => {
  //         console.log("response: ", response);
  //         this.setState({ responseObject: response })
  //       })
  //       break;
  //     case "Put":
  //       API.put(minerObject)
  //       .then(response => {
  //         console.log("response: ", response);
  //         this.setState({ responseObject: response })
  //       })
  //       break;
  //     case "Delete":
  //       API.delete(minerName)
  //       .then(response => {
  //         console.log("response: ", response);
  //         this.setState({ responseObject: response })
  //       })
  //       break;
  //     default:
  //       console.log("ain't nuttin comin. let's pack em up and ride home");
  //   }
  //   this.gitem();
  //   console.log("it is done, My Liege");
  // };

  mapToggle = event => {
    event.preventDefault();
    // console.log("mapToggle");
    this.setState({ map: !this.state.map });
  }

  updateLocations = locations => {
    // console.log("locations: ", locations);
  }

  render() {
    return (
      <Map
        state={this.state}
        mapToggle={this.mapToggle}
        updateGlobalState={this.updateGlobalState}
        createMiner={this.createMiner}
        findMap={this.findMap}
      />
    )
  }
}

export default Container;
