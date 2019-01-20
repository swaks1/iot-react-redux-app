import React from 'react';

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const DeviceCommandsHistory = ({ lg, md, sm, commands }) => {
    return (
        <>
            <Col lg md sm>
                <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <h4>Device Commands History</h4>
                    {
                        commands.map((item, index) => {
                            return <h3 key={item._id}>{item.created}</h3>
                        })
                    }
                </Card>
            </Col>

        </>
    );
};


export default DeviceCommandsHistory;