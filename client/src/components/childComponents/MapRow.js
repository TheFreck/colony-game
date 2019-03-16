import React, {Component, PureComponent} from "react";
import { Modal } from "react-materialize";
import Input from "../buttons/Input";
import API from "../../utils/API";

class MapRow extends PureComponent {
  state = {
    series: this.props.series(),
    upState: this.props.state,

  }

  componentDidMount = () => {
    // call miner if there is one
    // console.log("mapRow props: ", this.props);
    
  }

  getMiner = location => {
    // console.log("getMiner location: ", location);
    // API.get({
    //   minerLocation: {
    //     x: location.column,
    //     y: location.row
    //   }
    // })
    // .then(response => {
    //   console.log("getMiner response: ", response);
    // })
    // .catch(err => console.log("getMiner error: ", err));
  }
  
  depleteMine = mine => {
    return 1 - mine
  }
  
  getBig = event => {
    event.preventDefault();
    console.log("get big event.target: ", event.target);
    this.props.state.globalState.updateGlobalState("minerName", event.target.getAttribute("value"))
    
  }

  minerName = event => {
    event.preventDefault();
    console.log("minerName hit: ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value
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
    console.log("this.state.minerName: ", this.state.minerName);
    console.log("this.props.row: ", this.props.row);
    console.log("this.props.column: ", this.props.column);
    this.props.createMiner(this.state.minerName, this.props.row, this.props.column, this.props.purity);
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
          let location = {};
          location.column = pixel;
          location.row = this.props.row;
          // if()
          this.getMiner(location)
          let red = Math.floor(255 - this.props.rowData[pixel] * 255 - 50);
          let green = Math.floor(this.props.rowData[pixel] * 200 + 50);
          let blue = Math.floor(this.props.rowData[pixel] * 200 - 120);
          let pixelSize = this.props.mapSize / this.props.detail;
          let shadow = 0;
          let shadowFriend = 0;
          return(
            <div
              key={Math.floor(Math.random() * 10000000)}
              style={{
                display: "inline-block",
                marginTop: "-1.9px",
                padding: 0
              }}
            >
              <Modal
                onSubmit={this.modalSubmit}
                header="name your mine"
                style={{
                  zIndex: 1,
                  margin: 0,
                  padding: 0
                }}
                children={
                  <Input
                    state={this.state}
                    updateGlobalState={this.props.updateGlobalState}
                    createMiner={this.props.createMiner}
                    column={pixel}
                    row={this.props.row}
                    purity={this.props.rowData[pixel]}
                    submit={this.getBig}
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
                    key={pixel}
                    name={this.props.rowData[pixel]}
                    value={this.props.rowData[pixel]}
                    style={{
                      background: `rgb(${red},${green},${blue})`,
                      height: pixelSize,
                      width: pixelSize,
                      margin: 0,
                      padding: 0,
                      display: "inline-block",
                      fontSize: "10px",
                      zIndex: 10,
                      boxShadow: `0 0 ${shadow} ${shadowFriend}em gray inset`
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
                  ></div>
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
