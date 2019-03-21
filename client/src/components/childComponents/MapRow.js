import React, { Component } from "react";
import { Modal } from "react-materialize";
import Input from "../buttons/Input";
// import API from "../../utils/API";

class MapRow extends Component {
  state = {
    series: this.props.series(),
    upState: this.props.state,
    minerName: "",
    minerDepletionArray: []
  }

  shouldComponentUpdate(nextProps, nextState) {
    
    if (this.props.mapOut !== nextProps.mapOut) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps = nextProps => {
    console.log("nextProps: ", nextProps);
    this.setState({ minerDepletionArray: nextProps });
  }

  componentDidMount = () => {
    // call miner if there is one
    // console.log("mapRow props: ", this.props);
    let minerDepletionArray = this.props.minerDepletionArray;
    console.log(minerDepletionArray);
    this.setState({
      minerDepletionArray
    })
  }
    
  modalSubmit = event => {
    event.preventDefault();
    console.log("modal has been submitted");
  }
  
  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }
    
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("event.target: ", event.target);
    console.log("id: ", this.props.mapId);
    // this.props.state.upState.updateGlobalState("minerName", event.target.getAttribute("value"))
    this.props.createMiner(this.state.minerName, event.target.getAttribute("column"), this.props.row, this.props.mapId, event.target.getAttribute("purity"));
  }
  
  render() {
    console.log("mapRow render")
    return(
      <div
        style={{
          margin: 0,
          padding: 0
        }}
      >
        {this.state.series.map(pixel => {
          // console.log("pixel: ", pixel);
          let red = Math.floor(255 - this.props.rowData[pixel] * 255 - 50);
          let green = Math.floor(this.props.rowData[pixel] * 200 + 50);
          let blue = Math.floor(this.props.rowData[pixel] * 200 - 120);
          let pixelSize = this.props.mapSize / this.props.detail;
          let shadow = 0;
          let shadowFriend = 0;
          // for()
          return(
            <div
              key={`row-C${pixel}`}
              style={{
                display: "inline-block",
                padding: 0
              }}
            >
              <Modal
                onSubmit={this.modalSubmit}
                header="name your mine"
                style={{
                  // zIndex: 1,
                  margin: 0,
                  padding: 0,
                }}
                children={
                  <Input
                    state={this.state}
                    updateGlobalState={this.props.updateGlobalState}
                    createMiner={this.props.createMiner}
                    column={pixel}
                    row={this.props.row}
                    purity={this.props.rowData[pixel]}
                    placeholder="name your mine"
                    named="minerName"
                    change={this.handleInputChange}
                    submit={this.handleFormSubmit}
                  />
                }
                trigger={
                  <div
                    row={this.props.row}
                    column={pixel}
                    className="pixel"
                    key={`pixel-C${pixel}-R${this.props.row}`}
                    name={this.props.rowData[pixel]}
                    value={this.props.rowData[pixel]}
                    style={{
                      background: `rgb(${red},${green},${blue})`,
                      height: pixelSize,
                      width: pixelSize,
                      margin: 0,
                      padding: 0,
                      zIndex: 10,
                      boxShadow: `0 0 ${shadow} ${shadowFriend}em gray inset`,
                      display: "inline-block",
                      outline: `1px solid rgb(${red},${green},${blue})`,
                      verticalAlign: "top"
                    }}
                    onMouseEnter={() => {
                      if(this.props.rowData[pixel]) {
                        window.Materialize.toast(
                          `row: ${this.props.row}
                          column: ${pixel}
                          richness: ${Math.floor(this.props.rowData[pixel]*1000)/10}%`)
                      }
                    }}
                    onMouseOut={() => {
                      const toast = document.querySelector('#toast-container>.toast');
                      if (toast) {
                        toast.remove();
                      }
                    }}
                  />
                }
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default MapRow;
