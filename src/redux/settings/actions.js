import types from './types';

export const updateSettingData = (data) => ({
    type: types.UPDATE_SETTING,
    payload: data
});