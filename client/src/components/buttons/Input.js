import React, {Component} from "react";

class Input extends Component {
  state ={
    upstate: this.props.state,
    minerName: ""
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

  componentDidMount = () => {
    // console.log("input field props: ", this.props)
    // console.log("input this.state: ", this.state);
  }
  render() {
    return(
      // <div>pixie dust</div>
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          placeholder="name your mine"
          onChange={this.handleInputChange}
          name="minerName"
        />
      </form>
    )
  }
}

export default Input;