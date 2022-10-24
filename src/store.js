import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

import authReducer from './redux/auth/reducers';
import settingsReducer from './redux/settings/reducers';
import dataReducer from './redux/data/reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'settings']
}

const rootReducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  data: dataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(
    // createLogger()
  )
);