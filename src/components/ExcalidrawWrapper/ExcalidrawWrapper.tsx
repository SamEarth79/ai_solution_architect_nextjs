"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import "@excalidraw/excalidraw/index.css";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";

export const ExcalidrawWrapper: React.FC = () => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [initalElements, setInitialElements] = useState();
	const [excalidrawAPI, setExcalidrawAPI] = useState();
	const blocks = { "blocks": [
		{
		  "block_id": 1,
		  "block_name": "Clients (Mobile/Web)",
		  "block_type": 0,
		  "layer": 0
		},
		{
		  "block_id": 2,
		  "block_name": "Load Balancer",
		  "block_type": 7,
		  "connected_blocks": [1],
		  "layer": 1
		},
		{
		  "block_id": 3,
		  "block_name": "API Gateway",
		  "block_type": 8,
		  "connected_blocks": [2],
		  "layer": 1
		},
		{
		  "block_id": 4,
		  "block_name": "Authentication Service",
		  "block_type": 2,
		  "connected_blocks": [3],
		  "layer": 1
		},
		{
		  "block_id": 5,
		  "block_name": "Messaging Service",
		  "block_type": 2,
		  "connected_blocks": [3],
		  "layer": 1
		},
		{
		  "block_id": 6,
		  "block_name": "User Database",
		  "block_type": 3,
		  "connected_blocks": [4],
		  "layer": 2
		},
		{
		  "block_id": 7,
		  "block_name": "Message Database",
		  "block_type": 4,
		  "connected_blocks": [5],
		  "layer": 2
		},
		{
		  "block_id": 8,
		  "block_name": "Message Queue",
		  "block_type": 10,
		  "connected_blocks": [5],
		  "layer": 1
		},
		{
		  "block_id": 9,
		  "block_name": "Monitoring & Logging",
		  "block_type": 9,
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
		const processedElements = [];
		const blockRectangles=[];
		const layerRectangles = [];
		const layerWidths = [0, 0, 0, 0];
		const layerRectanglePadding = 20;
		const blockHeight = 61.9765625;
		const layerInfo = [
			{
				layer: 0,
				name: "Presentation Layer (Frontend, Users)",
				height: 100,
				color: "orange"
			},
			{
				layer: 1,
				name: "Application Layer (Backend & Business Logic)",
				height: 250,
				color: "blue"
			},
			{
				layer: 2,
				name: "Data Layer (Storage & Databases)",
				height: 400,
				color: "green",
			},
			{
				layer: 3,
				name: "Infrastructure Layer (Deployment & Monitoring)",
				height: 550,
				color: "purple",
			}
		]
		const layerNameOffset = 26;
		blocks.blocks.forEach((block) => {
			const layer = block.layer;
			const x = layerWidths[layer];
			const y = layerInfo[layer].height;
			const width = block.block_name.length * 8 + 40;
			const blockName = block.block_name;
			const processedElement = [
				{
				  type: "rectangle",
				  id: `${block.block_id}_block`,
				  x: x,
				  y: y,
				  width: width,
				  height: blockHeight,
				  version: 141,
				  backgroundColor: "transparent",
				  fillStyle: "solid",
				  roundness: {
					type: 3,
				  },
				  label: {
					text: blockName,
					fontSize: 16,
				  },
				},
			  ];
			layerWidths[layer] += width + 20;
			blockRectangles.push(...processedElement);
		})
		layerWidths.forEach((width, index) => {
			const layerRectangle =  [
				{
					type: "rectangle",
					x: 0 - layerRectanglePadding,
					y: layerInfo[index].height - layerRectanglePadding - layerNameOffset,
					width: width + layerRectanglePadding * 2,
					height: blockHeight + layerRectanglePadding * 2 + layerNameOffset,
					strokeStyle: "dotted",
					strokeColor: layerInfo[index].color,
					label: {
						text: layerInfo[index].name,
						fontSize: 14,
						textAlign: "left",
						verticalAlign: "top",
					}
				}
			]
			layerRectangles.push(...layerRectangle);
		})
		const blockArrows = [];
		// blocks.blocks.forEach((block) => {
		// 	const connectedBlocks = block.connected_blocks;
		// 	connectedBlocks?.forEach((connectedBlock) => {
		// 		const startBlockInfo = blockRectangles.find((b) => b.id === `${block.block_id}_block`);
		// 		const endBlockInfo = blockRectangles.find((b) => b.id === `${connectedBlock}_block`);
		// 		const endBlock = blocks.blocks.find((b) => b.block_id === connectedBlock);
		// 		const arrow = [
		// 			{
		// 			  type: "arrow",
		// 			  x: startBlockInfo.x,
		// 			  y: startBlockInfo.y,
		// 			//   label: {
		// 			// 	text: "HELLO WORLD!!",
		// 			//   },
		// 			  start: {
		// 				id: `${block.block_id}_block`,
		// 			  },
		// 			  end: {
		// 				id: `${endBlock?.block_id}_block`,
		// 				x: endBlockInfo.x,
		// 				y: endBlockInfo.y,
		// 			  },
		// 			},
		// 		  ];
		// 		blockArrows.push(...arrow);
		// 	})
		// })
		console.log('====================================');
		console.log([...layerRectangles, ...blockRectangles, ...blockArrows]);
		console.log('====================================');
		setInitialElements(convertToExcalidrawElements([...layerRectangles, ...blockRectangles, ...blockArrows]));
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