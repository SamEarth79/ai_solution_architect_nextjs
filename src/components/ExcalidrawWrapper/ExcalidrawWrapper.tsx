"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import "@excalidraw/excalidraw/index.css";

export const ExcalidrawWrapper: React.FC = () => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [initalElements, setInitialElements] = useState();
	const [excalidrawAPI, setExcalidrawAPI] = useState();
	const blocks = {
		"blocks": [
		  {
			"block_id": 1,
			"block_info_link": "https://developer.apple.com/ios/",
			"block_name": "iOS Client",
			"block_type": 0,
			"connected_blocks": [7],
			"layer": 2
		  },
		  {
			"block_id": 2,
			"block_info_link": "https://developer.android.com/",
			"block_name": "Android Client",
			"block_type": 0,
			"connected_blocks": [7],
			"layer": 2
		  },
		  {
			"block_id": 3,
			"block_info_link": "https://www.example.com/webclient",
			"block_name": "Web Client",
			"block_type": 1,
			"connected_blocks": [7],
			"layer": 2
		  },
		  {
			"block_id": 4,
			"block_info_link": "https://firebase.google.com/docs/auth",
			"block_name": "Authentication Service",
			"block_type": 6,
			"connected_blocks": [1, 2, 3, 7],
			"layer": 3
		  },
		  {
			"block_id": 5,
			"block_info_link": "https://www.example.com/userservice",
			"block_name": "User Service",
			"block_type": 2,
			"connected_blocks": [7, 6],
			"layer": 3
		  },
		  {
			"block_id": 6,
			"block_info_link": "https://www.postgresql.org/",
			"block_name": "User Database",
			"block_type": 3,
			"connected_blocks": [5],
			"layer": 4
		  },
		  {
			"block_id": 7,
			"block_info_link": "https://www.example.com/messageservice",
			"block_name": "Message Service",
			"block_type": 2,
			"connected_blocks": [1, 2, 3, 4, 5, 8, 9],
			"layer": 3
		  },
		  {
			"block_id": 8,
			"block_info_link": "https://www.mongodb.com/",
			"block_name": "Message Database",
			"block_type": 4,
			"connected_blocks": [7],
			"layer": 4
		  },
		  {
			"block_id": 9,
			"block_info_link": "https://www.rabbitmq.com/",
			"block_name": "Message Queue",
			"block_type": 10,
			"connected_blocks": [7],
			"layer": 3
		  }
		]
	  }
	  

	useEffect(() => {
		const updateDimensions = () => {
		const width = window.innerWidth * 0.7;
		const height = window.innerHeight * 1;
		setDimensions({ width, height });
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => {
		window.removeEventListener('resize', updateDimensions);
		};
	}, []);

	useEffect(() => {
		const processedElements = []
		const layerWidths = [0, 0, 0, 0, 0];
		const layerHeights = {
			1: 0,
			2: 120,
			3: 240,
			4: 360,
			5: 480,
		}
		blocks.blocks.forEach((block) => {
			const layer = block.layer;
			const x = layerWidths[layer-1];
			const y = layerHeights[layer];
			const processedElement = {
				type: "rectangle",
				id: `block-${block.block_id}`,
				x: x,
				y: y,
				width: 106.47265625,
				height: 61.9765625,
				version: 141,
				roundness: {
					type: 3,
				},
			}
			layerWidths[layer-1] += 120;
			processedElements.push(processedElement);
			processedElements.push(processedElementText);
		})
		console.log(processedElements);
		setInitialElements(processedElements);
		// excalidrawAPI?.updateScene({
		// 	elements: processedElements,
		// })
	}, [excalidrawAPI]);


    return (
        <div style={{ height: `${dimensions.height}px`, width: `${dimensions.width}px`}} className="custom-styles">
			<Excalidraw 
				theme="light"
				name="AI Solution Architect"
				langCode="en"
				excalidrawAPI={(api)=>setExcalidrawAPI(api)}
				UIOptions={{
					canvasActions: {
						toggleTheme: true,
					}
				}}
				initialData={{
					elements: initalElements,
					scrollToContent: true,
					appState: {
						zenModeEnabled: true,
						viewBackgroundColor: "#f4f4f4",
					}
				}}
			/>
        </div>
    );
};