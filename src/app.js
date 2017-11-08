const css = require("./app.scss");
import React from "react";
import ReactDOM from "react-dom";
import xhr from "xhr";
import {Persist} from "react-persist";
import Form from "./components/form";
import Info from "./components/info";
import ErrorMsg from "./components/error";
import Loader from "./components/loader";

function toFahrenheit(val) {
    return Math.round(val * 1.8 + 32);
}

function toCelsius(val) {
    return Math.round((val - 32) / 1.8);
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            datanextdays: {},
            datacurrentday: {},
            units: 'metric',
            showdata: false,
            loading: true,
            cnt: '40',
            errormsg: ''
        };

    }

    render() {
        return (
            <div>
                <Form
                    fetchDataByName={(evt, location) => this.fetchDataByName(evt, location)}
                    fetchDataByCoordinates={(evt) => this.fetchDataByCoordinates(evt)}
                    onHideError={() => this.hideError()}
                    loading={this.state.loading}
                    showdata={this.state.showdata}
                />
                <Info data={this.state.data}
                      units={this.state.units}
                      showdata={this.state.showdata}
                      onToggle={units => this.onToggle(units)}
                      onBackToForm={() => this.onBackToForm()}/>
                <Loader loading={this.state.loading}/>
                <ErrorMsg msg={this.state.errormsg}/>
                <Persist name="weather"
                         data={this.state}
                         debounce={500}
                         onMount={data => this.onMount(data)}/>
            </div>)
    }

    //function  restore state application, send new respond to openweathermap.
    onMount(data) {
        this.setState(data);
        this.setState({
            errormsg: ''
        });
        if (data.data.cod === "200") {
            const latitude = data.data.city.coord.lat;
            const longitude = data.data.city.coord.lon;
            const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=d74a355d1837cb7b2ab6467465053101&units=' + data.units + '&cnt=' + data.cnt;
            this.fetchData(url);
        }
    }

//function switch temperature by Fahrenheit or Celsius.
    onToggle(units) {
        if (units === this.state.units) {
            return;
        }
        let data = this.state.data;
        if ('imperial' === units) {
            data.list = data.list.map(function (item, index) {
                item.main.temp = toFahrenheit(item.main.temp);
                return item;
            });

        } else {
            data.list = data.list.map(function (item, index) {
                item.main.temp = toCelsius(item.main.temp);
                return item;
            });
        }

        this.setState({
            data: data,
            units: units
        });
    }

//function show weather form.
    onBackToForm() {
        this.setState({
            units: 'metric',
            showdata: false
        });
    }

//function show loading.
    setLoading() {
        this.setState({
            loading: true
        });
    }

//function hide error.
    hideError() {
        this.changeError('');
    }

//function hide loading.
    removeLoading() {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 200);
    }

//function fetch data is  success. Change state data and show info.
    onFetchDataSuccess(data) {
        this.setState({
            data: data,
            showdata: true
        });
    }

//function fetch data  from openweathermap
    fetchData(url) {
        xhr({
            url: url
        },  (err, data)=> {
            const newdata = JSON.parse(data.body);
            if (newdata.cod === "200") {
                this.onFetchDataSuccess(newdata);
                this.removeLoading();
            } else {
                this.removeLoading();
                this.changeError(newdata.message);
            }
        },  (err)=> {
            this.removeLoading();
            this.changeError("Something went wrong. Please try it later.");
        })
    }

//function get location name and generate url for openweathermap
    fetchDataByName(evt, location) {
        this.setLoading();
        const url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location + '&APPID=d74a355d1837cb7b2ab6467465053101&units=' + this.state.units + '&cnt=' + this.state.cnt;
        this.fetchData(url);
    }

//function get geolocation coordinates and generate url for openweathermap
    fetchDataByCoordinates(evt) {
        this.changeError('');
        if (navigator.geolocation) {
            this.setLoading();
            // if geolocation supported, call function
            navigator.geolocation.getCurrentPosition( (position)=> {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=d74a355d1837cb7b2ab6467465053101&units=' + this.state.units + '&cnt=' + this.state.cnt;
                this.fetchData(url);
            },  ()=> {
                this.setState({
                    errormsg: 'Your browser doesn\'t support the geolocation api.'
                });
                this.removeLoading();
            }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

        } else {
            this.setState({
                errormsg: 'Your browser doesn\'t support the geolocation api.'
            });
        }

    }


//function change setState error
    changeError(msg) {
        this.setState({
            errormsg: msg
        })
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));