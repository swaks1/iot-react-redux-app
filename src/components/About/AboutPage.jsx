import React from 'react';
import { Link } from 'react-router-dom';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <p>About page!</p>
        <Link to="/" className="btn btn-primary btn-sm">Back to home</Link>
      </div>
    );
  }
}

export default AboutPage;