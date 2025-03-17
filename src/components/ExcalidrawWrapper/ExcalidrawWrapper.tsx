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
				"block_info_link": "https://en.wikipedia.org/wiki/Web_application",
				"block_name": "Web Browser",
				"block_type": 0,
				"connected_blocks": [
					2
				]
			},
			{
				"block_id": 2,
				"block_info_link": "https://en.wikipedia.org/wiki/Load_balancing_(computing)",
				"block_name": "Load Balancer",
				"block_type": 7,
				"connected_blocks": [
					1,
					3,
					4
				]
			},
			{
				"block_id": 3,
				"block_info_link": "https://reactjs.org/",
				"block_name": "Frontend (React)",
				"block_type": 1,
				"connected_blocks": [
					2,
					5
				]
			},
			{
				"block_id": 4,
				"block_info_link": "https://nodejs.org/en/",
				"block_name": "Backend (Node.js)",
				"block_type": 2,
				"connected_blocks": [
					2,
					5,
					6,
					8,
					9,
					10
				]
			},
			{
				"block_id": 5,
				"block_info_link": "https://en.wikipedia.org/wiki/API_gateway",
				"block_name": "API Gateway",
				"block_type": 8,
				"connected_blocks": [
					3,
					4,
					6,
					10
				]
			},
			{
				"block_id": 6,
				"block_info_link": "https://auth0.com/",
				"block_name": "Authentication & Authorization (Auth0)",
				"block_type": 6,
				"connected_blocks": [
					4,
					5
				]
			},
			{
				"block_id": 7,
				"block_info_link": "https://www.postgresql.org/",
				"block_name": "Database (PostgreSQL)",
				"block_type": 3,
				"connected_blocks": [
					8
				]
			},
			{
				"block_id": 8,
				"block_info_link": "https://redis.io/",
				"block_name": "Message Queue (Redis-Pub/Sub)",
				"block_type": 10,
				"connected_blocks": [
					4,
					7,
					9
				]
			},
			{
				"block_id": 9,
				"block_info_link": "https://prometheus.io/",
				"block_name": "Logging & Monitoring (Prometheus/Grafana)",
				"block_type": 9,
				"connected_blocks": [
					4,
					8
				]
			},
			{
				"block_id": 10,
				"block_info_link": "https://www.cloudamqp.com/",
				"block_name": "Rate Limiter",
				"block_type": 13,
				"connected_blocks": [
					4,
					5
				]
			}
		]
	};

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
		const processedElements = blocks.blocks.map((block) => {
			return {
				type: "rectangle",
				version: 141,
				versionNonce: 361174001,
				isDeleted: false,
				id: `block-${block.block_id}`,
				strokeWidth: 1,
				fillStyle: "hachure",
				strokeStyle: "solid",
				roughness: 1,
				roundness: {
					type: 3,
				},
				opacity: 100,
				angle: 0,
				x: 100.50390625,
				y: 93.67578125,
				strokeColor: "#000000",
				backgroundColor: "transparent",
				width: 186.47265625,
				height: 141.9765625,
				seed: 1968410350,
				groupIds: [],
			}
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

// {
	// 	type: "rectangle",
	// 	version: 141,
	// 	versionNonce: 361174001,
	// 	isDeleted: false,
	// 	id: "oDVXy8D6rom3H1-LLH2-f",
	// 	strokeWidth: 1,
	// 	fillStyle: "hachure",
	// 	strokeStyle: "solid",
	// 	roughness: 1,
	// 	roundness: {
	// 	  type: 3,
	// 	},
	// 	opacity: 100,
	// 	angle: 0,
	// 	x: 100.50390625,
	// 	y: 93.67578125,
	// 	strokeColor: "#000000",
	// 	backgroundColor: "transparent",
	// 	width: 186.47265625,
	// 	height: 141.9765625,
	// 	seed: 1968410350,
	// 	groupIds: [],
//   },