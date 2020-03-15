import React from "react";
import { Table, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";

class TableWithPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }

  handlePaginationClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index
    });
  };

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { tableHeadColumns, data, mapFunction, pageSize } = this.props;
    const { currentPage } = this.state;
    let pagesCount = 1;
    if (data && data.length >= 0) {
      pagesCount = Math.ceil(data.length / pageSize);
    }

    return (
      <>
        <Table className={`tablesorter ${this.props.className}`} responsive>
          {tableHeadColumns && tableHeadColumns.length > 0 ? (
            <thead className="text-primary">
              <tr>{tableHeadColumns}</tr>
            </thead>
          ) : null}

          {data && data.length >= 0 ? (
            <tbody>{data.slice(currentPage * pageSize, (currentPage + 1) * pageSize).map(mapFunction)}</tbody>
          ) : null}
        </Table>
        <>
          <div className="pagination-wrapper">
            <Pagination>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink onClick={e => this.handlePaginationClick(e, currentPage - 1)} previous href="#" />
              </PaginationItem>

              {[...Array(pagesCount)].map((page, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={e => this.handlePaginationClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage >= pagesCount - 1}>
                <PaginationLink onClick={e => this.handlePaginationClick(e, currentPage + 1)} next href="#" />
              </PaginationItem>
            </Pagination>
          </div>
        </>
      </>
    );
  }
}

export default TableWithPagination;
