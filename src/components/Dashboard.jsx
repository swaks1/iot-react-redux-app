import React from "react";
import Loader from 'react-loader-spinner'

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

class Dashboard extends React.Component {
  render() {
    return (
      <>
        
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">100 Awesome Nucleo Icons</h5>
                  <p className="category">
                    Handcrafted by our friends from{" "}
                    <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                  </p>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p>icon-alert-circle-exc</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-align-center" />
                        <p>icon-align-center</p>
                      </div>
                    </Col>
                    <Col
                      lg="12"
                    >
                      <Loader 
                        type="Puff"
                        color="#00BFFF"
                        height="100"	
                        width="100"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
       
      </>
    );
  }
}

export default Dashboard;
