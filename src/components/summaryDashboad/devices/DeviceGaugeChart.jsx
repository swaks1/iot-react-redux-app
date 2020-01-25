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
    const { minValue, maxValue, currentValue, title, selected } = this.props;

    let chartOptions = GaugeChartHelper.getOptions(
      minValue,
      maxValue,
      currentValue,
      title
    );
    return (
      <div
        className={`card custom-bootstrap-card custom-gauge-card 
                    ${selected ? "border-info" : ""}`}
      >
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    );
  }
}

export default DeviceGaugeChart;
