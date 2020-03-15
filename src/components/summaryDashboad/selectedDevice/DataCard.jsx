import React from "react";
import { Row, Col, Button } from "reactstrap";

import CustomCard from "../../_common/CustomCard";
class DataCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { dataType, faIcon, date, dataValue, selected, onChangeDeviceDataType } = this.props;

    return (
      <>
        <CustomCard
          card={{
            className: `custom-data-type-card ${selected ? "border-info" : ""}`,
            onClick: () => onChangeDeviceDataType(dataType)
          }}
          header={{
            elements: (
              <>
                <Row>
                  <Col md={8} className="col text-center">
                    <div>
                      <span className="dataType">{dataType}</span>
                      <i className={`fa fa-${faIcon}`}></i>
                    </div>
                    <div className="device-date text-muted">{date && date.substring(0, 10)}</div>
                    <div className="device-date text-muted">{date && date.substring(11, 19)}</div>
                  </Col>
                  <Col md={4} className="col text-center">
                    <span className="dataValue">{dataValue}</span>
                  </Col>
                </Row>
              </>
            )
          }}
        />
      </>
    );
  }
}

export default DataCard;
