const keepAlive = require("./server");

require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// ---BEGINNING OF URL HELPER FUNCTION--- //

function checkUrl(message, keywordArray) {
  return keywordArray.some((keyword) => message.content.includes(keyword));
}

// Twitter URLs
const TW_URLs = ["https://twitter.com", "https://www.twitter.com"];

// X URLs
const X_URLs = ["https://x.com", "https://www.x.com"];

// Instagram URLs
const IG_URLs = ["https://instagram.com", "https://www.instagram.com"];

// Pixiv URLs
const Pixiv_URLs = ["https://pixiv.net", "https://www.pixiv.net"];

// Reddit URLs
const Reddit_URLs = ["https://reddit.com", "https://www.reddit.com"];

// ---END OF URL HELPER FUNCTION--- //

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return; // Prevent bots from replying to themselves

  let botReply = message.content;
  let containsUrlsToReplace = false;

  // Handles Twitter URLs
  if (checkUrl(message, TW_URLs)) {
    botReply = botReply.replace("twitter.com", "fxtwitter.com");
    containsUrlsToReplace = true;
  }
  // Handles X URLs
  if (checkUrl(message, X_URLs)) {
    botReply = botReply.replace("x.com", "fixupx.com");
    containsUrlsToReplace = true;
  }

  // Handles Instagram URLs
  if (checkUrl(message, IG_URLs)) {
    botReply = botReply.replace("instagram.com", "ddinstagram.com");
    containsUrlsToReplace = true;
  }

  // Handles Pixiv URLs
  if (checkUrl(message, Pixiv_URLs)) {
    botReply = botReply.replace("pixiv.net", "ddpixiv.net");
    containsUrlsToReplace = true;
  }

  // Handles Reddit URLs
  if (checkUrl(message, Reddit_URLs)) {
    botReply = botReply.replace("reddit.com", "rxddit.com");
    containsUrlsToReplace = true;
  }

  // Define a regular expression pattern to match URLs
  const urlPattern =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  try { // If any applicable URLs are found in the message, reply with only them, one URL per line
    const urls = botReply.match(urlPattern).join("\n");

    if (urls && containsUrlsToReplace) {
      // console.log(`URLs found in message:\n- ${urls.join('\n- ')}`)
      message.reply({
        content: urls,
        allowedMentions: { repliedUser: false },
      });
    }
  } catch {} // Otherwise, no applicable URLs are found in message, so do nothing.
});

keepAlive()
client.login(process.env.TOKEN);
