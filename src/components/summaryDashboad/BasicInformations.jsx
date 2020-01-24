import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../redux/actions/summaryDashboardActions";

import toastr from "toastr";

import { Row, Col, Button } from "reactstrap";
import LoaderRow from "../_common/LoaderRow";

class BasicInformations extends React.Component {
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
    let { deviceIdsState } = this.props;
    return (
      <>
        {deviceIdsState.loading ? (
          <LoaderRow />
        ) : (
          <Row>
            <Col md="2">
              <div
                className="card bootstrap-card"
                style={{ minHeight: "200px" }}
              >
                <div className="card-header text-uppercase text-center">
                  <b>TOTAL HIVES</b>{" "}
                  <i
                    className="fa fa-mobile ml-2"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </div>
                <div className="card-body">
                  <p className="text-center">
                    <b style={{ fontSize: "3em" }}>
                      {deviceIdsState.deviceIds.length}{" "}
                    </b>{" "}
                    hives
                  </p>
                </div>
              </div>
            </Col>
            <Col md="2">
              <div
                className="card bootstrap-card"
                style={{ minHeight: "200px" }}
              >
                <div className="card-header text-center header-click">
                  <b>Temperature</b>{" "}
                  <i
                    className="fa fa-thermometer-half ml-2"
                    style={{ fontSize: "1.5em" }}
                  ></i>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col col-md-2 text-center">
                        <sup style={{ fontSize: "0.6em" }}>max</sup>
                      </div>
                      <div className="col col-md-6 text-center">
                        <div> second device </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.8em" }}
                        >
                          {" "}
                          12.10.1994
                        </div>
                      </div>
                      <div className="col col-md-4 text-center">
                        <span style={{ fontSize: "1.8em", fontWeight: "500" }}>
                          {" "}
                          55
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col col-md-2 text-center">
                        <sup style={{ fontSize: "0.6em" }}>max</sup>
                      </div>
                      <div className="col col-md-6 text-center">
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100px"
                          }}
                        >
                          {" "}
                          qwdqwdqwdqwd qwd qwdqwd device{" "}
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.8em" }}
                        >
                          {" "}
                          12.10.1994
                        </div>
                      </div>
                      <div className="col col-md-4 text-center">
                        <span style={{ fontSize: "1.8em", fontWeight: "500" }}>
                          {" "}
                          50
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col col-md-2 text-center">
                        <sup style={{ fontSize: "0.6em" }}>avg</sup>
                      </div>

                      <div className="col col-md-4 offset-md-6 text-center">
                        <span style={{ fontSize: "1.8em", fontWeight: "500" }}>
                          {" "}
                          49
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            {/* <Col md="4">
              <div
                className="card bootstrap-card border-info"
                style={{ color: "white" }}
              >
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
                <div className="card-footer text-muted">2 days ago</div>
              </div>
            </Col>
            <Col md="4">
              <div className="card bootstrap-card">
                <div className="card-header header-click">Featured</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Cras justo odio</li>
                  <li className="list-group-item">Dapibus ac facilisis in</li>
                  <li className="list-group-item">Vestibulum at eros</li>
                </ul>
              </div>
            </Col> */}
          </Row>
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
  console.log(deviceIdsState);

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

var BasicInformationsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicInformations);

export default withRouter(BasicInformationsConnected);
