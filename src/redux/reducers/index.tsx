import { combineReducers } from '@reduxjs/toolkit';
import { AIReducer } from './ai';
import { GeneralReducer } from './general';

const rootReducer = combineReducers({
    ai: AIReducer,
    general: GeneralReducer,
});

export default rootReducer;
