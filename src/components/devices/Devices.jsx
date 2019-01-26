import React from "react";
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as deviceActions from '../../redux/actions/deviceActions';

import toastr from 'toastr'

import DevicesCard from './DevicesCard'


class Devices extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        //const { actions } = this.props;
        //actions.loadDevices();     
    }

    componentWillReceiveProps(nextProps) {
        // necessary to populate from when existing course is loaded directly
        // if (this.props.course.id != nextProps.course.id) {
        //   this.setState({ course: Object.assign({}, nextProps.course) });
        // }
    }

    handleSwitch = (checked, id) => {
        const { actions, data } = this.props;
        actions.toggleDeviceToDashboard(checked, id, data)
            .then(() => {
                let text = checked ? "Added to dashboard" : "Removed from dashboard";
                toastr.success(text);
            })
            .catch(error => {
                toastr.error(error);
            });
    }

    render() {
        const { data, loading } = this.props;

        return (
            <DevicesCard
                devices={data}
                loading={loading}
                onSwitchChange={this.handleSwitch}
                {...this.props}
            />
        );
    }
}




//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
    return {
        data: state.devices.data,
        loading: state.devices.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(deviceActions, dispatch)
    };
};

var DevicesContainer = connect(mapStateToProps, mapDispatchToProps)(Devices);
export default withRouter(DevicesContainer);

