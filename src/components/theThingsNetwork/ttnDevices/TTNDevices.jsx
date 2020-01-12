import React from "react";
import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedTtnActions from "../../../redux/actions/ttnActions";
import * as importedDeviceActions from "../../../redux/actions/deviceActions";

import toastr from "toastr";

import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import LoaderRow from "../../_common/LoaderRow";
import Table from "../../_common/Table";

class TTNDevices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let { ttnActions } = this.props;
    ttnActions.loadTTNDevices().catch(error => toastr.error(error));
  }

  render() {
    const {
      location,
      ttnDevices,
      ttnDevicesLoading,
      notConnectedIotDevices
    } = this.props;

    let redirectLocation = location.pathname.replace("/ttn","/devices");
    return (
      <>
        {ttnDevicesLoading ? (
          <LoaderRow />
        ) : (
          <Row>
            <Col md="12" className="mt-2 pl-5">
              <h3>Devices</h3>
            </Col>
            <Col md={{ size: 8, offset: 1 }} className="text-center">
              <Table>
                <thead className="text-primary">
                  <tr>
                    <th>Dev Id</th>
                    <th>IOT Device</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ttnDevices.map((item, index) => (
                    <tr key={item.devId}>
                      <td>{item.devId}</td>
                      <td>
                        {item.connectedIotDevice ? (
                          <Link
                            to={`${redirectLocation}/${item.connectedIotDevice._id}`}
                          >
                            {item.connectedIotDevice.name}
                          </Link>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <Button
                          color="danger"
                          size="sm"
                          id={`deleteBtn_${item.devId}`}
                          onClick={() => {}}
                          tooltip={"delete"}
                        >
                          <i className="fa fa-trash" />
                        </Button>
                        {" | "}
                        <Button
                          color="default"
                          size="sm"
                          id={`deleteBtn_${item.devId}`}
                          onClick={() => {}}
                          tooltip={"delete"}
                        >
                          <i className="fa fa-edit" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let ttnDevices = state.ttnIntegration.deviceState.devices.map(item => item);
  let ttnDevicesLoading = state.ttnIntegration.deviceState.loading;
  let iotDevices = state.devices.map(item => item.data);

  let connectedIotDevices = [];
  // add the iot device as property if the ttn and iot devices are connected
  ttnDevices = ttnDevices.map(ttnDevice => {
    var connectedIotDevice = iotDevices.find(
      iotDevice =>
        iotDevice.ttnInfo != null && iotDevice.ttnInfo.dev_id == ttnDevice.devId
    );
    if (connectedIotDevice != null) {
      connectedIotDevices.push(connectedIotDevice);
      let updatedTtnDevice = {
        ...ttnDevice,
        connectedIotDevice: {
          _id: connectedIotDevice._id,
          name: connectedIotDevice.name
        }
      };
      return updatedTtnDevice;
    } else {
      return ttnDevice;
    }
  });

  let notConnectedIotDevices = iotDevices.filter(
    iotDevice =>
      connectedIotDevices.some(item => item._id == iotDevice._id) == false
  );

  return {
    ttnDevices,
    ttnDevicesLoading,
    notConnectedIotDevices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ttnActions: bindActionCreators(importedTtnActions, dispatch),
    deviceActions: bindActionCreators(importedDeviceActions, dispatch)
  };
};

var TTNDevicesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TTNDevices);

export default withRouter(TTNDevicesConnected);
