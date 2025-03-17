const ArrowForwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
)

export const Prompt = () => {
    return (
        <div className="flex items-center justify-between bg-secondary absolute z-50 bottom-2 w-[98%] mx-auto rounded-4xl text-black font-medium overflow-hidden">
            <input type="text" className="w-[95%] outline-none py-5 px-8 bg-inherit"/>
            <div className="bg-[#d0eb85] h-[4em] w-[5%] flex items-center justify-center absolute right-0 hover:cursor-pointer">
                <ArrowForwardIcon />
            </div>
        </div>
    )
}