import React from 'react';
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';

const Header = ({ loading }) => {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
      {" | "}
      <NavLink to="/about">About</NavLink>
      {" | "}
      <NavLink to="/courses">Courses</NavLink>
      {" | "}
      {loading && <LoadingDots interval={100} dots={20} />}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
}


export default Header;