import types from './types';

export const setPageData = (data) => ({
    type: types.SET_PAGE_DATA,
    payload: data
});

 