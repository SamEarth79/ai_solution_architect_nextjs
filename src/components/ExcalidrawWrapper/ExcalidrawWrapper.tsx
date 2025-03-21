"use client";
import { CaptureUpdateAction, Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";
import "@excalidraw/excalidraw/index.css";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { useSelector } from "react-redux";
import { LogoIcon } from "../Header/Header";
import { RootState } from "@/redux/store";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

export const ExcalidrawWrapper: React.FC = () => {
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI>();
	const history = useSelector((state: RootState) => state.ai.history);
	const blocks = history?.[history?.length - 1] || null;

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
		if(!blocks){
			return;
		}

		const ProcessBlocks = (blocks: any) => {

			const blockRectangles = [];
			const layerRectangles = [];
			const layerWidths = [0, 0, 0, 0];
			const layerRectanglePadding = 20;
			const blockHeight = 61.9765625;
			const layerInfo = [
				{
					layer: 0,
					name: "Presentation Layer (Frontend, Users)",
					height: 100,
					color: "#e0944c",
					blocksPresent: false,
				},
				{
					layer: 1,
					name: "Application Layer (Backend & Business Logic)",
					height: 250,
					color: "blue",
					blocksPresent: false,
				},
				{
					layer: 2,
					name: "Data Layer (Storage & Databases)",
					height: 400,
					color: "green",
					blocksPresent: false,
				},
				{
					layer: 3,
					name: "Infrastructure Layer (Deployment & Monitoring)",
					height: 550,
					color: "purple",
					blocksPresent: false,
				}
			]
			const layerNameOffset = 26;
			console.log(blocks);
			blocks?.blocks?.forEach((block) => {
				const layer = block.layer;
				layerInfo[layer].blocksPresent = true;
				const x = layerWidths[layer];
				const y = layerInfo[layer].height;
				const width = (block.block_name?.length || 0) * 8 + 40;
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
				if (!layerInfo[index].blocksPresent) {
					return;
				}
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
			return [...layerRectangles, ...blockRectangles];
		}
		
		const elements = ProcessBlocks(blocks);
		const sceneData = {
			elements: convertToExcalidrawElements(elements),
			captureUpdate: CaptureUpdateAction.IMMEDIATELY,
		};
		excalidrawAPI?.updateScene(sceneData);
	}, [excalidrawAPI, blocks]);


    return (
        <div style={{ height: `${dimensions.height}px`, width: `${dimensions.width}px`}} className="custom-styles">
			<Excalidraw 
				theme="dark"
				name="AI Solution Architect"
				langCode="en"
				excalidrawAPI={(api)=>setExcalidrawAPI(api)}
				UIOptions={{
					canvasActions: {
						toggleTheme: true,
					}
				}}
				// initialData={{
				// 	elements: initalElements,
				// 	scrollToContent: true,
				// 	appState: {
				// 		zenModeEnabled: true,
				// 		viewBackgroundColor: "#f4f4f4",
				// 	}
				// }}
			>
				<WelcomeScreen>
					<WelcomeScreen.Center>
						<LogoIcon size="large"/>
						<WelcomeScreen.Center.Heading>
							<div className="">
								<h1 className="cursive text-5xl ">AI Solution Architect</h1>
								<h2 className="text-xl my-2">Start with a prompt below...</h2>
							</div>
						</WelcomeScreen.Center.Heading>
						{/* <WelcomeScreen.Center.Menu>
							<WelcomeScreen.Center.MenuItemLink href="https://github.com/excalidraw/excalidraw">
								Excalidraw GitHub
							</WelcomeScreen.Center.MenuItemLink>
						</WelcomeScreen.Center.Menu> */}
					</WelcomeScreen.Center>
				</WelcomeScreen>
			</Excalidraw>
        </div>
    );
};