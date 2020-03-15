import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedAlertsModuleActions from "../../../redux/actions/alertsModuleActions";

import toastr from "toastr";
import { Row, Col, Button, Card, CardHeader, CardBody } from "reactstrap";
import * as stateHelper from "../../../redux/utils/stateHelper";
import { helper } from "../../../utils/helper";

import Spinner from "../../_common/Spinner";
import Table from "../../_common/Table";
import TableWithPagination from "../../_common/TableWithPagination";

class AlertsHistoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleRefreshClick = event => {
    const deviceId = this.props.match.params.id;
    let { alertsModuleActions } = this.props;

    alertsModuleActions
      .loadAlertsModule(deviceId)
      .then(() => {
        toastr.success("Reloaded Alerts Module!");
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  render() {
    const { alertsHistoryState } = this.props;
    let tableData = alertsHistoryState.alertsHistory.map((item, index) => {
      return {
        index: index,
        dateAndTime: item.created,
        date: item.created.substring(0, 10),
        time: item.created.substring(11, 19),
        dataType: item.dataType,
        rulesTriggered: item.rulesTriggered.map(rule => {
          return {
            ...rule,
            date: rule.created.substring(0, 10),
            time: rule.created.substring(11, 19)
          };
        }),
        channels: [...item.channels]
      };
    });

    return (
      <>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <Row>
            <Col md={11}>
              <h4 className="text-center font-italic font-weight-light">
                Alerts History{" "}
                <i
                  className="fa fa-sync"
                  style={{ color: "green", cursor: "pointer" }}
                  id="AlertsHistory"
                  onClick={this.handleRefreshClick}
                ></i>
              </h4>
            </Col>
            <Col md={1}>{alertsHistoryState.loading ? <Spinner /> : null}</Col>
          </Row>

          <Row>
            <Col md={12}>
              <TableWithPagination
                className="simpleTable"
                tableHeadColumns={["Data Type", "Date", "Channels", "Rules Triggered"].map((item, index) => (
                  <th className="text-center" key={`th-${index}`}>
                    {item}
                  </th>
                ))}
                pageSize={3}
                data={tableData}
                mapFunction={item => {
                  return (
                    <tr key={`tr-${item.index}`}>
                      <td className="text-center">
                        <span>
                          {item.dataType} <i className={`fa fa-${helper.getIconForDataType(item.dataType)}`}></i>
                        </span>
                      </td>
                      <td className="text-center">
                        {item.date} <br /> {item.time}
                      </td>
                      <td className="text-center">{item.channels.join(", ")}</td>
                      <td className="text-center">
                        <Table>
                          <thead>
                            <tr>
                              <th className="text-center">Operator</th>
                              <th className="text-center">Operator Value</th>
                              <th className="text-center">Actual Value</th>
                              <th className="text-center">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.rulesTriggered.map(rule => (
                              <tr key={rule._id}>
                                <td className="text-center">{rule.operator}</td>
                                <td className="text-center">
                                  {rule.operator == "lastSeen" ? (
                                    <>{`${rule.operatorValue} min`}</>
                                  ) : (
                                    rule.operatorValue
                                  )}
                                </td>
                                <td className="text-center font-weight-bold">
                                  {rule.operator == "lastSeen" ? (
                                    <>
                                      {rule.actualValue.substring(0, 10)}
                                      <br />
                                      {rule.actualValue.substring(11, 19)}
                                    </>
                                  ) : (
                                    rule.actualValue
                                  )}
                                </td>
                                <td className="text-center">
                                  {rule.date} <br /> {rule.time}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                  );
                }}
              ></TableWithPagination>
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  const deviceId = ownProps.match.params.id;
  let alertItem = state.alertsModule.find(item => item.deviceId == deviceId);
  alertItem = alertItem ? alertItem : stateHelper.getAlertItem();

  let alertsHistoryState = {
    loading: true,
    ...alertItem.alertsHistoryState
  };

  return {
    alertsHistoryState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alertsModuleActions: bindActionCreators(importedAlertsModuleActions, dispatch)
  };
};

var AlertsHistoryContainerConnected = connect(mapStateToProps, mapDispatchToProps)(AlertsHistoryContainer);

export default withRouter(AlertsHistoryContainerConnected);
