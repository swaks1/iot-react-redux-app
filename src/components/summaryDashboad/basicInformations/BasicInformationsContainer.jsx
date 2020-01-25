import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../../redux/actions/summaryDashboardActions";

import toastr from "toastr";
import { Row, Col, Button } from "reactstrap";

import LoaderRow from "../../_common/LoaderRow";
import SpanButton from "../../_common/SpanButton";
import CustomCard from "../../_common/CustomCard";

class BasicInformationsContainer extends React.Component {
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
    const { deviceIdsState } = this.props;

    return (
      <>
        {deviceIdsState.loading ? (
          <LoaderRow />
        ) : (
          <>
            <Row>
              <Col md="12">
                <CustomCard
                  card={{
                    className: "custom-summary-card"
                  }}
                  header={{
                    className: "text-uppercase text-center",
                    elements: (
                      <>
                        <span>total hives</span>
                        <i className={`fa fa-mobile-alt`}></i>
                      </>
                    )
                  }}
                  body={{
                    className: "text-center",
                    elements: (
                      <>
                        <div className="data-value">
                          {deviceIdsState.deviceIds.length}
                        </div>
                      </>
                    )
                  }}
                />
              </Col>
              <Col md={12}>
                <Row className="mt-4">
                  <Col className="col text-left pl-2" md={6}>
                    <SpanButton
                      text="devices"
                      tooltip="Manage Devices"
                      faIcon="mobile-alt"
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {}}
                    />
                  </Col>
                  <Col className="col text-right pr-2" md={6}>
                    <SpanButton
                      text="data-types"
                      tooltip="Manage Data Types"
                      faIcon="link"
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {}}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let deviceIdsState = {
    loading: true
  };
  deviceIdsState = {
    ...state.summaryDashboard.deviceIdsState
  };

  return {
    deviceIdsState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    summaryDashboardActions: bindActionCreators(
      importedSummaryDashboardActions,
      dispatch
    )
  };
};

var BasicInformationsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicInformationsContainer);

export default withRouter(BasicInformationsContainerConnected);
