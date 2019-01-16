import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import DefaultLayout from "./Layout/Default.jsx";
import RTLLayout from "./Layout/RTL.jsx";

class App extends React.Component {
    render() {
        let thisProps = this.props; //for passing current props also
        return (
            <>
                <Switch>
                    <Route path="/app" render={props => <DefaultLayout {...props} {...thisProps} />} />
                    <Route path="/rtl" render={props => <RTLLayout {...props} />} />
                    <Redirect from="/" to="/app/dashboard" />
                </Switch>
            </>
        );
    }
}


export default withRouter(App); //with router is used so the navigation will work