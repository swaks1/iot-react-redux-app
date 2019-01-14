import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Header from './_common/Header.jsx';
import Main from './_common/Main.jsx';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header
                    loading={this.props.loading}
                />
                <Main />
            </div>
        );
    }
}

App.propTypes = {
    loading: PropTypes.bool.isRequired
};


let mapStateToProps = (state, ownProps) => {
    return {
        loading: state.ajaxCallsInProgress > 0 //gets redux state manipulated from ajaxStatusReducer
    }
}
let AppContainer = connect(mapStateToProps)(App); //App component is connected with redux
export default withRouter(AppContainer); //with router is used so the navigation will work