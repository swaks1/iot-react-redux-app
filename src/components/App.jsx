import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import DefaultLayout from "./layout/Default.jsx";

class App extends React.Component {
    render() {
        let thisProps = this.props; //for passing current props also
        return (
            <>
                <Switch>
                    <Route path="/app" render={props => <DefaultLayout {...props} {...thisProps} />} />
                    <Redirect from="/" to="/app/dashboard" />
                </Switch>
            </>
        );
    }
}


export default withRouter(App); //with router is used so the navigation will work