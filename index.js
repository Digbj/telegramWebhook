const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const julep = require("@julep/sdk");

const port = process.env.PORT;
const MY_TOKEN = process.env.MY_TOKEN;
const BASE_URL = `https://api.telegram.org/bot${MY_TOKEN}`;

//julep ai api
const THIRD_PARTY_API_KEY = process.env.THIRD_PARTY_API_KEY;
const client = new julep.Client({ apiKey: THIRD_PARTY_API_KEY });
// console.log(THIRD_PARTY_API_KEY);


// Controlling our request from Telegram using Axios and making API calls
function getAxiosInstance() {
    return {
        get(method, params) {
            return axios.get(`/${method}`, {
                baseURL: BASE_URL,
                params,
            });
        },
        post(method, data) {
            return axios({
                method: 'post',
                baseURL: BASE_URL,
                url: `/${method}`,
                data,
            });
        },
    };
}

// Communicating with the Telegram bot
function sendMessage(messageObj, messageText) {
    const axiosInstance = getAxiosInstance();
    return axiosInstance.post('sendMessage', {
        chat_id: messageObj.chat.id,
        text: messageText,
    });
}

messages = [
    {
    "role": "system",
    "name": "situation",
    "content": "Sara is a opinionated sex therapist & educator. She obtained her undergraduate and postgraduate degrees in Obstetrics and Gynaecology. She is also a Fellow of the Faculty of Sexual and Reproductive Healthcare UK and also a NLP coach and who is qualified to deal with trauma , self perceptions and fears as well. \n-She greets people with a message \" I am Sara , a sex educator and relationship & Intimacy coach. Thank you for reaching out , how can I help you today?\nShe believes that everyone deserves pleasure and her sole purpose is to help people find answers. She encourages women to explore their sexuality with masturbation and erotic content. She never guides them to a another health care provider or counseller till she has understood the problem well.\nSara is an Intimacy coach and provides guidance on a wide range of sexual and relationship topics, including masturbation. It offers a confident, informed, and empathetic approach, balancing practical tips with emotional support. The chatbot uses a friendly and conversational tone to discuss topics like emotional well-being, intimacy, sexual health, and masturbation, avoiding explicit content and medical advice."
    },
    {
    "role": "user",
    "name": "Megha",
    "content": "Hi"
    },
    {
    "role": "assistant",
    "name": "Sara",
    "content": "Hello! I'm here to help. How can I assist you today?"
    },
    {
    "role": "user",
    "name": "Megha",
    "content": "Hi"
    },
    {
    "role": "assistant",
    "name": "Sara",
    "content": "Hello! I'm here to help. How can I assist you today?"
    },
    {
    "role": "system",
    "name": "thought",
    "content": "Q: Is this how she greets people ?\nA:  Yes, Sara greets people with a message \" I am Sara , a sex educator and relationship & Intimacy coach. Thank you for reaching out , how can I help you today?\n\nPlease use this format to greet ."
    },
    {
    "role": "user",
    "name": "Megha",
    "content": "Hi"
    },
    {
    "role": "assistant",
    "name": "Sara",
    "content": "Hello! I'm here to help. How can I assist you today?"
    },
    {
    "role": "assistant",
    "name": "Sara",
    "content": "Hello! I'm here to help. How can I assist you today?"
    },
    {
    "role": "user",
    "name": "Megha",
    "content": ""
    }
    ]

async function handleMessage(messageObj) {
    const messageText = messageObj.text.toLowerCase();
    const chatId = messageObj.chat.id;
    console.log(messageObj);

    // Check if the message is "hi" or "hello"
    if (messageText === 'hi' || messageText === 'hello') {
        const welcomeMessage = "Hi, I am Sara, your dedicated relationship and intimacy coach. Welcome to ATOG, where our mission is to empower women to explore and understand their sexuality. Would you like to ask questions or listen to audio stories?\n\n→ Type 1 to Listen Audio Stories\n\n→ Type AMA to ask questions";
        await sendMessage(messageObj, welcomeMessage);
    } else if (messageText === '1') {
        // Respond with a list of audio links
        const audioLinks = [
            "1. www.atog.in/playlist1",
            "2. www.atog.in/playlist1",
            "3. www.atog.in/playlist1"
        ].join("\n");
        await sendMessage(messageObj, audioLinks);
    } else if (messageText === 'ama') {
        // getting the response from julep ai
        // const aiResponse = await client.chat.completions.create({
        //     model: "julep-ai/samantha-1-turbo",
        //     messages: [messageObj], 
        //     temperature: 0.7,
        //     max_tokens: 300,
        //     top_p: 1,
        // });
        // const aiMessage = aiResponse.choices[0].message.content;
        // // sending the msg from julep to chat bot
        // await sendMessage(chatId, aiMessage);
        
    } else {
        // For any other message, respond with a default message
        await sendMessage(messageObj, 'Oops! I did not understand that. Please type "hi" or "hello" to start.');
    }
}



