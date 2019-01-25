import React from 'react';

import { Card, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner';

import Table from '../../_common/Table'

const DeviceDataTable = ({ lg, md, sm, deviceData, deviceDataLoading, getDataForLineChart, onRefreshClick }) => {

    //let deviceDataTop10 = deviceData.slice(0, 10);
    let response = getDataForLineChart();

    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <h4>
                        Device Data &nbsp;
                        <i
                            className="fa fa-sync"
                            style={{ color: "green", cursor: "pointer" }}
                            id="DeviceData"
                            onClick={onRefreshClick}
                        ></i>
                    </h4>
                    {
                        deviceDataLoading === true
                            ?
                            <div className="text-center" >
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height="100"
                                    width="100"
                                />
                            </div>
                            :
                            <Table>
                                <thead className="text-primary">
                                    <tr>
                                        <th className="text-center">DateTime</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Value/Average</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        response.data.map((item, index) => {
                                            let dateAndTime = response.datesCreated[index];
                                            let date = dateAndTime.substring(0, 10);
                                            let time = dateAndTime.substring(11, 19);
                                            let type = response.name;
                                            let value = response.data[index].toString().substring(0, 4);

                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">{date} <br /> {time}</td>
                                                    <td className="text-center">{type}</td>
                                                    <td className="text-center font-weight-bold">{value}</td>
                                                </tr>
                                            );
                                        })

                                    }
                                </tbody>
                            </Table>
                    }
                </Card>
            </Col>
        </>
    );
};


export default DeviceDataTable;