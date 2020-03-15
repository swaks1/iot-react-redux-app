import React from "react";

import { Row, Col } from "reactstrap";

import { helper } from "../../../utils/helper";
import SpanButton from "../../_common/SpanButton";

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { alert, onChangeRule } = this.props;
    const activeRules = alert.rules.filter(item => item.selected);
    const activeChannels = alert.channels.filter(item => item.selected);

    return (
      <Row className="mb-2">
        <Col md={12}>
          <Row>
            <Col md={5}>
              <Row>
                <Col md="12">
                  <h4 style={{ textTransform: "uppercase" }}>
                    {alert.dataType} <i className={`fa fa-${helper.getIconForDataType(alert.dataType)}`}></i>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md="12" style={{ fontSize: "0.8em" }}>
                  <div>
                    <span>channels:</span>
                    <span className="font-weight-bold" style={{ marginLeft: "5px" }}>
                      {activeChannels.map(channel => channel.name).join(", ")}
                    </span>
                  </div>
                  <div>
                    <span>active rules:</span>
                    <span className="font-weight-bold" style={{ marginLeft: "5px" }}>
                      {activeRules.length}
                    </span>
                  </div>
                  <div>
                    <SpanButton
                      style={{ padding: "0px 0px" }}
                      text={`EDIT ALERT`}
                      tooltip={`Edit alert for ${alert.dataType}`}
                      faIcon="edit"
                      onClick={() => {
                        onChangeRule(alert.dataType);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={7}>
              {activeRules.length > 0 ? (
                <>
                  <Row>
                    <Col md={12} className="text-center">
                      <small>Active Rules:</small>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    {activeRules.map(rule => (
                      <Col md={12} key={rule._id}>
                        <Row className="mb-2">
                          <Col md={4} className="text-center">
                            {rule.operator}
                          </Col>
                          <Col md={4} className="text-center">
                            {rule.operator == "lastSeen" ? "before" : "than"}
                          </Col>
                          <Col md={4} className="text-center">
                            {rule.operator == "lastSeen" ? `${rule.operatorValue} min` : rule.operatorValue}
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col md={12} className="text-center">
                      <small>No rules selected for this data type !</small>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <hr></hr>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Alert;
