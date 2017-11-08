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
    }


    render() {
        let header = '';
        const isHide = !this.props.showdata;
        const classEl = 'info ' + ( isHide ? ' info--hide' : '');
        if (this.props.data.list) {
            header = (
                <div>
                    <div className="header">
                        <Toggle units={this.props.units} onToggle={(units)=>this.onToggle(units)}/>
                        <h1 className="header__title"><a href="#" className="header__button--back"
                                                          onClick={(evt)=>this.handelBackToForm(evt)}><i
                            className="material-icons">arrow_back</i></a>
                            <span>{this.props.data.city.name}</span></h1>
                    </div>
                    <CurrentDayInfo data={this.props.data} units={this.props.units}/>
                </div>
            );

        }
        return (
            <section className={classEl}>
                {header}
                <WeekInfo data={this.props.data} units={this.props.units}/>
            </section>
        )
    }

    onToggle(units) {
        this.setState({
            units: units
        });
        this.props.onToggle(units);
    }

    handelBackToForm(evt) {
        evt.preventDefault();
        this.props.onBackToForm();
    }
}


export default Info;