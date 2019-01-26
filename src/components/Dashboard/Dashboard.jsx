import React from "react";
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importedDeviceActions from '../../redux/actions/deviceActions';

import toastr from 'toastr'

import DashboardCard from './DashboardCard'


class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        const { devices, devicesLoading } = this.props;
        let devicesOnDashboard = devices.filter(item => item.isAddedToDashboard === true)
        return (
            <DashboardCard
                devices={devicesOnDashboard}
                loading={devicesLoading}
            />
        );
    }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
    return {
        devices: state.devices.data,
        devicesLoading: state.devices.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deviceActions: bindActionCreators(importedDeviceActions, dispatch)
    };
};

var DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);
export default withRouter(DashboardContainer);
