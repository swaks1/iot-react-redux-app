import React from "react";

class MinMaxAvgCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, faIcon, minDevice, maxDevice, avg, selected, onChangeDataType, onChangeDevice } = this.props;

    return (
      <>
        <div
          className={`card custom-bootstrap-card custom-list-group-card 
                     ${selected ? "border-info" : ""}`}
          onClick={() => onChangeDataType(title)}
        >
          <div className="card-header text-center clickable-header">
            <span>{title}</span> <i className={`fa fa-${faIcon}`}></i>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" onClick={() => onChangeDevice(minDevice.id)}>
              <div className="row">
                <div className="col col-md-1 text-center">
                  <span className="minMaxAvg">MIN</span>
                </div>
                <div className="col col-md-7 text-center">
                  <div className="device-name">{minDevice.name}</div>
                  <div className="device-date text-muted">{minDevice.date && minDevice.date.substring(0, 10)}</div>
                  <div className="device-date text-muted">{minDevice.date && minDevice.date.substring(11, 19)}</div>
                </div>
                <div className="col col-md-4 text-center">
                  <span className="device-value">{minDevice.value.toFixed(2)}</span>
                </div>
              </div>
            </li>
            <li className="list-group-item" onClick={() => onChangeDevice(maxDevice.id)}>
              <div className="row">
                <div className="col col-md-1 text-center">
                  <span className="minMaxAvg">MAX</span>
                </div>
                <div className="col col-md-7 text-center">
                  <div className="device-name">{maxDevice.name}</div>
                  <div className="device-date text-muted">{maxDevice.date && maxDevice.date.substring(0, 10)}</div>
                  <div className="device-date text-muted">{maxDevice.date && maxDevice.date.substring(11, 19)}</div>
                </div>
                <div className="col col-md-4 text-center">
                  <span className="device-value">{maxDevice.value.toFixed(2)}</span>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col col-md-1 text-center">
                  <span className="minMaxAvg">AVG</span>
                </div>
                <div className="col col-md-4 offset-md-7 text-center">
                  <span className="device-value">{avg.toFixed(2)}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default MinMaxAvgCard;
