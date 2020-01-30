import React from "react";

class CustomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { card, header, body, footer } = this.props;

    return (
      <>
        <div
          className={`card custom-bootstrap-card 
            ${card && card.className ? card.className : ""}`}
          style={card && card.style ? { ...card.style } : { ...{} }}
          onClick={card && card.onClick ? card.onClick : () => {}}
        >
          {header ? (
            <div
              className={`card-header 
                ${header.className ? header.className : ""}`}
              style={header.style ? { ...header.style } : { ...{} }}
            >
              {header.elements}
            </div>
          ) : null}
          {body ? (
            <div
              className={`card-body 
                ${body.className ? body.className : ""}`}
              style={body.style ? { ...body.style } : { ...{} }}
            >
              {body.elements}
            </div>
          ) : null}
          {footer ? (
            <div
              className={`card-footer 
                ${footer.className ? footer.className : ""}`}
              style={footer.style ? { ...footer.style } : { ...{} }}
            >
              {footer.elements}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default CustomCard;
