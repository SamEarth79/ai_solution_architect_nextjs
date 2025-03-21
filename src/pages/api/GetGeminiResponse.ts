import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { query } = req;
        const { prompt } = query;
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-pro-exp-02-05",
            systemInstruction: "Act as a Solution Architect, and respond by designing a solution architecture for the query. For every block of the architecture, provide the block name, block id, block info link (a link containing more information on the block), block type. I am going to use this information and build a 2D sketch of it so I will need to connect different blocks, so for each block mention the connected block ids. The 2D sketch will be top down based, that is place high-level components (e.g., client, frontend) at the top and lower-level components (e.g., database, storage) at the bottom, so for each block return the layer id using the following map. \nIn the end return all the steps to implement verbally in a strucutred manner under \"description\" key.\nPresentation Layer (Frontend, Users) - 0\nApplication Layer (Backend & Business Logic) - 1\nData Layer (Storage & Databases) - 2\nInfrastructure Layer (Deployment & Monitoring) - 3\n\nFor block type use the below map.\nUser Interface (UI) - 0  \nFrontend - 1  \nBackend - 2  \nRelational Database - 3  \nNon-Relational Database - 4  \nCache - 5  \nAuthentication & Authorization - 6  \nLoad Balancer - 7  \nAPI Gateway - 8  \nLogging & Monitoring - 9  \nMessaging Queue - 10  \nConfiguration Management - 11  \nService Discovery - 12  \nRate Limiter - 13  \nBlob Storage - 14  \nData Warehouse - 15  \nSearch Engine - 16  \nBackup & Recovery - 17  \nEncryption & Key Management - 18  \nFirewall & Security Gateway - 19  \nThreat Detection - 20  \nAuditing & Compliance - 21  \nCDN (Content Delivery Network) - 22  \nDNS - 23  \nProxy Server - 24  \nVPN & Private Network - 25  \nEdge Computing - 26  \nMachine Learning Model - 27  \nFeature Store - 28  \nETL (Extract, Transform, Load) - 29  \nData Streaming - 30  \nCI/CD Pipeline - 31  \nContainer Orchestration - 32  \nFunction-as-a-Service (FaaS) - 33  \nThird-party Integration - 34  \nWebhook & Event Subscription - 35  ",
});
        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: {
            type: "object",
            properties: {
                blocks: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                    block_id: {
                        type: "number"
                    },
                    block_name: {
                        type: "string"
                    },
                    block_type: {
                        type: "number"
                    },
                    connected_blocks: {
                        type: "array",
                        items: {
                        type: "number"
                        }
                    },
                    block_info_link: {
                        type: "string"
                    },
                    layer: {
                        type: "number"
                    },
                    description: {
                        type: "string"
                    }
                    },
                    required: [
                    "block_info_link",
                    "description"
                    ]
                }
                }
            }
            },
        };

        const chatSession = model.startChat({
        generationConfig,
        history: [],
        });
    
        const result = await chatSession.sendMessage(prompt as string);
        console.log(result.response.text());
        const blocks = (result.response.text());
        res.status(200).json({ blocks });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}