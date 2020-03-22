import React from "react";

import { Card, Row, Col } from "reactstrap";

import Table from "../../../_common/Table";
import Spinner from "../../../_common/Spinner";

const DeviceCommandsHistorySimple = ({ lg, md, sm, commandsData, commandsLoading }) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ background: "transparent", padding: "10px 15px" }}>
          <Row>
            <Col md={11} className="text-center">
              <h4 className="text-center font-italic font-weight-light">Device Commands History </h4>
            </Col>
            <Col md={1} className="text-center">
              {commandsLoading ? <Spinner /> : null}
            </Col>
          </Row>

          <Table className="simpleTable">
            <thead className="text-primary">
              <tr>
                <th className="text-center">Created</th>
                <th className="text-center" style={{ fontSize: "0.7em" }}>
                  Type
                </th>
                <th className="text-center" style={{ fontSize: "0.7em" }}>
                  Value
                </th>
                <th className="text-center" style={{ fontSize: "0.7em" }}>
                  Channel
                </th>
                <th className="text-center" style={{ fontSize: "0.7em" }}>
                  Executed
                </th>
              </tr>
            </thead>
            <tbody>
              {commandsData.map((item, index) => {
                let [date, time] = item.created.split("T");
                time = time.substring(0, time.length - 6);

                return (
                  <tr key={item._id}>
                    <td className="text-center">
                      {date} <br /> {time}
                    </td>
                    <td className="text-center font-weight-bold" style={{ fontSize: "0.7em" }}>
                      {item.commandItem.commandType}
                    </td>
                    <td className="text-center font-weight-bold" style={{ fontSize: "0.7em" }}>
                      {item.commandItem.commandValue}
                    </td>
                    <td className="text-center font-weight-bold" style={{ fontSize: "0.7em" }}>
                      {item.channel}
                    </td>
                    <td className="text-center" style={{ fontSize: "0.7em" }}>
                      {item.executed ? (
                        <i className="fa fa-check fa-1x" style={{ color: "green" }}></i>
                      ) : (
                        <i className="fa fa-times fa-1x" style={{ color: "red" }} />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card>
      </Col>
    </>
  );
};

export default DeviceCommandsHistorySimple;
