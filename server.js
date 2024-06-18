import express from 'express';
import { Client }  from "@notionhq/client";

const app = express();
app.use(express.json());

const response = await fetch('https://zenquotes.io/api/random/');
let data = await response.json();
console.log(data);

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY_SECRET,
})

async () => {
    const blockId = '100f57c1e5b84764ac774212c748ee92';
    const response = await notion.blocks.update({
        "block_id": blockId,
        "quote": {
            "rich_text": [{
                "text": {
                    "content": "Lacinato kale"
                }
            }]
        },
        "color": "gray_background"
    })
}

app.listen(3000, () => {
    console.log('App is running on port 3000');
});