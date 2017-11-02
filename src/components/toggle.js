import React from 'react';
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var units = 'metric';
    if (this.props.units==='metric') {
      units = 'imperial';
    }
    this.props.onToogle(units);
  }

  render() {

    var classname = 'switch switch-' + (this.props.units );
    return (
      <div className="toggle-wrapper">
        <button onClick={this.handleClick} className={classname}>
          <span className="slider "></span><sup>o</sup>{this.props.units==='metric' ? 'C' : 'F'}
        </button>
      </div>
    );
  }
}

export default Toggle;