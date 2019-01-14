import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {

        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        case types.CREATE_COURSE_SUCCESS:
            const newState = [
                ...state,
                Object.assign({}, action.course)
            ];
            return newState;

        case types.UPDATE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id), //first filters than spreads
                Object.assign({}, action.course)
            ];

        default:
            return state;
    }
}
