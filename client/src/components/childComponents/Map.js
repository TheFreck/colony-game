import React, { Component } from "react";
import MapRow from "./MapRow";
import Button from "../buttons/Button";
import API from "../../utils/API";

class Map extends Component {
  state = {
    mapName: "",
    xAxisSeed: [],
    yAxisSeed: [],
    mapOut: {},
    detail: 30,
    mapSize: 600,
    padding: 30
  }

  
  generateMap = (detail, finishedMap) => {
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
    console.log("xAxisSeed: ", xAxisSeed);
    console.log("x min: ", Math.min(...xAxisSeed));
    for(let i=0; i<detail; i++) {
      let xPercentNumer = xAxisSeed[i] - Math.min(...xAxisSeed);
      let xPercentDenom = Math.max(...xAxisSeed) - Math.min(...xAxisSeed);
      let newerX = xPercentNumer / xPercentDenom;
      xAxisSeedPercent.push(newerX);
      
      let yPercentNumer = yAxisSeed[i] - Math.min(...yAxisSeed);
      let yPercentDenom = Math.max(...yAxisSeed) - Math.min(...yAxisSeed);
      let newerY = yPercentNumer / yPercentDenom;
      yAxisSeedPercent.push(newerY);
    }
    console.log(xAxisSeed, xAxisSeedPercent)
    console.log(yAxisSeed, yAxisSeedPercent)
    this.setState({
      ...this.state,
      xAxisSeed: xAxisSeedPercent,
      yAxisSeed: yAxisSeedPercent,
      detail
    })
    // console.log("this.state: ", this.state);
    let mapOut = {};
    for(let i=0; i<yAxisSeed.length; i++) {
      mapOut[i] = [];
      for(let j=0; j<this.state.xAxisSeed.length; j++) {
        let newPixel = this.state.yAxisSeed[i] * this.state.xAxisSeed[j];
        mapOut[i].push(newPixel);
      }
      // console.log("mapOut: ", mapOut[i]);
    }
    this.setState({
      mapOut: mapOut
    });
    finishedMap(mapOut);
  }
  
  componentWillMount = () => {
    // console.log("map");
    this.generateMap(this.state.detail, finishedMap => {
      // console.log("the map: ", finishedMap);
    })
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
    let map = {
      mapName: this.state.mapName,
      x: this.state.xAxisSeed,
      y: this.state.yAxisSeed
    }
    API.saveMap(map)
    .then(response => {
      console.log("save map response.data: ", response.data);
    })
    .catch(err => console.log("save map error: ", err));
  }

  handleChange = event => {
    event.preventDefault();
    console.log("event.target.name: ", event.target.name);
    console.log("event.target.value: ", event.target.value);
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    let mapSize = this.state.mapSize;
    let printMap = this.state.mapOut;
    let array = [];
    for(let i=0; i<this.state.detail; i++) {
      array.push(i);
    }
    console.log("array: ", array);
    let counter = 0;
    return(
      <div className="mapHousing">
        <form onSubmit={this.saveMap}>
          <input
            type="text"
            onChange={this.handleChange}
            name="mapName"
          />
          <Button
            click={this.saveMap}
            id="Save Map"
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
            padding: this.state.padding
          }}
        >
          {array.map(row => {
            counter ++;
            return(
              <div
                className="mapRow"
                key={printMap[row][0]}
                style={{
                   height: this.state.mapSize / this.state.detail
                }}
              >
                <MapRow
                  row={row}
                  detail={this.state.detail}
                  series={this.series}
                  rowData={printMap[row]}
                  keys={counter}
                  mapSize={this.state.mapSize}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Map;
