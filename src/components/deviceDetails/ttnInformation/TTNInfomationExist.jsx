import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as importedTTNActions from "../../../redux/actions/ttnActions";
import TTNInfomationExistExtendedInformation from "./TTNInfomationExistExtendedInformation";

import toastr from "toastr";

import {
  Card,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Collapse,
  Input
} from "reactstrap";

class TTNInfomationExist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseElementOpened: false
    };
  }

  handleDeleteTTNInfo = event => {
    let { ttnActions } = this.props;
    ttnActions
      .deleteTTNDeviceInfo(this.props.device._id)
      .then(() => {
        toastr.success("Successfully deleted existing TTN Info !");
      })
      .catch(() => {
        toastr.error("Failed to deleted existing TTN Info");
      });
  };

  handleCollapseClick = () => {
    let { collapseElementOpened } = this.state;
    let { extendedTTNInfo, ttnActions } = this.props;

    this.setState({ collapseElementOpened: !collapseElementOpened });
    if (
      extendedTTNInfo == null ||
      extendedTTNInfo.data == null ||
      extendedTTNInfo.data.appEui == null
    ) {
      ttnActions
        .loadExtendedTTNInfo(
          this.props.device._id,
          this.props.device.ttnInfo.dev_id
        )
        .then(() => {
          toastr.success("Successfully loaded extended TTN Info !");
        })
        .catch(() => {
          toastr.error("Failed to load extended TTN Info");
        });
    }
  };

  render() {
    const { device, extendedTTNInfo } = this.props;
    const { collapseElementOpened } = this.state;
    let ttnInfo = device.ttnInfo;

    return (
      <>
        <FormGroup row>
          <Label for="app_id" sm={5}>
            {" "}
            App Id
          </Label>
          <Col sm={7}>
            {<h4 className={"col-form-label"}>{ttnInfo.app_id}</h4>}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="dev_id" sm={5}>
            {" "}
            Dev Id
          </Label>
          <Col sm={7}>
            {<h4 className={"col-form-label"}>{ttnInfo.dev_id}</h4>}
          </Col>
        </FormGroup>
        <Row>
          {collapseElementOpened == false ? (
            <Col md={12} className="text-center">
              <Button
                color="btn btn-link"
                onClick={this.handleCollapseClick}
                style={{ marginBottom: "5px" }}
              >
                <span style={{ fontSize: "0.8em" }}>
                  <i className="fas fa-angle-double-down"></i> View More
                </span>
              </Button>
            </Col>
          ) : null}
        </Row>

        <Collapse isOpen={collapseElementOpened}>
          <TTNInfomationExistExtendedInformation
            extendedTTNInfo={extendedTTNInfo}
          />
          <Row className="mt-5">
            <Col sm={{ size: 4, offset: 6 }} className="text-center">
              <Button
                color="danger"
                size="sm"
                id="deleteExisting"
                onClick={this.handleDeleteTTNInfo}
              >
                Disconnect
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            {collapseElementOpened == true ? (
              <Col md={12} className="text-center">
                <Button
                  color="btn btn-link"
                  onClick={this.handleCollapseClick}
                  style={{ marginBottom: "5px" }}
                >
                  <span style={{ fontSize: "0.8em" }}>
                    <i className="fas fa-angle-double-up"></i> Show Less
                  </span>
                </Button>
              </Col>
            ) : null}
          </Row>
        </Collapse>
      </>
    );
  }
}

const getDeviceById = (devices, id) => {
  const filtered = devices.filter(d => d.deviceId === id);
  if (filtered.length > 0) return filtered[0];
  return null;
};
//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  const deviceId = ownProps.match.params.id; // from the path '/devices/:id'

  let device = null;
  let extendedTTNInfo = {
    loading: true
  };
  let deviceObj = getDeviceById(state.devices, deviceId);
  if (deviceObj != null) {
    device = deviceObj.data;
    extendedTTNInfo = deviceObj.extendedTTNInfo;
  }
  return {
    device,
    extendedTTNInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ttnActions: bindActionCreators(importedTTNActions, dispatch)
  };
};

var TTNInfomationExistConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TTNInfomationExist);
export default withRouter(TTNInfomationExistConnected);
