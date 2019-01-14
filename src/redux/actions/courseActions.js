import * as types from './actionTypes'
import courseApi from '../../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'


//ACTIONS

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}


//THUNKS.. thunk is async functions that return action   
export function loadCourses() {
    return function (dispatch) {// this wrapper function in important
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses()
            .then(courses => dispatch(loadCoursesSuccess(courses)))
            .catch(error => {
                dispatch(ajaxCallError());
                throw (error);
            });
    };
}

export function saveCourse(course) {
    return function (dispatch, getState) { // with getState you can access redux store directly
        dispatch(beginAjaxCall());
        return courseApi.saveCourse(course)
            .then(course => {
                course.id ?
                    dispatch(updateCourseSuccess(course)) :
                    dispatch(createCourseSuccess(course));
            })
            .catch(error => {
                dispatch(ajaxCallError())
                throw (error);
            });
    };
}