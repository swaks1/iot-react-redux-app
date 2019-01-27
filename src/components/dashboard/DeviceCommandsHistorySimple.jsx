import React from 'react';

import { Card, Col } from 'reactstrap';
import Loader from 'react-loader-spinner';

import Table from '../_common/Table'

const DeviceCommandsHistorySimple = ({ lg, md, sm, commandsData, commandsLoading }) => {
    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                <Card style={{ background: "transparent", padding: "10px 15px" }}>
                    <h4 className="text-center font-italic font-weight-light">
                        Device Commands History &nbsp;

                    </h4>
                    {
                        commandsLoading === "r"//true
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
                            <Table className="simpleTable">
                                <thead className="text-primary">
                                    <tr>
                                        <th className="text-center">Created</th>
                                        <th className="text-center">Type</th>
                                        <th className="text-center">Value</th>
                                        <th className="text-center">Executed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        commandsData.map((item, index) => {
                                            let [date, time] = item.created.split("T");
                                            time = time.substring(0, time.length - 5);

                                            return (
                                                <tr key={item._id}>
                                                    <td className="text-center">{date} <br /> {time}</td>
                                                    <td className="text-center">{item.commandItem.commandType}</td>
                                                    <td className="text-center">{item.commandItem.commandValue}</td>
                                                    <td className="text-center">{item.executed
                                                        ? <i className="fa fa-check fa-1x" style={{ color: "green" }}></i>
                                                        : <i className="fa fa-times fa-1x" style={{ color: "red" }} />}
                                                    </td>
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


export default DeviceCommandsHistorySimple;