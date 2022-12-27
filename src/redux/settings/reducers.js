import { console_log } from '../../utils/Misc';
import types from './types';

const rawState = {
  location_enabled: false
}

export default function settingsReducer(state = rawState, action) {

  switch (action.type) {
    case types.UPDATE_SETTING:
      return {
        ...state,
        ...action.payload
      }
    case types.CLEAR_SETTING:
      return {
        ...rawState
      }
    default:
      return state;
  }
}
