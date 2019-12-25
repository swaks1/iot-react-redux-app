import React from "react";
//import PropTypes from 'prop-types';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import LoaderRow from "../_common/LoaderRow";
import DeviceDetailsSimple from "./DeviceDetailsSimple";

const DashboardCard = ({ devices, loading }) => {
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h3 className="title">Dashboard</h3>
              <p className="category">Devices on dashboard</p>
            </CardHeader>
            <CardBody>
              {loading ? (
                <LoaderRow />
              ) : (
                devices.map((item, index) => (
                  <DeviceDetailsSimple deviceId={item._id} key={index} />
                ))
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DashboardCard;
