import { AppDispatch } from "../store";
import { HideLoader, ShowActionLoader, ShowLoader } from "./GeneralActions";

export const GetGeminiResponse = (prompt: string) => async (dispatch: AppDispatch) => {
    try{
        dispatch(ShowLoader("Generating Architecture..."));
        const res = await fetch(`/api/GetGeminiResponse?prompt=${prompt}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        const blocks = JSON.parse(data.blocks);
        if(!blocks || Object.keys(blocks).length === 0){
            dispatch(ShowActionLoader("Couldn't generate architecture, please be more specific"));
            return Promise.reject();
        }
        return Promise.resolve(blocks);
    }
    catch(e){
        console.error(e)
        dispatch(ShowActionLoader("Couldn't generate architecture, please be more specific"));
        return Promise.reject();
    }
    finally{
        dispatch(HideLoader());
    }
}