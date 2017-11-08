import React from "react";
import CurrentDayElement from "./currentdayelement";
const dateFormat = require('dateformat');

export class CurrentDayInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let header = {};
        if (this.props.data.list) {
            let list = this.props.data.list.map((item, index) => {
                item.main.temp = Math.round(item.main.temp);
                return item;
            });
            //Get current day time 23.00.00
            const d = new Date();
            const startHour = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 23, 0, 0, 0);
            const endHour = startHour / 1000;
            //Filter List. Get elemets of current day
            let currentDayTemp = list.filter((item, index) => {
                return item.dt <= endHour;
            });
            currentDayTemp = currentDayTemp.map((item, index) => {
                return (
                    <CurrentDayElement data={item} key={index} units={this.props.units}/>
                );
            });
            const temp = currentDayTemp[0].props.data.main.temp;
            const tempindex = (this.props.units === 'metric') ? 'C' : 'F';
            const iconClass = 'wi wi-' + currentDayTemp[0].props.data.weather[0].icon;
            const date = dateFormat(d, "dddd, mmmm dS yyyy");
            header = (
                <div>
                    <div className="today__date">{date}</div>
                    <div className="today__deacription">{currentDayTemp[0].props.data.weather[0].description}</div>
                    <div className="temp">
                        <div className="temp__info--lg">{temp}<sup>o</sup>{tempindex} <i className={iconClass}></i>
                        </div>
                        <div className="temp__info--sm">
                            {currentDayTemp}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="today">
                {header}
            </div>
        )
    }

}


export default CurrentDayInfo;