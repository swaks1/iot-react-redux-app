import React from "react";
import Highcharts from "highcharts/highcharts.js";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";

import { GaugeChartHelper } from "../../../utils/chartHelper";
highchartsMore(Highcharts);
solidGauge(Highcharts);

class DeviceGaugeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { deviceId, minValue, maxValue, currentValue, deviceName, selected, onChangeDevice } = this.props;

    let chartOptions = GaugeChartHelper.getOptions(minValue, maxValue, currentValue, deviceName);
    return (
      <div
        className={`card custom-bootstrap-card custom-gauge-card 
                    ${selected ? "border-info" : ""}`}
        onClick={() => onChangeDevice(deviceId)}
      >
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    );
  }
}

export default DeviceGaugeChart;
