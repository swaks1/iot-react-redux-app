import React from "react";
import { Table } from "reactstrap";

class TableWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <>
        <Table className="tablesorter" responsive {...this.props}>
          {" "}
          {this.props.children}
        </Table>
      </>
    );
  }
}

export default TableWrapper;
