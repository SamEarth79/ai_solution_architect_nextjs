import { Drawer } from "@mui/material";
import { Header } from "../Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
)

const History = () => {
    const history = useSelector((state: RootState) => state.ai.history);
    const latestHistory = history?.[history?.length - 1] || null;
    if(!latestHistory){
        return null;
    }
    console.log(latestHistory);
    

    return (
        <div className="text-white px-4 py-4">
            <div className="flex flex-col space-y-4">
                {latestHistory?.["blocks"]?.map((item: unknown, index:number) => (
                    <div key={index} className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-medium">{index+1}. {item?.block_name}</h2>
                            <Link 
                                href={item?.block_info_link}
                                target="_blank"
                                className="cursor-pointer"
                            >
                                <InfoIcon />
                            </Link>
                        </div>
                        <p>{item?.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const SideBar = () => {
    return (
        <Drawer
            open={true}
            onClose={() => {}}
            variant="persistent"
            anchor="right"
            sx={{
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 420,
                    height: "96vh",
                    top: "2vh",
                    bottom: "2vh",
                    backgroundColor: "#333333",
                    borderRadius: "12px",
                    boxShadow: "0px 1px 4px 4px #00000020",
                },
            }}
        >
            <div className="flex flex-col h-full relative">
				<Header />
                <History />
            </div>
        </Drawer>
    );
};
