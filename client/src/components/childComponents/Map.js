import React, { Component } from "react";
import MapRow from "./MapRow";
import Button from "../buttons/Button";
import API from "../../utils/API";
const moment = require("moment");

class Map extends Component {
  state = {
    upState: this.props.state,
    mapName: "",
    nameIt: "",
    xAxisSeed: [],
    yAxisSeed: [],
    mapOut: {},
    detail: 50,
    mapSize: 600,
    padding: 30
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    if (this.state.mapOut !== nextState.mapOut) {
      return true;
    }
    return false;
  }

  generateMap = detail => {
    console.log("upState from map: ", this.state.upState);
    let xAxisSeed = [1];
    let yAxisSeed = [1];
    let xAxisSeedPercent = [];
    let yAxisSeedPercent = [];
    // console.log("x and y");
    // console.log(xAxisSeed, yAxisSeed);
    for(let i=0; i<detail-1; i++) {
      let newX = xAxisSeed[i] * ((Math.random() + 4)/4.5);
      let newY = yAxisSeed[i] * ((Math.random() + 4)/4.5);
      xAxisSeed.push(newX);
      yAxisSeed.push(newY);
    }
    // console.log("xAxisSeed: ", xAxisSeed);
    console.log("x min: ", Math.min(...xAxisSeed));
    for(let i=0; i<detail; i++) {
      let xPercentNumer = xAxisSeed[i] - (Math.min(...xAxisSeed) - .01);
      let xPercentDenom = Math.max(...xAxisSeed) - Math.min(...xAxisSeed);
      let newerX = xPercentNumer / xPercentDenom;
      xAxisSeedPercent.push(newerX);
      
      let yPercentNumer = yAxisSeed[i] - Math.min(...yAxisSeed);
      let yPercentDenom = Math.max(...yAxisSeed) - Math.min(...yAxisSeed);
      let newerY = yPercentNumer / yPercentDenom;
      yAxisSeedPercent.push(newerY);
    }
    this.setState({
      ...this.state,
      xAxisSeed: xAxisSeedPercent,
      yAxisSeed: yAxisSeedPercent,
      detail
    })
    let item = {};
    item.target = {
      name: "detail",
      value: this.state.detail
    }
    this.state.upState.updateGlobal(item);
    let mapOut = {};
    for(let i=0; i<yAxisSeed.length; i++) {
      mapOut[i] = [];
      for(let j=0; j<this.state.xAxisSeed.length; j++) {
        let newPixel = this.state.yAxisSeed[i] * this.state.xAxisSeed[j];
        mapOut[i].push(newPixel);
      }
    }
    this.setState({
      mapOut: mapOut
    });
  }
  
  componentWillMount = () => {
    console.log("map");
    if(this.state.xAxisSeed) {
      this.generateMap(this.state.detail, finishedMap => {
        console.log("the map: ", finishedMap);
      })
    }
  }

  series = () => {
    let list = [];
    for(let i=0; i<this.state.detail; i++) {
      list.push(i);
    }
    return list;
  }

  saveMap = event => {
    event.preventDefault();
    console.log("event.target: ", event.target);
    console.log("this.props.state.mapName: ", this.props.state.mapName);
    let map = {
      mapName: this.props.state.mapName,
      x: this.state.xAxisSeed,
      y: this.state.yAxisSeed,
      detail: this.state.detail
    }
    API.saveMap(map)
    .then(response => {
      console.log("save map response.data: ", response.data._id);
      // let currentEvent;
      // currentEvent.target.name = "mapId";
      // currentEvent.target.value = response.data._id;
      this.setState({ mapId: response.data._id });
      this.props.updateGlobalState(response.data._id);
    })
    .catch(err => console.log("save map error: ", err));
  }

  getSavedMap = event => {
    event.preventDefault();
    console.log("getSavedMapthis.state.mapName: ",this.state.mapName);
    API.findMap(this.state.mapName)
    .then(response => {
      console.log("get saved map response.data[0]: ", response.data[0]);
      this.setState({
        xAxisSeed: response.data[0].x,
        yAxisSeed: response.data[0].y,
        detail: response.data[0].detail,
        mapId: response.data[0]._id
      })
      let mapOut = {};
      for(let i=0; i<this.state.yAxisSeed.length; i++) {
        mapOut[i] = [];
        for(let j=0; j<this.state.xAxisSeed.length; j++) {
          let newPixel = this.state.yAxisSeed[i] * this.state.xAxisSeed[j];
          mapOut[i].push(newPixel);
        }
      }
      this.setState({
        mapOut
      });
      API.getMiners(response.data[0]._id)
      .then(response => {
        console.log("get miners response: ", response.data);
      })
    })
  }

  updateName = event => {
    event.preventDefault();
    console.log("event.target.value: ", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
    this.state.upState.updateGlobal(event);
  }

  render() {
    let mapSize = this.state.mapSize;
    let printMap = this.state.mapOut;
    console.log("printMap");
    let array = [];
    for(let i=0; i<this.state.detail; i++) {
      array.push(i);
    }
    // console.log("array: ", array);
    let counter = 0;
    return(
      <div className="mapHousing">
        <form onSubmit={this.saveMap}>
          <input
            type="text"
            onChange={this.updateName}
            name="mapName"
          />
          <Button
            click={this.saveMap}
            id="Save Map"
          />
          <Button
            click={this.getSavedMap}
            id="Get"
          />
        </form>
        <div>
          <Button
            click={this.props.mapToggle}
            id="Miners"
          />
          <Button
            click={() => this.generateMap(this.state.detail, finishedMap => {
              // console.log("the map: ", finishedMap);
            })}
            id="New Map"
          />
        </div>
        <div 
          className="mapDisplay"
          style={{
            height: `${mapSize + 2 * this.state.padding}px`,
            width: `${mapSize + 2 * this.state.padding}px`,
            padding: this.state.padding,
            margin: "20px"
          }}
        >
          {array.map(row => {
            counter ++;
            return(
              <MapRow
                className="mapRow"
                key={`MapRow-${counter}`}
                style={{
                  height: this.state.mapSize / this.state.detail,
                  margin: 0,
                  padding: 0,
                  display: "flex"
                }}
                mapId={this.state.mapId}
                row={row}
                detail={this.state.detail}
                series={this.series}
                rowData={printMap[row]}
                keys={counter}
                mapSize={this.state.mapSize}
                state={this.state}
                updateGlobalState={this.props.updateGlobalState}
                createMiner={this.props.createMiner}
                mapOut={this.state.mapOut}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

export default Map;
