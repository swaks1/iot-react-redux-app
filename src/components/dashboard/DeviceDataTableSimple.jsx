import React from 'react';

import { Card, Col } from 'reactstrap';

import Table from '../_common/Table'
import LoaderOverlay from '../_common/LoaderOverlay';

const DeviceDataTableSimple = ({ lg, md, sm, deviceData, deviceDataLoading, getDataForLineChart, onRefreshClick }) => {

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
                        <Table className="simpleTable">
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
                    </LoaderOverlay>
                </Card>
            </Col>
        </>
    );
};


export default DeviceDataTableSimple;