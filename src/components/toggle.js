import React from 'react';

class Toggle extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        let units = 'metric';
        if (this.props.units === 'metric') {
            units = 'imperial';
        }
        this.props.onToggle(units);
    }

    render() {
        const classname = 'toggle__switch toggle__switch--' + (this.props.units );
        return (
            <div className="toggle">
                <button onClick={() => this.handleClick()} className={classname}>
                    <span className="toggle__slider"></span><sup>o</sup>{this.props.units === 'metric' ? 'C' : 'F'}
                </button>
            </div>
        );
    }
}

export default Toggle;