import React from "react";

import classNames from "classnames";

import { Card, Row, Col, Button, ButtonGroup } from "reactstrap";
import ReactTooltip from "react-tooltip";

import TableWithPagination from "../../../_common/TableWithPagination";
import Spinner from "../../../_common/Spinner";
import { helper } from "../../../../utils/helper";

const DeviceDataTableSimple = ({
  lg,
  md,
  sm,
  device,
  dataType,
  onDataTypeChange,
  deviceData,
  deviceDataLoading,
  dataPeriod,
  onRefreshClick
}) => {
  //let deviceDataTop10 = deviceData.slice(0, 10);
  let response = helper.mapDataToResponse(false, deviceData, dataPeriod);

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
      value: item.toFixed(2),
      channel: response.channels[index]
    };
  });

  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card
          style={{
            background: "transparent",
            padding: "10px 15px",
            marginBottom: "5px"
          }}
        >
          <Row>
            <Col md={11} className="text-center">
              <h4 className="text-center font-italic font-weight-light">Device Data </h4>
            </Col>
            <Col md={1} className="text-center">
              {deviceDataLoading ? <Spinner /> : null}
            </Col>
          </Row>
          <Row className="mb-3 text-center">
            {dataTypesArray.map((array, arrayIndex) => {
              return (
                <Col md={12} key={`group-${arrayIndex}`}>
                  <ButtonGroup className="btn-group-toggle" data-toggle="buttons">
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
                          <input defaultChecked className="d-none" name="options" type="radio" />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">{item}</span>
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
            tableHeadColumns={["DateTime", "Type", "Value/Average", ""].map((item, index) => (
              <th className="text-center" key={`th-${index}`}>
                {item}
              </th>
            ))}
            pageSize={5}
            data={tableData}
            mapFunction={item => {
              return (
                <tr key={`tr-${item.index}`}>
                  <td className="text-center">
                    {item.date} <br /> {item.time}
                  </td>
                  <td className="text-center">
                    <span>{item.type}</span>
                    {item.channel ? (
                      <>
                        <ReactTooltip effect="solid" />
                        <span style={{ paddingLeft: "10px", fontSize: "0.8em" }}>
                          {item.channel == "LoraWAN" ? (
                            <i className="fa fa-signal" data-tip="LoraWAN"></i>
                          ) : (
                            <i className="fa fa-wifi" data-tip="WiFi"></i>
                          )}
                        </span>
                      </>
                    ) : null}
                  </td>
                  <td className="text-center font-weight-bold">{item.value}</td>
                </tr>
              );
            }}
          ></TableWithPagination>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataTableSimple;
