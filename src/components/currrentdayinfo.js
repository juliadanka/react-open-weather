import React from "react";
import CurrentDayElement from "./currentdayelement";
// var FormattedDate = ReactIntl.FormattedDate;
var dateFormat = require('dateformat');

export class CurrentDayInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var self = this;
    var header = {};
    if (this.props.data.list) {
      var list = this.props.data.list.map(function (item, index) {
        item.main.temp = Math.round(item.main.temp);
        return item;
      });
      //Get current day time 23.00.00
      var d = new Date();
      var startHour = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 0, 0, 0);
      var endHour = startHour / 1000;
      //Filter List. Get elemets of current day
      var currentDayTemp = list.filter(function (item, index) {
        return item.dt <= endHour;
      });
      currentDayTemp = currentDayTemp.map(function (item, index) {
        return (
          <CurrentDayElement data={item} key={index} units={self.props.units}/>
        );
      });
      var temp = currentDayTemp[0].props.data.main.temp;
      var tempindex = (this.props.units === 'metric') ? 'C' : 'F';
      var iconClass = 'wi wi-' + currentDayTemp[0].props.data.weather[0].icon;
      var date = dateFormat(d, "dddd, mmmm dS yyyy");
      header = (
        <div>
          <div className="date">{date}</div>
          <div className="deacription">{currentDayTemp[0].props.data.weather[0].description}</div>
          <div className="temp-wrapper">
            <div className="current-temp">{temp}<sup>o</sup>{tempindex} <i className={iconClass}></i>
            </div>
            <div className="day-temp">
            {currentDayTemp}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="current-day">
        {header}
      </div>
    )
  }

}


export default CurrentDayInfo;