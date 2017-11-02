import React from "react";
//
// // onSuccess Callback
// // This method accepts a Position object, which contains the
// // current GPS coordinates
// //
// var onSuccess = function (position) {
//   alert('Latitude: ' + position.coords.latitude + '\n' +
//     'Longitude: ' + position.coords.longitude + '\n' +
//     'Altitude: ' + position.coords.altitude + '\n' +
//     'Accuracy: ' + position.coords.accuracy + '\n' +
//     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
//     'Heading: ' + position.coords.heading + '\n' +
//     'Speed: ' + position.coords.speed + '\n' +
//     'Timestamp: ' + position.timestamp + '\n');
// };
//
// // onError Callback receives a PositionError object
// //
// function onError(error) {
//   alert('code: ' + error.code + '\n' +
//     'message: ' + error.message + '\n');
// }

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ''
    };
    this.changeLocation = this.changeLocation.bind(this);
    this.fetchDataByCoordinates = this.fetchDataByCoordinates.bind(this);
    this.fetchDataByName = this.fetchDataByName.bind(this);

  }

  fetchDataByName(evt) {
    evt.preventDefault();
    var location = encodeURIComponent(this.state.location);
    if (location === '') {
      return;
    }
    this.props.fetchDataByName(evt, location);
  }


  fetchDataByCoordinates(evt) {
    evt.preventDefault();
    this.props.fetchDataByCoordinates(evt);

  }

  changeLocation(evt) {
    this.setState({
      location: evt.target.value
    });
    this.props.onHideError();
  }

  render() {
    var className = this.props.showdata + ' form-wrapper';
    return (
      <div className={className}>
        <form onSubmit={this.fetchDataByName} className={this.props.loading}>
          <div className="form-row">
            <input
              placeholder={"City"}
              type="text"
              value={this.state.location}
              onChange={this.changeLocation}
            />
            <button type="submit"><i className="material-icons">search</i></button>
          </div>
          <div className="form-row">
            <small>or</small>
            use my <a href="#" className="current-position" itemID="current-position"
                      onClick={this.fetchDataByCoordinates}>current position</a>
          </div>
        </form>
      </div>
    )
  }
}


export default Form;