import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedTtnActions from "../../redux/actions/ttnActions";

import toastr from "toastr";

import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import LoaderRow from "../_common/LoaderRow";

class ApplicaitonInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    let { ttnActions } = this.props;
    ttnActions
      .loadTTNApplicationInfo()
      .catch(error => toastr.error(error));
  }

  render() {
    const { loading, applicationInfo } = this.props;

    return (
      <>
        {loading ? (
          <LoaderRow />
        ) : (
          <Row>
            <Col md="4">
              <Label md={3} className={"text-right"}>
                Applicaiton Id:
              </Label>
              <span className={"text-left col-md-7 font-weight-bold"}>
                {applicationInfo.appId}
              </span>
            </Col>
            <Col md="8" className="text-center">
              <Row>
                <Col md={3} className={"text-right"}>
                  <Label>Payload Format:</Label>
                </Col>
                <Col md={9} className={"text-left font-weight-bold"}>
                  <span>{applicationInfo.payloadFormat}</span>
                </Col>
              </Row>
              <Row>
                <Col md={3} className={"text-right"}>
                  <Label for="decoder"> Decoder:</Label>
                </Col>
                <Col md={9} className={"text-left"}>
                  <textarea
                    name="decoder"
                    id="decoder"
                    defaultValue={applicationInfo.decoder}
                    disabled={true}
                    rows={7}
                    cols={50}
                  />
                </Col>
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
  let applicationInfo = {};
  applicationInfo = {
    ...state.ttnIntegration.applicationInfoState.applicationInfo
  };

  let loading = state.ttnIntegration.applicationInfoState.loading;

  return {
    applicationInfo,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ttnActions: bindActionCreators(importedTtnActions, dispatch)
  };
};

var ApplicaitonInfoConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicaitonInfo);

export default withRouter(ApplicaitonInfoConnected);
