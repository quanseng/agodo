import types from './types';

export const updateSettingData = (data) => ({
    type: types.UPDATE_SETTING,
    payload: data
});
export const clearSettingData = (data) => ({
    type: types.CLEAR_SETTING,
    payload: data
});