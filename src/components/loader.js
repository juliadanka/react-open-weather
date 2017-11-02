import React from 'react';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var className = "loader " + this.props.loading;
        return (
            <div className={className}><i className="material-icons">cached</i></div>
        )
    }
}

export default Loader;