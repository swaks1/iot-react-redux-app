import React from 'react';

import { SimpleMarkerStyle } from '../../assets/js-css/SimpleMarkerStyle';

 const SimpleMarker = ({ text }) => {
    return (
        <div style={SimpleMarkerStyle}>
            {text}
        </div>
    );
}

export default SimpleMarker