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
      showdata: '',
      loading: '',
      cnt: '40',
      errormsg: ''
    };
    this.onMount = this.onMount.bind(this);
    this.onToogle = this.onToogle.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.onBackToForm = this.onBackToForm.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchDataByCoordinates = this.fetchDataByCoordinates.bind(this);
    this.fetchDataByName = this.fetchDataByName.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  render() {
    return (
      <div>
        <Form
          fetchDataByName={this.fetchDataByName}
          fetchDataByCoordinates={this.fetchDataByCoordinates}
          onHideError={this.hideError}
          loading={this.state.loading}
          showdata={this.state.showdata}
        />
        <Info data={this.state.data}
              units={this.state.units}
              showdata={this.state.showdata}
              onToogle={this.onToogle}
              onBackToForm={this.onBackToForm}/>
        <Loader loading={this.state.loading}/>
        <ErrorMsg msg={this.state.errormsg}/>
        <Persist name="weather"
                 data={this.state}
                 debounce={500}
                 onMount={this.onMount}/>
      </div>)
  }

  //function  restore state application, send new respond to openweathermap.
  onMount(data) {
    this.setState(data);
    this.setState({
      errormsg: ''
    });
    if (data.data.cod === "200") {
      var latitude = data.data.city.coord.lat;
      var longitude = data.data.city.coord.lon;
      var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=d74a355d1837cb7b2ab6467465053101&units=' + data.units + '&cnt=' + data.cnt;
      this.fetchData(url);
    }
  }

//function switch temperature by Fahrenheit or Celsius.
  onToogle(units) {
    if (units === this.state.units) {
      return;
    }

    var data = this.state.data;
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
      showdata: ' '
    });
  }

//function show loading.
  setLoading() {
    var self = this;
    this.setState({
      loading: 'loading'
    });
  }

//function hide error.
  hideError() {
    this.changeError('');
  }

//function hide loading.
  removeLoading() {
    var self = this;
    setTimeout(function () {
      self.setState({
        loading: ''
      });
    }, 200);
  }

//function fetch data is  success. Change state data and show info.
  onFetchDataSuccess(data) {
    this.setState({
      data: data,
      showdata: 'show'
    });
  }

//function fetch data  from openweathermap
  fetchData(url) {
    var self = this;

    xhr({
      url: url
    }, function (err, data) {
      var newdata = JSON.parse(data.body);
      if (newdata.cod === "200") {
        self.onFetchDataSuccess(newdata);
        self.removeLoading();
      } else {
        self.removeLoading();
        self.changeError(newdata.message);
      }
    }, function (err) {
      self.removeLoading();
      self.changeError("Something went wrong. Please try it later.");
    })
  }

//function get location name and generate url for openweathermap
  fetchDataByName(evt, location) {
    this.setLoading();
    var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + location + '&APPID=d74a355d1837cb7b2ab6467465053101&units=' + this.state.units + '&cnt=' + this.state.cnt;
    this.fetchData(url);
  }

//function get geolocation coordinates and generate url for openweathermap
  fetchDataByCoordinates(evt) {
    var self = this;
    this.changeError('');
    if (navigator.geolocation) {
      this.setLoading();
      // if geolocation supported, call function
      navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=d74a355d1837cb7b2ab6467465053101&units=' + self.state.units + '&cnt=' + self.state.cnt;
        self.fetchData(url);
      }, function () {
        self.setState({
          errormsg: 'Your browser doesn\'t support the geolocation api.'
        });
        self.removeLoading();
      }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});

    } else {
      self.setState({
        errormsg: 'Your browser doesn\'t support the geolocation api.'
      });
    }

  }

//function change setState localion
  changeLocation(evt) {
    this.setState({
      location: evt.target.value
    })
  }

//function change setState error
  changeError(msg) {
    this.setState({
      errormsg: msg
    })
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));