// Handling all the inputs appropriately
async function handler(req, method) {
    const { body } = req;
    if (body) {
        console.log(body);
        const messageObj = body.message;
        await handleMessage(messageObj);
    }
    return;
}

const app = express();
app.use(express.json());

app.post('*', async (req, res) => {
    console.log(req.body);
    res.status(200).send(await handler(req));
});

app.get('*', async (req, res) => {
    res.status(200).send(await handler(req));
});

app.listen(port, () => {
    console.log('Server is live at', port);
});









//chat gpt code


// const express = require("express");
// const bodyParser = require('body-parser');
// const { Telegraf } = require("telegraf");
// const axios = require("axios");
// const julep = require("@julep/sdk");

// const app = express();
// const port = process.env.PORT || 3000;

// // Use bodyParser middleware to parse JSON bodies
// app.use(bodyParser.json());

// // Initialize Telegraf bot
// const MY_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
// const bot = new Telegraf(MY_TOKEN);

// // Initialize Julep client
// const THIRD_PARTY_API_KEY = process.env.THIRD_PARTY_API_KEY;
// const client = new julep.Client({ apiKey: THIRD_PARTY_API_KEY });

// // Function to chat with Maya using Julep API
// async function chatWithMaya(messages) {
//   try {
//     if (messages.length > 0) {
//       const chatCompletion = await client.chat.completions.create({
//         model: "julep-ai/samantha-1-turbo",
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 300,
//         top_p: 1,
//         frequency_penalty: 0.5,
//         presence_penalty: 0.5,
//         stop: ["<", "<|"],
//       });

//       return chatCompletion.choices[0].message.content;
//     } else {
//       return "I'm sorry, I can only assist with your queries.";
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return "An error occurred while processing your request.";
//   }
// }

// // Handle messages from Telegram
// app.post(`/bot${MY_TOKEN}`, async(req, res) => {
//   const { message } = req.body;

//   if (message && message.text) {
//     // Simplified handling for basic commands and messages
//     const chatId = message.chat.id;
//     const text = message.text;

//     try {
//       // Handling basic greetings
//       if (
//         text.toLowerCase() === "hi" ||
//         text.toLowerCase() === "hello" ||
//         text.toLowerCase() === "hey" ||
//         text.toLowerCase() === "hy"
//       ) {
//         const welcomeMessage =
//           "Hi, I am Sara, your dedicated relationship and intimacy coach. Welcome to ATOG, where our mission is to empower women to explore and understand their sexuality. Would you like to ask questions or listen to audio stories?\n\n→ Type 1 to Listen Audio Stories\n\n→ Type AMA to ask questions";
//         bot.telegram.sendMessage(chatId, welcomeMessage);
//       } else if (text.toLowerCase() === "1") {
//         const audioStories = [
//           "Audio Story 1: [Link to audio]",
//           "Audio Story 2: [Link to audio]",
//           "Audio Story 3: [Link to audio]"
//         ];
//         const playlistMessage = "Here are some audio stories for you:\n\n";
//         const formattedAudioStories = audioStories.map(
//           (story, index) => `${index + 1}. ${story}`
//         );
//         bot.telegram.sendMessage(
//           chatId,
//           playlistMessage + formattedAudioStories.join("\n")
//         );
//       } else if (text.toLowerCase() === "ama") {
//         const amaMessage =
//           "Feel free to ask me anything related to relationships, intimacy, or sexual wellbeing.";
//         bot.telegram.sendMessage(chatId, amaMessage);
//       } else {
//         // Directly handling any message without filtering for specific keywords
//         const response = await chatWithMaya([{ role: "user", name: "User", content: text }]);
//         bot.telegram.sendMessage(chatId, response);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       bot.telegram.sendMessage(chatId, "An error occurred while processing your request.");
//     }
//   }

//   // Respond to the webhook request
//   res.status(200).send("OK");
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Telegram bot server listening at http://localhost:${port}`);
// });

// // Set the webhook
// bot.telegram.setWebhook(`https://telegrambot-1-9ifb.onrender.com/bot${MY_TOKEN}`);