import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/config';

const initialState = {
    loading: false,
    user: null,
    error: null,
}

const SESSION_LOADING = "SESSION_LOADING";
const SESSION_ERROR = "SESSION_ERROR";
const SESSION_SUCCESS = "SESSION_SUCCESS";
const SESSION_LOGOUT = "SESSION_LOGOUT";
const SESSION_RESTORING = "SESSION_RESTORING";

const session = (state = initialState, action) => {
    switch (action.type) {
        case SESSION_LOADING:
            return { ...state, loading: true }
        case SESSION_ERROR:
            return { loading: false, error: true, user: null }
        case SESSION_SUCCESS:
            return { loading: false, user: action.user, error: null }
        case SESSION_LOGOUT:
            return { loading: false, error: null, user: null }
        case SESSION_RESTORING:
            return { ...state }
    }
    return state;
}
export default session;

export const signupUser = (email, password) => {
    return (dispatch) => {

        dispatch(sessionLoading())
        fetch(`${api.URL}/signup`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(function (response) {

                const { token } = response.data;
                dispatch(sessionSuccess({ email, token }));
                saveToStorage(email, token);
            })
            .catch(function (error) {
                console.log(error);
                dispatch(sessionError(error));
            });
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(sessionLoading())
        dispatch(sessionLogout());
        resetStorage();
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        console.log(email, password)
        dispatch(sessionLoading())
        fetch(`${api.URL}/login`, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify({
                email,
                password
            })
        })
            .then((response) => response.json())
            .then(function (response) {
                const {token} = response;
                console.log("save to storage", token)
                saveToStorage(email, token);
                dispatch(sessionSuccess({ email, token }));
            })
            .catch(function (error) {
                console.log("butut", error);
                dispatch(sessionError(error));
            });
    }
}

export const restoreSession = () => {
    return async function (dispatch) {
        const credentials = await loadFromStorage();
        dispatch(sessionSuccess(credentials))
    }
}

async function saveToStorage(email, token, dispatch) {
    try {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("email", email);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

async function resetStorage() {
    try {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log("Error reseting data" + error);
    }
}

async function loadFromStorage() {
    try {
        const email = await AsyncStorage.getItem('email');
        const token = await AsyncStorage.getItem('token');
        return { token, email }
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

const sessionLoading = () => ({
    type: SESSION_LOADING
})

const sessionError = error => ({
    type: SESSION_ERROR,
    error
})

const sessionSuccess = user => ({
    type: SESSION_SUCCESS,
    user
})

const sessionLogout = () => ({
    type: SESSION_LOGOUT
})

const sessionRestoring = () => ({
    type: SESSION_RESTORING
})