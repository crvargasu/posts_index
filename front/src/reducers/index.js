import { combineReducers } from '@reduxjs/toolkit';
import postReducer from './postSlice';

const rootReducer = combineReducers({
  posts: postReducer,
});

export default rootReducer;