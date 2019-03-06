import React, {Component} from "react";
import { Toast, Modal, Button } from "react-materialize";

class MapRow extends Component {
  state = {
    series: this.props.series(),
    minerName: ""
  }

  componentDidMount = () => {
    // console.log("map row this.props.series: ", this.props.series);
    // console.log("series: ", this.props.series());
    
    // console.log("rowData: ", this.props.rowData);
  }
  
  getBig = event => {
    event.preventDefault();
    console.log("event.target: ", event.target);
    console.log("event.target.name: ", event.target.getAttribute("name"));
    console.log("event.target.value: ", event.target.getAttribute("value"));
    console.log("event.target.column: ", event.target.getAttribute("column"));
    console.log("event.target.row: ", event.target.getAttribute("row"));
    this.props.state.globalState.updateGlobalState("minerName", event.target.getAttribute("value"))
    
  }

  minerName = event => {
    event.preventDefault();
    console.log("minerName hit: ", event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  
  render() {
    return(
      <div
        style={{
          margin: 0,
          padding: 0
        }}
      >
        {this.state.series.map(pixel => {
          // console.log("pixel: ", pixel);
          let red = Math.floor(this.props.rowData[pixel]*255);
          let green = Math.floor(this.props.rowData[pixel]*200);
          let blue = Math.floor(this.props.rowData[pixel]*100);
          let pixelSize = this.props.mapSize / this.props.detail;
          return(
            <div
              key={Math.floor(Math.random() * 10000000)}
              style={{
                display: "inline-block",
                marginTop: "-2px",
                padding: 0
              }}
            >
              <Modal
                header="you wanna mine here?"
                trigger={
                  <figure
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
                      display: "inline-block"
                    }}
                    onMouseEnter={() => {
                      window.Materialize.toast(
                        `row: ${this.props.row}
                        column: ${pixel}
                        richness: ${Math.floor(this.props.rowData[pixel]*1000)/10}%`)
                    }}
                    onMouseOut={() => {
                      const toast = document.querySelector('#toast-container>.toast');
                      if (toast) {
                        toast.remove();
                      }
                    }}
                    onClick={this.getBig}
                  />
                }
              >
                <form 
                  onSubmit={event => { 
                    event.preventDefault();
                    let name = this.state.minerName;
                    let x = this.props.state.globalState.minerLocationX;
                    let y = this.props.state.globalState.minerLocationY;
                    console.log("create a mine props: ", this.props.state);
                    this.props.state.globalState.createMiner(name, x, y);
                  }}
                >
                  <input
                    type="text"
                    placeholder="mine name"
                    onChange={this.minerName}
                    name="minerName"
                    // value={this.props.state.globalState.minerName}
                  />
                </form>
              </Modal>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MapRow;
