import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList.jsx';

class CoursesPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    redirectToAddCoursePage() {
        this.props.history.push('/course');
    }


    render() {
        const { courses } = this.props;
        return (
            <div className="row" style={{ marginTop: "30px" }}>
                <div className="col-md-8 offset-md-2">

                    <h1> Courses here</h1>
                    <br />
                    <input type="submit"
                        value="Add Course"
                        className="btn btn-primary"
                        onClick={this.redirectToAddCoursePage}
                    />
                    <br />
                    <br />
                    <CourseList courses={courses} />
                    <div>
                        {
                            this.props.devices.map((item, index) => {
                                return <div key={item._id}> {item.name}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
}

const mapStateToProps = (state, ownProps) => (
    {
        courses: state.courses,
        devices: state.devices
        //history: ownProps.history
    }
);

function mapDispatchToProps(dispatch) {
    return {
        //createCourse : (course) => dispatch(courseActions.createCourse(course)) //this is for only one.. below for all creators
        actions: bindActionCreators(courseActions, dispatch)
    }
};

// if mapDispatchToProps is ommited below, than in the component above this.props.dispatch can be used...
let CoursePageContainer = connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
export default withRouter(CoursePageContainer); // withRouter is used for the history object to be passed