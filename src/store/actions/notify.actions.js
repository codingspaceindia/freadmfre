import {
    REMOVE_FAILURE,
    REMOVE_SUCCESS,
    SET_FAILURE,
    SET_SUCCESS,
} from "../reducers/notify.reducer";

export const setFailure = (message) => (dispatch) =>
    dispatch(SET_FAILURE(message));

export const removeFailure = () => (dispatch) => dispatch(REMOVE_FAILURE());

export const setSuccess = (message) => (dispatch) =>
    dispatch(SET_SUCCESS(message));

export const removeSuccess = () => (dispatch) => dispatch(REMOVE_SUCCESS());
