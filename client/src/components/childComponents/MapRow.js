import React, {Component} from "react";
import { Toast } from "react-materialize";

class MapRow extends Component {
  state = {
    series: this.props.series()
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
    console.log("event.target.key: ", event.target.getAttribute("key"));
    console.log("event.target.value: ", event.target.getAttribute("value"));
    console.log("event.target.class: ", event.target.getAttribute("class"));
  }

  
  render() {
    return(
      <div>
        {this.state.series.map(pixel => {
          // console.log("pixel: ", pixel);
          let red = Math.floor(this.props.rowData[pixel]*255);
          let green = Math.floor(this.props.rowData[pixel]*200);
          let blue = Math.floor(this.props.rowData[pixel]*100);
          let pixelSize = this.props.mapSize / this.props.detail;
          return(
            <figure
              // toast={this.props.series[pixel]}
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
          )
        })}
      </div>
    )
  }
}

export default MapRow;
