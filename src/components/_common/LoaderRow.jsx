import React from "react";

import { Row, Col } from "reactstrap";
import Loader from "react-loader-spinner";

const LoaderRow = ({ style }) => {
  return (
    <>
      <Row style={style ? { ...style } : {}}>
        <Col lg="12" md="12" sm="12" className="text-center">
          <Loader type="Puff" color="#00BFFF" height="100" width="100" />
        </Col>
      </Row>
    </>
  );
};

export default LoaderRow;
