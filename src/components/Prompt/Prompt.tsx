"use client";

import { GetGeminiResponse } from "@/redux/actions/AIActions";
import { AIActions } from "@/redux/reducers/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ArrowForwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
)

export const Prompt = () => {
    const dispatch = useDispatch();
    const [prompt, setPrompt] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-expect-error dispatch is not a function
        dispatch(GetGeminiResponse(prompt))
        .then((blocks) => {
            console.log(blocks)
            dispatch(AIActions.updateHistory(blocks))
        })
        .catch((e) => {
            console.error(e)
        });
    }

    return (
        <form 
            className="flex items-center justify-between bg-secondary absolute z-50 bottom-2 w-[98%] mx-auto rounded-4xl text-black font-medium overflow-hidden"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                className="w-[95%] outline-none py-5 px-8 bg-inherit"
                placeholder="Design an architecture for a chatbot application"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button 
                type="submit"
                className="bg-[#d0eb85] h-[4em] w-[5%] flex items-center justify-center absolute right-0 hover:cursor-pointer"
            >
                <ArrowForwardIcon />
            </button>
        </form>
    )
}