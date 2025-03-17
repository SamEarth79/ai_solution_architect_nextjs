"use client";
import { ExcalidrawWrapper } from "@/components/ExcalidrawWrapper/ExcalidrawWrapper";
import { SideBar } from "@/components/Sidebar/Sidebar";

export default function Home() {
    return (
        <div className="">
            {/* <Script id="load-env-variables" strategy="beforeInteractive">
                {`window["EXCALIDRAW_ASSET_PATH"] = /;`}
            </Script> */}
            <div className="flex flex-col h-screen justify-center">
                <ExcalidrawWrapper />
            </div>
            <SideBar />
        </div>
    );
}
