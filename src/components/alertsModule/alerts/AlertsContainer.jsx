import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedAlertsModuleActions from "../../../redux/actions/alertsModuleActions";

import toastr from "toastr";
import { Row, Col, Button, Card, CardHeader, CardBody } from "reactstrap";

import Spinner from "../../_common/Spinner";

import Alert from "./Alert";
import ManageRulesDialog from "./ManageRulesDialog";

class AlertsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isManageRulesDialogOpened: false,
      alert: {}
    };
  }

  handleChangeRule = dataType => {
    const { alertsState } = this.props;
    let alert = alertsState.alerts.find(item => item.dataType == dataType);
    this.setState(
      {
        alert: {
          ...alert,
          rules: [...alert.rules],
          channels: [...alert.channels]
        }
      },
      () => {
        this.handleManageRulesDialogAction(null, "OPEN");
      }
    );
  };

  handleManageRulesDialogAction = (data, action) => {
    const { alertsModuleActions } = this.props;
    if (action == "OPEN") {
      this.setState({ isManageRulesDialogOpened: true });
    }

    if (action == "CONFIRM") {
      this.setState({ isManageRulesDialogOpened: false });
      alertsModuleActions
        .updateAlert(data)
        .then(response => {
          toastr.success(`Successfully updated alert for ${data.dataType}!`);
          this.setState({ isManagePeriodInPastDialogOpened: false });
        })
        .catch(error => {
          this.setState({ isManagePeriodInPastDialogOpened: false });
          toastr.error(`Failed to update alert for ${data.dataType}!`, error);
        });
    }

    if (action == "DENY") {
      this.setState({ isManageRulesDialogOpened: false });
    }
  };

  render() {
    const { alertsState } = this.props;

    return (
      <>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <Row>
            <Col md={11}>
              <h4 className="text-center font-italic font-weight-light">
                Alerts
              </h4>
            </Col>
            <Col md={1}>{alertsState.loading ? <Spinner /> : null}</Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              {alertsState.alerts.map(alert => (
                <Alert
                  key={alert._id}
                  alert={alert}
                  onChangeRule={this.handleChangeRule}
                />
              ))}
            </Col>
          </Row>
        </Card>
        <ManageRulesDialog
          isDialogOpened={this.state.isManageRulesDialogOpened}
          alert={this.state.alert}
          confirmAction={alert => {
            this.handleManageRulesDialogAction(alert, "CONFIRM");
          }}
          denyAction={() => {
            this.handleManageRulesDialogAction(null, "DENY");
          }}
        />
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let alertsState = {
    loading: true,
    ...state.alertsModule.alertsState
  };

  return {
    alertsState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alertsModuleActions: bindActionCreators(
      importedAlertsModuleActions,
      dispatch
    )
  };
};

var AlertsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertsContainer);

export default withRouter(AlertsContainerConnected);
