import React, { Component } from 'react';
class App extends Component {
  state = {
    label: "",
    data: [],
  };
  async componentDidMount() {
    try {
      const res = await fetch('https://dev.techgronomist.com/api/1/iotClient/'); // fetching the data from api, before the page loaded
      const ret = await res.json();
      console.log(ret);
      this.setState({
        label:ret['label'],
        data:ret['data'],
      });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.label}</h1>
        <h1>{this.state.data}</h1>
      <div style={{
					backgroundColor: "white",
					borderColor: "red",
					borderWidth: 2,
					height: 400,
					margin: 50,
					padding: 20,
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-end',
				}}>
					<div style={{
						backgroundColor: "blue",
						height: 400 * this.state.data[0] / 301,
					}}/>
				</div>
      </div>
    );
  }
}
export default App;
