import React from 'react';

import { Card, Col } from 'reactstrap';
import GoogleMapReact from 'google-map-react';
import Loader from 'react-loader-spinner';
import SimpleMarker from '../_common/SimpleMarker'

const DeviceLocationMap = ({ lg, md, sm, device, deviceLoading }) => {

    let lat = 41.996;
    let lng = 21.431;

    try {
        let latFloat = parseFloat(device.location.lat);
        let lngFloat = parseFloat(device.location.lng);

        lat = latFloat;
        lng = lngFloat;
    } catch (error) {
        console.log(error);
    }

    let locationCenter = {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: 11
    };


    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                <Card style={{ backgroundColor: "#f7f6f6", padding: "10px 15px" }}>
                <h4 className="text-center font-italic font-weight-light">Device Location</h4>
                    {
                        deviceLoading === true
                            ?
                            <div className="text-center">
                                <Loader
                                    type="Puff"
                                    color="#00BFFF"
                                    height="100"
                                    width="100"
                                />
                            </div>
                            :
                            <div style={{ height: '40vh', width: '100%' }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: '' }}
                                    defaultCenter={locationCenter.center}
                                    defaultZoom={locationCenter.zoom}
                                    options={() => ({
                                        panControl: false,
                                        mapTypeControl: false,
                                        scrollwheel: false,
                                    })}
                                >
                                    <SimpleMarker
                                        lat={device.location.lat}
                                        lng={device.location.lng}
                                        text={device.name}
                                    />
                                </GoogleMapReact>
                            </div>
                    }
                </Card>
            </Col>


        </>
    );
};


export default DeviceLocationMap;