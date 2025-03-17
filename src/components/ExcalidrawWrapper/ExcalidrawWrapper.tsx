"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import "@excalidraw/excalidraw/index.css";

export const ExcalidrawWrapper: React.FC = () => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
		const width = window.innerWidth * 0.7;
		const height = window.innerHeight * 0.9;
		setDimensions({ width, height });
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => {
		window.removeEventListener('resize', updateDimensions);
		};
	}, []);

    return (
        <div style={{ height: `${dimensions.height}px`, width: `${dimensions.width}px`}} className="custom-styles">
            <Excalidraw 
                
            />
        </div>
    );
};