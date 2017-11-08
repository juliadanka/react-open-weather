import React from 'react';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const isLoading = this.props.loading;
        const classEl= 'loader '+(isLoading?' loader--loading':'' );
        return (
            <div className={classEl}><i className="loader__icon material-icons">cached</i></div>
        )
    }
}

export default Loader;