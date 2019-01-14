import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions.js';
import CourseForm from './CourseForm.jsx';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  //lifecycle method which is called when the component's props get changed
  componentWillReceiveProps(nextProps) {
    debugger
    // necessary to populate from when existing course is loaded directly
    if (this.props.course.id != nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    return this.setState({ course: course });
  }

  saveCourse(event) {
    event.preventDefault();
    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success('Course saved');
    this.props.history.push('/courses');
  }

  render() {
    return (
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-8 offset-md-2">
          <CourseForm
            allAuthors={this.props.authors}
            onChange={this.updateCourseState}
            onSave={this.saveCourse}
            course={this.state.course}
            errors={this.state.errors}
            saving={this.state.saving}
          />
        </div>
      </div>

    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  //errors: PropTypes.object,
};


const getCourseById = (courses, id) => {
  const course = courses.filter(course => course.id === id);
  if (course.length) return course[0];
  return null;
};

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  const courseId = ownProps.match.params.id; // from the path '/course/:id'

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
};

var ManagedCoursePageContainer = connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
export default withRouter(ManagedCoursePageContainer);