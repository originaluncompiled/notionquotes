import express from 'express';
import cron from 'node-cron';
import { Client }  from "@notionhq/client";

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_KEY_SECRET,
})

const app = express();
app.use(express.json());

const updateQuoteBlock = async () => {
    try {
        const response = await fetch('https://zenquotes.io/api/random/');
        const quote = await response.json();
    
        const blockId = '100f57c1e5b84764ac774212c748ee92';
        const updateQuote = await notion.blocks.update({
            block_id: blockId,
            quote: {
                rich_text: [{
                    text: {
                        content: `"${quote[0].q}"- `,
                    },
                    annotations: {
                        italic: true,
                    }
                },
                {
                    text: {
                        content: `${quote[0].a}`,
                    },
                    annotations: {
                        bold: true,
                    }
                }],
            },
            color: 'gray_background',
        });
        console.log(updateQuote);
    } catch (error) {
        console.error('Error updating quote: ', error);
    }
};

// Update the quote block once a day
cron.schedule('0 0 * * *', updateQuoteBlock);
//setInterval(updateQuoteBlock, 24 * 60 * 60 * 1000);

app.listen(3000, () => {
    console.log('App is running on port 3000');
});

// Run the quote update immediately on startup
updateQuoteBlock();