"use client";
import { ExcalidrawWrapper } from "@/components/ExcalidrawWrapper/ExcalidrawWrapper";
import { Prompt } from "@/components/Prompt/Prompt";
import { SideBar } from "@/components/Sidebar/Sidebar";

export default function Home() {
    return (
        <div className="">
            {/* <Script id="load-env-variables" strategy="beforeInteractive">
                {`window["EXCALIDRAW_ASSET_PATH"] = /;`}
            </Script> */}
            <div className="flex flex-col h-screen w-[70%] pt-4 relative items-center">
                <ExcalidrawWrapper />
                <Prompt />
            </div>
            <SideBar />
        </div>
    );
}
