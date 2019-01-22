import React from 'react';

import { Card, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner';

import Table from '../../_common/Table'

const DeviceDataTable = ({ lg, md, sm, deviceData, deviceDataLoading, onRefreshClick }) => {
    
    let deviceDataTop10 = deviceData.slice(0,10);

    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <h4>
                        Device Data &nbsp;
                                {/* <i
                            className="fa fa-sync"
                            style={{ color: "green", cursor: "pointer" }}
                            id="DeviceData"
                            onClick={onRefreshClick}
                        ></i> */}
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
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        deviceDataTop10.map((item, index) => {
                                            let [date, time] = item.created.split("T");
                                            time = time.substring(0, time.length - 5);

                                            return (
                                                <tr key={item._id}>
                                                    <td className="text-center">{date} <br /> {time}</td>
                                                    <td className="text-center">{item.dataItem.dataType}</td>
                                                    <td className="text-center font-weight-bold">{item.dataItem.dataValue}</td>
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