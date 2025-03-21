import { GeneralActions } from "../reducers/general";
import { AppDispatch } from "../store";

export const ShowLoader = (text="Loading...") => async (dispatch: AppDispatch) => {
    try{
        console.log(prompt);
        dispatch(GeneralActions.showLoader(text));
        return Promise.resolve();
    }
    catch(e){
        console.error(e)
        return Promise.reject();
    }
}

export const HideLoader = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(GeneralActions.hideLoader());
        return Promise.resolve();
    }
    catch(e){
        console.error(e)
        return Promise.reject();
    }
}

export const ShowActionLoader = (text="Loading...") => async (dispatch: AppDispatch) => {
    try{
        dispatch(GeneralActions.showActionLoader(text));
        return Promise.resolve();
    }
    catch(e){
        console.error(e)
        return Promise.reject();
    }
}

export const HideActionLoader = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(GeneralActions.hideActionLoader());
        return Promise.resolve();
    }
    catch(e){
        console.error(e)
        return Promise.reject();
    }
}