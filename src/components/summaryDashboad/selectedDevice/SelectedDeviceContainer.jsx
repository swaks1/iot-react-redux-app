import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../../redux/actions/summaryDashboardActions";

import { Row, Col, Button } from "reactstrap";

import { helper } from "../../../utils/helper";
import LoaderRow from "../../_common/LoaderRow";
import DataCard from "./DataCard";
import DataChartView from "./DataChartView";

class SelectedDeviceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      loading,
      dataGrouped,
      selectedInfo,
      onChangeDeviceDataType,
      onChangeDeviceDataPeriod
    } = this.props;

    return (
      <>
        {loading ? (
          <LoaderRow style={{ minHeight: "210px" }} />
        ) : (
          <Row>
            <Col md={{ size: 5 }}>
              {dataGrouped.map((data, index) => {
                return (
                  <Row key={index} className={`${index == 0 ? "" : "mt-4"}`}>
                    {data.map(dataItem => (
                      <Col md={6} key={dataItem.dataType}>
                        <DataCard
                          dataType={dataItem.dataType}
                          faIcon={helper.getIconForDataType(dataItem.dataType)}
                          date={dataItem.created}
                          dataValue={dataItem.dataValue}
                          selected={
                            selectedInfo &&
                            selectedInfo.selectedDevice &&
                            selectedInfo.selectedDevice.dataType ==
                              dataItem.dataType
                          }
                          onChangeDeviceDataType={onChangeDeviceDataType}
                        />
                      </Col>
                    ))}
                  </Row>
                );
              })}
            </Col>
            <Col md={7}>
              <Row>
                <DataChartView
                  selectedInfo={selectedInfo}
                  onChangeDeviceDataPeriod={onChangeDeviceDataPeriod}
                />
              </Row>
            </Col>
          </Row>
        )}
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let summaryDevicesWithDataState = {
    loading: true,
    ...state.summaryDashboard.devicesWithDataState
  };

  let loading = true;
  let dataGrouped = []; //array that will contain arrays of 2 data [[dataItem1, dataItem2],[dataItem3, dataItem4]...]
  if (summaryDevicesWithDataState.loading == false) {
    let devices = summaryDevicesWithDataState.devices;
    if (
      ownProps.selectedInfo &&
      ownProps.selectedInfo.selectedDevice &&
      ownProps.selectedInfo.selectedDevice.id
    ) {
      let deviceId = ownProps.selectedInfo.selectedDevice.id;
      let device = devices.find(device => device.id == deviceId);
      if (device) {
        for (let i = 0; i < device.data.length - 1; i += 2) {
          dataGrouped.push([device.data[i], device.data[i + 1]]);
        }
        // if odd number of dataTypes add the last one since it doesnt have a partner
        if (device.data.length % 2 == 1) {
          dataGrouped.push([device.data[device.data.length - 1]]);
        }
      }
    }

    loading = false;
  }

  return {
    loading,
    dataGrouped
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

var SelectedDeviceContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedDeviceContainer);

export default withRouter(SelectedDeviceContainerConnected);
