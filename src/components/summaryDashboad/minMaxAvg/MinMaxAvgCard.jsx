import React from "react";

class MinMaxAvgCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, faIcon, minDevice, maxDevice, avg, selected } = this.props;

    return (
      <>
        <div
          className={`card custom-bootstrap-card custom-list-group-card 
                     ${selected ? "border-info" : ""}`}
        >
          <div className="card-header text-center clickable-header">
            <span>{title}</span> <i className={`fa fa-${faIcon}`}></i>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="row">
                <div className="col col-md-2 text-center">
                  <sup>min</sup>
                </div>
                <div className="col col-md-7 text-center">
                  <div className="device-name">{minDevice.name}</div>
                  <div className="device-date text-muted">{minDevice.date}</div>
                </div>
                <div className="col col-md-3 text-center">
                  <span className="device-value">{minDevice.value}</span>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col col-md-2 text-center">
                  <sup>max</sup>
                </div>
                <div className="col col-md-7 text-center">
                  <div className="device-name">{maxDevice.name}</div>
                  <div className="device-date text-muted">{maxDevice.date}</div>
                </div>
                <div className="col col-md-3 text-center">
                  <span className="device-value">{maxDevice.value}</span>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="row">
                <div className="col col-md-2 text-center">
                  <sup>avg</sup>
                </div>
                <div className="col col-md-3 offset-md-7 text-center">
                  <span className="device-value">{avg}</span>
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
