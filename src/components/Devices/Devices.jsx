import React from "react";
import Loader from 'react-loader-spinner';
import Table from "../_common/Table";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import Switch from "react-switch";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loadingData: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState(prevStat => ({
                data: [
                    {
                        "location": {
                            "lat": "40.1",
                            "lng": "33.2",
                            "description": "2location Descr"
                        },
                        "_id": "5c1548154b159d33c4d7b59c",
                        "name": "secondDevice",
                        "description": "2device Descr",
                        "__v": 0,
                        "isActive": true,
                        "isAddedToDashboard": false
                    },
                    {
                        "location": {
                            "lat": "40.1",
                            "lng": "33.2",
                            "description": "111location Descr"
                        },
                        "_id": "5c155ac37edd5241308289a9",
                        "name": "EditedFFFFFDevice",
                        "description": "1device Descr",
                        "__v": 0,
                        "isActive": true,
                        "isAddedToDashboard": true
                    },
                    {
                        "location": {
                            "lat": "40.1",
                            "lng": "33.2",
                            "description": "2location Descr"
                        },
                        "_id": "5c155d5abea777461420387a",
                        "name": "thirdDevice",
                        "description": "2device Descr",
                        "__v": 0,
                        "isActive": false,
                        "isAddedToDashboard": true
                    },
                    {
                        "location": {
                            "lat": "40.1",
                            "lng": "33.2",
                            "description": "2location Descr"
                        },
                        "_id": "5c15685c4fdd084574660826",
                        "name": "dasdasda",
                        "description": "dasdasd Descr",
                        "__v": 0,
                        "isActive": true,
                        "isAddedToDashboard": false
                    },
                    {
                        "location": {
                            "description": "Test Location Description",
                            "lat": "0",
                            "lng": "0"
                        },
                        "_id": "5c256321c3d501392c634988",
                        "name": "locationTest",
                        "__v": 0,
                        "description": "Opis za device",
                        "isActive": false,
                        "isAddedToDashboard": false
                    },
                    {
                        "location": {
                            "accuracy": "0",
                            "description": "Test Location Description",
                            "lat": "0",
                            "lng": "0"
                        },
                        "_id": "5c27b2826ef018378057171a",
                        "name": "forthDevice",
                        "__v": 0,
                        "description": "Opis za device",
                        "isActive": true,
                        "isAddedToDashboard": true
                    }
                ],
                loadingData: false
            }))
        }, 1000);
    }


    render() {
        return (
            <>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <h3 className="title">Devices</h3>
                                <p className="category">
                                    All devices registered on the API
                                 </p>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col
                                        lg="12"
                                        md="12"
                                        sm="12"
                                        className="text-center"
                                    >
                                        {
                                            this.state.loadingData
                                                ?
                                                <Loader
                                                    type="Puff"
                                                    color="#00BFFF"
                                                    height="100"
                                                    width="100"
                                                />
                                                :
                                                <Table>
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>Id</th>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                            <th>Location</th>
                                                            <th>Is Active</th>
                                                            <th>On Dashboard</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.data.map((item, index) =>
                                                                <tr key={item._id}>
                                                                    <td>{item._id}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.description}</td>
                                                                    <td>{item.location.lat}</td>
                                                                    <td>{item.isActive
                                                                        ? <i className="fa fa-check fa-2x" style={{ color: "green" }}></i>
                                                                        : <i className="fa fa-times fa-2x" style={{ color: "red" }} />}</td>
                                                                    <td>
                                                                        {
                                                                            <Switch
                                                                                onChange={() => { }}
                                                                                checked={item.isAddedToDashboard}
                                                                            />
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )

                                                        }
                                                    </tbody>
                                                </Table>
                                        }
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
