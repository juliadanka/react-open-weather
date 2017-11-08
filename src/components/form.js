import React from "react";


export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        };

    }

    fetchDataByName(evt) {
        evt.preventDefault();
        const location = encodeURIComponent(this.state.location);
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
        const isLoading = this.props.loading;
        const isHide = this.props.showdata;
        const classEl = 'form ' + (isLoading ? ' form--loading' : '' ) + ( isHide ? ' form--hide' : '');
        return (
            <section>
                <form onSubmit={(evt) => this.fetchDataByName(evt)} className={classEl}>
                    <div className="form__row">
                        <input className="form__input"
                               placeholder={"City"}
                               type="text"
                               value={this.state.location}
                               onChange={(evt) => this.changeLocation(evt)}
                        />
                        <button className="form__submit" type="submit"><i className="material-icons">search</i></button>
                    </div>
                    <div className="form__row">
                        <small className="form__info">or</small>
                        use my <a href="#" className="current-position" itemID="current-position"
                                  onClick={(evt) => this.fetchDataByCoordinates(evt)}>current position</a>
                    </div>
                </form>
            </section>
        )
    }
}


export default Form;