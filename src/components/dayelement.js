import React from 'react';
var dateFormat = require('dateformat');

class DayElement extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      var now = new Date(this.props.data.dt*1000);
      var date=dateFormat(now, "dddd")
        var currentTemp = this.props.data.main.temp;
        var iconClass = 'week__el__icon wi wi-' + this.props.data.weather[0].icon;
        var tempindex = (this.props.units === 'metric') ? 'C' : 'F';
        return (
            <div className="week__el">
                <div className="week__el__date">{date}</div>
                <i className={iconClass}></i>
                <div className="week__el__temp">{currentTemp}<span className="week__el__symbol"><sup>o</sup>{tempindex}</span></div>
            </div>
        )
    }
}

export default DayElement;