import React from "react";

class CurrentDayElement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const dt_txt = this.props.data.dt_txt;
        const temp = this.props.data.main.temp;
        const tempindex = (this.props.units === 'metric') ? 'C' : 'F';
        let morning = '';
        let day = '';
        let evening = '';
        let night = '';
        if (dt_txt.endsWith('9:00:00')) {
            morning = (<p><span className="temp__info__title--sm">Morning</span> {temp}<sup>o</sup>{tempindex}</p>);
        }
        if (dt_txt.endsWith('12:00:00')) {
            day = (<p><span className="temp__info__title--sm">Day</span> {temp}<sup>o</sup>{tempindex}</p>);
        }
        if (dt_txt.endsWith('18:00:00')) {
            evening = (<p><span className="temp__info__title--sm">Evening</span> {temp}<sup>o</sup>{tempindex}</p>);
        }
        if (dt_txt.endsWith('21:00:00')) {
            night = (<p><span className="temp__info__title--sm">Night</span> {temp}<sup>o</sup>{tempindex}</p>);
        }
        return (
            <div className="">
                {morning}{day}{evening}{night}
            </div>
        )
    }
}

export default CurrentDayElement;