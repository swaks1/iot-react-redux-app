import React from "react";
import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedAlertsModuleActions from "../../redux/actions/alertsModuleActions";

import toastr from "toastr";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { helper } from "../../utils/helper";

import AlertsContainer from "./alerts/AlertsContainer";
import AlertsHistoryContainer from "./alertsHistory/AlertsHistoryContainer";

class AlertsModuleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const deviceId = this.props.match.params.id;
    let { alertsModuleActions } = this.props;
    alertsModuleActions
      .loadAlertsModule(deviceId)
      .catch(error => toastr.error(error));
  }

  render() {
    return (
      <>
        <Row>
          <Col lg="4" md="12">
            <AlertsContainer />
          </Col>
          <Col lg="8" md="12">
            <AlertsHistoryContainer />
          </Col>
        </Row>
      </>
    );
  }
}
//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    alertsModuleActions: bindActionCreators(
      importedAlertsModuleActions,
      dispatch
    )
  };
};

var AlertsModuleContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertsModuleContainer);

export default withRouter(AlertsModuleContainerConnected);
