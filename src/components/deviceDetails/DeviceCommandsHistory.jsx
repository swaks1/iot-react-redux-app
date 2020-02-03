import React from "react";

import { Card, Row, Col } from "reactstrap";

import Table from "../_common/Table";
import Spinner from "../_common/Spinner";

const DeviceCommandsHistory = ({
  lg,
  md,
  sm,
  commandsData,
  commandsLoading,
  onRefreshClick
}) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <Row>
            <Col md={11}>
              <h4 className="text-center font-italic font-weight-light">
                Device Commands History{" "}
                <i
                  className="fa fa-sync"
                  style={{ color: "green", cursor: "pointer" }}
                  id="DeviceCommandsHistory"
                  onClick={onRefreshClick}
                ></i>
              </h4>
            </Col>
            <Col md={1}>{commandsLoading ? <Spinner /> : null}</Col>
          </Row>

          <Table>
            <thead className="text-primary">
              <tr>
                <th className="text-center">Created</th>
                <th className="text-center">Type</th>
                <th className="text-center">Value</th>
                <th className="text-center">Channel</th>
                <th className="text-center">Executed</th>
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
                    <td className="text-center">
                      {item.commandItem.commandType}
                    </td>
                    <td className="text-center">
                      {item.commandItem.commandValue}
                    </td>
                    <td className="text-center">{item.channel}</td>
                    <td className="text-center">
                      {item.executed ? (
                        <i
                          className="fa fa-check fa-1x"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-times fa-1x"
                          style={{ color: "red" }}
                        />
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

export default DeviceCommandsHistory;
