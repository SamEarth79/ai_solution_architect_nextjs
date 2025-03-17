import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GOOGLE_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { query } = req;
        const { prompt } = query;
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-pro-exp-02-05",
            systemInstruction: "Act as a Solution Architect, and respond by designing a solution architecture for the query. For every block of the architecture, provide the block name, block id, block's more information link, block type. I am going to use this information and build a 2D sketch of it so I will need to connect different blocks, so for each block mention the connected block ids. For block type use the below map.\nUser Interface (UI) - 0  \nFrontend - 1  \nBackend - 2  \nRelational Database - 3  \nNon-Relational Database - 4  \nCache - 5  \nAuthentication & Authorization - 6  \nLoad Balancer - 7  \nAPI Gateway - 8  \nLogging & Monitoring - 9  \nMessaging Queue - 10  \nConfiguration Management - 11  \nService Discovery - 12  \nRate Limiter - 13  \nBlob Storage - 14  \nData Warehouse - 15  \nSearch Engine - 16  \nBackup & Recovery - 17  \nEncryption & Key Management - 18  \nFirewall & Security Gateway - 19  \nThreat Detection - 20  \nAuditing & Compliance - 21  \nCDN (Content Delivery Network) - 22  \nDNS - 23  \nProxy Server - 24  \nVPN & Private Network - 25  \nEdge Computing - 26  \nMachine Learning Model - 27  \nFeature Store - 28  \nETL (Extract, Transform, Load) - 29  \nData Streaming - 30  \nCI/CD Pipeline - 31  \nContainer Orchestration - 32  \nFunction-as-a-Service (FaaS) - 33  \nThird-party Integration - 34  \nWebhook & Event Subscription - 35  ",
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
                      }
                    }
                  }
                }
              }
            },
          };

          const chatSession = model.startChat({
            generationConfig,
            history: [
            //   {
            //     role: "user",
            //     parts: [
            //       {text: "Create an AI Architecture for a message application"},
            //     ],
            //   },
            //   {
            //     role: "model",
            //     parts: [
            //       {text: " {\n  \"blocks\": [\n    {\n      \"block_id\": 1,\n      \"block_info_link\": \"https://developer.apple.com/ios/\",\n      \"block_name\": \"iOS Client\",\n      \"block_type\": 0,\n      \"connected_blocks\": [2, 3, 8]\n    },\n    {\n      \"block_id\": 2,\n      \"block_info_link\": \"https://developer.android.com/\",\n      \"block_name\": \"Android Client\",\n      \"block_type\": 0,\n      \"connected_blocks\": [1, 3, 8]\n    },\n    {\n      \"block_id\": 3,\n      \"block_info_link\": \"https://www.example.com/webclient\",\n      \"block_name\": \"Web Client\",\n      \"block_type\": 1,\n      \"connected_blocks\": [1, 2, 8]\n    },\n    {\n      \"block_id\": 4,\n      \"block_info_link\": \"https://www.envoyproxy.io/\",\n      \"block_name\": \"Load Balancer\",\n      \"block_type\": 7,\n      \"connected_blocks\": [8]\n    },\n    {\n      \"block_id\": 5,\n      \"block_info_link\": \"https://www.example.com/apigateway\",\n      \"block_name\": \"API Gateway\",\n      \"block_type\": 8,\n      \"connected_blocks\": [4, 6, 9, 12, 13, 16, 31]\n    },\n    {\n      \"block_id\": 6,\n      \"block_info_link\": \"https://www.example.com/userservice\",\n      \"block_name\": \"User Service\",\n      \"block_type\": 2,\n      \"connected_blocks\": [5, 7, 10, 14]\n    },\n    {\n      \"block_id\": 7,\n      \"block_info_link\": \"https://www.postgresql.org/\",\n      \"block_name\": \"User Database\",\n      \"block_type\": 3,\n      \"connected_blocks\": [6]\n    },\n    {\n      \"block_id\": 8,\n      \"block_info_link\": \"https://firebase.google.com/docs/auth\",\n      \"block_name\": \"Authentication Service\",\n      \"block_type\": 6,\n      \"connected_blocks\": [1, 2, 3]\n    },\n    {\n      \"block_id\": 9,\n      \"block_info_link\": \"https://www.example.com/messageservice\",\n      \"block_name\": \"Message Service\",\n      \"block_type\": 2,\n      \"connected_blocks\": [5, 10, 11, 14, 15, 25, 29, 32]\n    },\n    {\n      \"block_id\": 10,\n      \"block_info_link\": \"https://redis.io/\",\n      \"block_name\": \"User Cache\",\n      \"block_type\": 5,\n      \"connected_blocks\": [6, 9]\n    },\n    {\n      \"block_id\": 11,\n      \"block_info_link\": \"https://www.mongodb.com/\",\n      \"block_name\": \"Message Database\",\n      \"block_type\": 4,\n      \"connected_blocks\": [9]\n    },\n    {\n      \"block_id\": 12,\n      \"block_info_link\": \"https://www.example.com/notificationservice\",\n      \"block_name\": \"Notification Service\",\n      \"block_type\": 2,\n      \"connected_blocks\": [5, 14, 13, 32]\n    },\n    {\n      \"block_id\": 13,\n      \"block_info_link\": \"https://firebase.google.com/docs/cloud-messaging\",\n      \"block_name\": \"Push Notification Service\",\n      \"block_type\": 34,\n      \"connected_blocks\": [12]\n    },\n    {\n      \"block_id\": 14,\n      \"block_info_link\": \"https://aws.amazon.com/s3/\",\n      \"block_name\": \"Media Storage\",\n      \"block_type\": 14,\n      \"connected_blocks\": [6, 9, 12]\n    },\n    {\n      \"block_id\": 15,\n      \"block_info_link\": \"https://www.rabbitmq.com/\",\n      \"block_name\": \"Message Queue\",\n      \"block_type\": 10,\n      \"connected_blocks\": [9]\n    },\n    {\n      \"block_id\": 16,\n      \"block_info_link\": \"https://www.example.com/groupservice\",\n      \"block_name\": \"Group Service\",\n      \"block_type\": 2,\n      \"connected_blocks\": [5, 17, 14]\n    },\n    {\n      \"block_id\": 17,\n      \"block_info_link\": \"https://www.postgresql.org/\",\n      \"block_name\": \"Group Database\",\n      \"block_type\": 3,\n      \"connected_blocks\": [16]\n    },\n      {\n            \"block_id\": 18,\n            \"block_info_link\": \"https://prometheus.io/\",\n            \"block_name\": \"Monitoring\",\n            \"block_type\": 9,\n            \"connected_blocks\": [31]\n      },\n      {\n            \"block_id\": 19,\n            \"block_info_link\": \"https://www.datadoghq.com/\",\n            \"block_name\": \"Logging\",\n            \"block_type\": 9,\n            \"connected_blocks\": [31]\n        },\n        {\n            \"block_id\": 20,\n            \"block_info_link\": \"https://aws.amazon.com/cloudtrail/\",\n            \"block_name\": \"Auditing\",\n            \"block_type\": 21,\n            \"connected_blocks\": [31]\n        },\n        {\n            \"block_id\": 21,\n            \"block_info_link\": \"https://www.vaultproject.io/\",\n            \"block_name\": \"Key Management\",\n            \"block_type\": 18,\n            \"connected_blocks\": [31]\n      },\n        {\n            \"block_id\": 22,\n            \"block_info_link\": \"https://aws.amazon.com/waf/\",\n            \"block_name\": \"WAF\",\n            \"block_type\": 19,\n            \"connected_blocks\": [31]\n          },\n        {\n            \"block_id\": 23,\n             \"block_info_link\": \"https://aws.amazon.com/backup/\",\n            \"block_name\": \"Backup/Recovery\",\n            \"block_type\": 17,\n            \"connected_blocks\": [7, 11, 17]\n      },\n      {\n        \"block_id\": 24,\n        \"block_info_link\": \"https://spring.io/projects/spring-cloud-config\",\n        \"block_name\": \"Configuration Management\",\n        \"block_type\": 11,\n        \"connected_blocks\": [31]\n      },\n        {\n            \"block_id\": 25,\n            \"block_info_link\": \"https://huggingface.co/transformers\",\n            \"block_name\": \"NLP Model (Sentiment Analysis)\",\n            \"block_type\": 27,\n            \"connected_blocks\":[9, 27]\n      },\n        {\n            \"block_id\": 26,\n            \"block_info_link\": \"https://huggingface.co/transformers\",\n            \"block_name\": \"NLP Model (Translation)\",\n            \"block_type\": 27,\n          \"connected_blocks\":[9, 25]\n        },\n      {\n            \"block_id\": 27,\n            \"block_info_link\": \"https://feast.dev/\",\n            \"block_name\": \"Feature Store\",\n            \"block_type\": 28,\n            \"connected_blocks\": [25, 26]\n      },\n        {\n            \"block_id\": 28,\n            \"block_info_link\": \"https://aws.amazon.com/glue/\",\n            \"block_name\": \"ETL\",\n            \"block_type\": 29,\n            \"connected_blocks\": [11, 29]\n        },\n        {\n             \"block_id\": 29,\n            \"block_info_link\": \"https://kafka.apache.org/\",\n            \"block_name\": \"Data Streaming\",\n             \"block_type\": 30,\n            \"connected_blocks\": [28, 9]\n        },\n        {\n            \"block_id\": 30,\n            \"block_info_link\": \"https://www.jenkins.io/\",\n            \"block_name\": \"CI/CD\",\n            \"block_type\": 31,\n            \"connected_blocks\": [5, 18, 19, 20, 24, 31, 32]\n        },\n    {\n      \"block_id\": 31,\n      \"block_info_link\": \"https://kubernetes.io/\",\n      \"block_name\": \"Container Orchestration (Kubernetes)\",\n      \"block_type\": 32,\n      \"connected_blocks\": [6, 9, 12, 16, 30, 32]\n    },\n       {\n            \"block_id\": 32,\n            \"block_info_link\": \"https://aws.amazon.com/lambda\",\n            \"block_name\": \"Function-as-a-Service\",\n            \"block_type\": 33,\n            \"connected_blocks\": [9, 12, 30, 31]\n       }\n  ]\n}"},
            //     ],
            //   },
            ],
          });
        
          const result = await chatSession.sendMessage(prompt as string);
        const blocks = (result.response.text());
        res.status(200).json({ blocks });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}