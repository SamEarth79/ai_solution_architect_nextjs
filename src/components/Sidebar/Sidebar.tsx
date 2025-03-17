import { Drawer } from "@mui/material";
import { Header } from "../Header/Header";

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
            </div>
        </Drawer>
    );
};
