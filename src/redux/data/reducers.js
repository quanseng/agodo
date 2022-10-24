import { console_log } from '../../utils/Misc';
import types from './types';

const rawState = {
  pageData: {},
}

export default function dataReducer(state = rawState, action) {
  switch (action.type) {
    case types.SET_PAGE_DATA:
      return {
        ...state,
        pageData: { ...state.pageData, ...action.payload }
      }
    default:
      return state;
  }
}