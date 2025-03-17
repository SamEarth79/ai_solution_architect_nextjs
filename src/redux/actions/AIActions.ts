import { AppDispatch, RootState } from "../store";

export const GetGeminiResponse = (prompt: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try{
        console.log(prompt);
        const res = await fetch(`/api/GetGeminiResponse?prompt=${prompt}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        const blocks = JSON.parse(data.blocks);
        return Promise.resolve(blocks);
    }
    catch(e){
        console.error(e)
        return Promise.reject();
    }
    finally{
    }
}