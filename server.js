import express from 'express';
import { Client }  from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY_SECRET,
})

const app = express();
app.use(express.json());

setInterval(() => {
    fetch('https://zenquotes.io/api/random/')
    .then(response => response.json())
    .then(quote => {
        async () => {
            const blockId = '100f57c1e5b84764ac774212c748ee92';
            const response = await notion.blocks.update({
                "block_id": blockId,
                "quote": {
                    "rich_text": [{
                        "text": {
                            "content": `"${quote[0].q}"- ${quote[0].a}`
                        }
                    }]
                },
                "color": "gray_background"
            })
        }
    })
    .catch(error => console.log(error))
}, (24 * 60 * 60 * 1000));

app.listen(3000, () => {
    console.log('App is running on port 3000');
});