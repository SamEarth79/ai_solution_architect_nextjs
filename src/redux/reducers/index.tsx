import { combineReducers } from '@reduxjs/toolkit';
import { AIReducer } from './ai';

const rootReducer = combineReducers({
    ai: AIReducer,
});

export default rootReducer;
