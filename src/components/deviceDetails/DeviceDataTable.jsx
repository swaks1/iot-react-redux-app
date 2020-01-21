import React from "react";

import classNames from "classnames";

import { Card, Row, Col, ButtonGroup, Button } from "reactstrap";

import TableWithPagination from "../_common/TableWithPagination";
import LoaderOverlay from "../_common/LoaderOverlay";

const DeviceDataTable = ({
  lg,
  md,
  sm,
  device,
  dataType,
  onDataTypeChange,
  deviceDataLoading,
  getDataForLineChart,
  onRefreshClick
}) => {
  //let deviceDataTop10 = deviceData.slice(0, 10);
  let response = getDataForLineChart();

  // create arrays of 3 elemets and add them to the following array to be rendered as buttons
  let dataTypesArray = [];
  if (device.dataTypes && device.dataTypes.length > 0) {
    let tempArray = [];
    device.dataTypes.forEach((item, index) => {
      if (index % 3 == 0 && tempArray.length > 0) {
        dataTypesArray.push(tempArray);
        tempArray = [];
      }
      tempArray.push(item);
    });
    if (tempArray.length > 0) {
      dataTypesArray.push(tempArray);
    }
  }

  let tableData = response.data.map((item, index) => {
    let dateTimeCreated = response.datesCreated[index];
    return {
      index: index,
      dateAndTime: dateTimeCreated,
      date: dateTimeCreated.substring(0, 10),
      time: dateTimeCreated.substring(11, 19),
      type: response.name,
      value: item.toFixed(2)
    };
  });

  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <h4 className="text-center font-italic font-weight-light">
            Device Data &nbsp;
            <i
              className="fa fa-sync"
              style={{ color: "green", cursor: "pointer" }}
              id="DeviceData"
              onClick={onRefreshClick}
            ></i>
          </h4>
          <LoaderOverlay isLoading={deviceDataLoading}>
            <Row className="mb-3 text-center">
              {dataTypesArray.map((array, arrayIndex) => {
                return (
                  <Col md={12} key={`group-${arrayIndex}`}>
                    <ButtonGroup
                      className="btn-group-toggle"
                      data-toggle="buttons"
                    >
                      {array.map((item, index) => {
                        return (
                          <Button
                            key={`button-${arrayIndex}-${index}`}
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
                    </ButtonGroup>
                  </Col>
                );
              })}
            </Row>
            <TableWithPagination
              className="simpleTable"
              tableHeadColumns={["DateTime", "Type", "Value/Average", ""].map(
                (item, index) => (
                  <th className="text-center" key={`th-${index}`}>
                    {item}
                  </th>
                )
              )}
              pageSize={10}
              data={tableData}
              mapFunction={item => {
                return (
                  <tr key={`tr-${item.index}`}>
                    <td className="text-center">
                      {item.date} <br /> {item.time}
                    </td>
                    <td className="text-center">{item.type}</td>
                    <td className="text-center font-weight-bold">
                      {item.value}
                    </td>
                  </tr>
                );
              }}
            ></TableWithPagination>
          </LoaderOverlay>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataTable;
