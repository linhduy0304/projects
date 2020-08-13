//Login
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
//Logout
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAIL = "LOGOUT_USER_FAIL";

export const UPDATE_USER = "UPDATE_USER";

//Login
export const loginUser = (access_token, provider) => {
    return {
        type: LOGIN_USER,
        access_token,
        provider
    }
}

export const loginUserSuccess = (user) => {
    return {
        type: LOGIN_SUCCESS,
        user,
    }
}

export const loginUserFail = (error) => {
    return {
        type: LOGIN_FAIL,
        error,
    }
}

//Logout
export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}

export const logoutUserSuccess = () => {
    return {
        type: LOGOUT_USER_SUCCESS,
    }
}

export const logoutUserFail = (error) => {
    return {
        type: LOGOUT_USER_FAIL,
        error,
    }
}

export const updateUser = user => {
    return {
        type: UPDATE_USER,
        user
    }
}