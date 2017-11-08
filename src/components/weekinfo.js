import React from "react";
import DayElement from "./dayelement";

export class WeekInfo extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var currentTemp = '';
    var self = this;
    if (this.props.data.list) {
      var list = this.props.data.list;
      //Filter List. Get elemets of with time 12.00.00
      list = list.filter(function (item, index) {
        return (item.dt_txt.endsWith('12:00:00'));
      });
      list = list.map(function (item, index) {
        item.main.temp = Math.round(item.main.temp);
        return item;
      });
      var last = Object.assign({}, list[list.length - 1]);
      last.dt = list[list.length - 1].dt + 86400;
      list.push(last);
      last = Object.assign({}, list[list.length - 1]);
      last.dt = list[list.length - 1].dt + 86400;
      list.push(last);
      currentTemp = list.map(function (item, index) {
        return (
          <DayElement data={item} key={index} units={self.props.units}/>
        );
      });

    }
    return (
      <div className="week">
        {currentTemp}
      </div>
    )
  }


}


export default WeekInfo;