import axios from 'axios';
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return  {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = ()  => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

checkAuthTimeOut = expirationTime =>{
    return dispatch => {
        setTimeOut(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http:127.0.0.1:8000/rest-auth/login/", {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date().getTime() + 3600
            localStorage.setItem('token': token);
            localStorage.setItem('expirationDate': expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        }).
        catch(error => {
            dispatch(authFail(error));
        })
    }
}


export const authSignup = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http:127.0.0.1:8000/rest-auth/registration/", {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date().getTime() + 3600
            localStorage.setItem('token': token);
            localStorage.setItem('expirationDate': expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        }).
        catch(error => {
            dispatch(authFail(error));
        })
    }
}