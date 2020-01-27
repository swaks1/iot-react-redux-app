import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../redux/actions/summaryDashboardActions";

import toastr from "toastr";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import BasicInformationsContainer from "./basicInformations/BasicInformationsContainer";
import MinMaxAvgContainer from "./minMaxAvg/MinMaxAvgContainer";
import DevicesContainer from "./devices/DevicesContainer";
import SelectedDeviceContainer from "./selectedDevice/SelectedDeviceContainer";

class SummaryDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { summaryDashboardActions } = this.props;
    summaryDashboardActions
      .loadSummaryDashboard("beehiveDashboard")
      .catch(error => toastr.error(error));
  }

  render() {
    return (
      <>
        <Row>
          <Col md="12">
            <h3>BEEHIVE DASHBOARD</h3>
          </Col>
        </Row>

        <Row>
          <Col md="2">
            <Card>
              <CardHeader>
                <h5>BASIC INFO</h5>
              </CardHeader>
              <CardBody>
                <BasicInformationsContainer />
              </CardBody>
            </Card>
          </Col>
          <Col md="10">
            <Card>
              <CardHeader>
                <h5>MIN, MAX, AVG </h5>
              </CardHeader>
              <CardBody>
                <MinMaxAvgContainer />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <>
                  <div className="data-type-with-icon">
                    <span>TEMPERATURE</span>
                    <i className={`fa fa-thermometer-half`}></i>
                  </div>
                </>
              </CardHeader>
              <CardBody>
                <DevicesContainer />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <>
                  <span>DEVICE 1</span>
                </>
              </CardHeader>
              <CardBody>
                <SelectedDeviceContainer />
              </CardBody>
            </Card>
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
    summaryDashboardActions: bindActionCreators(
      importedSummaryDashboardActions,
      dispatch
    )
  };
};

var SummaryDashboardContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SummaryDashboardContainer);

export default withRouter(SummaryDashboardContainerConnected);
