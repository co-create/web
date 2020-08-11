import React, { Component, form, button } from 'react';
import './App.css';

class App extends Component {
  state = {
    label: "",
		distance: 0,
		mode: 'in',
		maxDistance: 400,
		distanceInput: 400,
	};

	constructor(props) {
    super(props);
    this.state = {
			label: "",
			distance: 0,
			mode: 'in',
			maxDistance: 400,
			distanceInput: 400,
		};

    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleMeasurement = this.toggleMeasurement.bind(this);
		this.computeDistance = this.computeDistance.bind(this);
  }

	toggleMeasurement(val) {
		if (this.state.mode === 'in' && val === 'in') {
			this.setState({
				mode:'cm',
			});
		} else if (this.state.mode === 'cm' && val === 'cm') {
			this.setState({
				mode:'in',
			});
		}
	}

	computeDistance() {
		if (this.state.mode === "in") {
			return (this.state.distance);
		} else {
			return (this.state.distance * 2.54);
		}
	}

  componentDidMount() {
    setInterval(() => this.fetchSensorData(), 1000);
	}

	async fetchSensorData() {
		try {
		const res = await fetch('https://dev.techgronomist.com/api/1/iotClient/'); // fetching the data from api, before the page loaded
		const ret = await res.json();
		console.log(ret);
		this.setState({
			label:ret['label'],
			distance:ret['data'][ret['data'].length - 1],
		});
		} catch (e) {
			console.log(e);
		}
	}

	handleChange(event) {
    this.setState({distanceInput: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
		this.setState({maxDistance: this.state.distanceInput});
		console.log("AAAAAAAAAAAA");
    event.preventDefault();
  }

  render() {
    return (
			<div className="Container">
				<div className="Graph">
					<div style={{backgroundColor: "blue", height: 400 * this.computeDistance() / this.state.maxDistance}}>
					</div>
				</div>
				<p>{this.computeDistance()} {this.state.mode}</p>
				<p>{Math.round(this.computeDistance() / this.state.maxDistance * 100)} %</p>
				<div style={{height:60}}/>
				<h3>Measurement System</h3>
				<div style={{marginBottom:20}}>
					<button style={{marginRight: 20}} type="button" onClick={() => this.toggleMeasurement("cm")}>IN</button>
					<button type="button" onClick={() => this.toggleMeasurement("in")}>CM</button>
				</div>
				<h3>Max Distance of Container</h3>
				<form>
				<label>
					<input type="text" value={this.state.distanceInput} onChange={this.handleChange} />
				</label>
				<button type="button" onClick={() => this.setState({maxDistance: this.state.distanceInput})}>Save</button>
				</form>
			</div>
    );
  }
}
export default App;
