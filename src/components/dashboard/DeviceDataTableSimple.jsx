import React from "react";

import classNames from "classnames";

import { Card, Row, Col, Button, ButtonGroup } from "reactstrap";
import Table from "../_common/Table";
import LoaderOverlay from "../_common/LoaderOverlay";

const DeviceDataTableSimple = ({
  lg,
  md,
  sm,
  device,
  dataType,
  onDataTypeChange,
  deviceData,
  deviceDataLoading,
  getDataForLineChart,
  onRefreshClick
}) => {
  //let deviceDataTop10 = deviceData.slice(0, 10);
  let response = getDataForLineChart();
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ background: "transparent", padding: "10px 15px" }}>
          <h4 className="text-center font-italic font-weight-light">
            Device Data &nbsp;
          </h4>
          <LoaderOverlay isLoading={deviceDataLoading}>
            <Row className="mb-3 text-center">
              <Col md={12}>
                <ButtonGroup className="btn-group-toggle" data-toggle="buttons">
                  {device.dataTypes != null ? (
                    <>
                      {device.dataTypes.map((item, index) => {
                        return (
                          <Button
                            key={index}
                            id={index}
                            color="info"
                            size="sm"
                            tag="label"
                            className={classNames("btn-simple", {
                              active: dataType === item
                            })}
                            onClick={e => {
                              e.preventDefault();
                              onDataTypeChange(item);
                            }} //was firing twice for some reason ???
                          >
                            <input
                              defaultChecked
                              className="d-none"
                              name="options"
                              type="radio"
                            />
                            <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                              {item}
                            </span>
                            <span className="d-block d-sm-none">
                              <i className="tim-icons icon-tap-02" />
                            </span>
                          </Button>
                        );
                      })}
                    </>
                  ) : null}
                </ButtonGroup>
              </Col>
            </Row>
            <Table className="simpleTable">
              <thead className="text-primary">
                <tr>
                  <th className="text-center">DateTime</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Value/Average</th>
                </tr>
              </thead>
              <tbody>
                {response.data.map((item, index) => {
                  let dateAndTime = response.datesCreated[index];
                  let date = dateAndTime.substring(0, 10);
                  let time = dateAndTime.substring(11, 19);
                  let type = response.name;
                  let value = response.data[index].toFixed(2);

                  return (
                    <tr key={index}>
                      <td className="text-center">
                        {date} <br /> {time}
                      </td>
                      <td className="text-center">{type}</td>
                      <td className="text-center font-weight-bold">{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </LoaderOverlay>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataTableSimple;
