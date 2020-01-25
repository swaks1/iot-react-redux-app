import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../../redux/actions/summaryDashboardActions";

import toastr from "toastr";
import { Row, Col, Button } from "reactstrap";

import LoaderRow from "../../_common/LoaderRow";
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
                        <i className={`fa fa-mobile`}></i>
                      </>
                    )
                  }}
                  body={{
                    className: "text-center",
                    elements: (
                      <>
                        <span>{deviceIdsState.deviceIds.length}</span>
                      </>
                    )
                  }}
                />
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
