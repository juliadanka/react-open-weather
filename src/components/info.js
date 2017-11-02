import React from "react";
import Toggle from "./toggle";
import CurrentDayInfo from "./currrentdayinfo";
import WeekInfo from "./weekinfo";
// var FormattedDate = ReactIntl.FormattedDate;
var dateFormat = require('dateformat');

export class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.onToogle = this.onToogle.bind(this);
    this.handelBackToForm = this.handelBackToForm.bind(this);
  }


  render() {
    var self = this;
    var header = '';
    var className = this.props.showdata + ' info-wrapper';
    if (this.props.data.list) {
      header = (
        <div>
          <div className="header-info">
            <Toggle units={this.props.units} onToogle={this.onToogle}/>
            <div className="city-name"><a href="#" className="back-link" onClick={this.handelBackToForm}><i
              className="material-icons">arrow_back</i></a>
              <span>{this.props.data.city.name}</span></div>
          </div>
          <CurrentDayInfo data={this.props.data} units={this.props.units}/>
        </div>
      );

    }
    return (
      <div className={className}>
        {header}
        <WeekInfo data={this.props.data} units={this.props.units}/>
      </div>
    )
  }

  onToogle(units) {
    this.setState({
      units: units
    });
    this.props.onToogle(units);
  }

  handelBackToForm(evt) {
    evt.preventDefault();
    this.props.onBackToForm();
  }
}


export default Info;