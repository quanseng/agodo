import types from './types';

const rawState = {
    signed: false,
    user: {},
}

export default function authReducer(state = rawState, action) {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: {...state.user, ...action.payload }
            };
        case types.SIGN_IN:
            return {
                ...state,
                signed: true,
                user: action.payload,
            }
        case types.SIGN_UP:
            return {
                ...state,
                signed: true,
                user: action.payload,
            }
        case types.SIGN_OUT:
            return {
                ...state,
                signed: false,
                user: rawState.user,
            }
        default:
            return state;
    }
}