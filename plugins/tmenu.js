const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const fs = require('fs');
const path = require('path');

// Function to get Harare time
function getHarareTime() {
  return new Date().toLocaleString('en-US', {
    timeZone: 'Africa/Harare',
    hour12: true,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
}

// Function to fetch version from package.json
async function fetchVersion() {
  try {
    const packageJsonUrl = 'https://raw.githubusercontent.com/mrfrank-ofc/SUBZERO-BOT/main/package.json';
    const response = await axios.get(packageJsonUrl);
    const packageJson = response.data;
    return packageJson.version || 'Unknown';
  } catch (error) {
    console.error("Error fetching version:", error);
    return 'Unknown';
  }
}

// Define your submenu items (each represents one of the sections from your original menu)
const submenus = [
  {
    index: 1,
    title: "SUBZERO DOWNLOADER",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // You can change this per submenu if you like
    content: `╭─────────────···◈
*┋* *⬡ ғʙ*
*┋* *⬡ ɪɴꜱᴛᴀ*
*┋* *⬡ sᴘᴏᴛɪғʏ*
*┋* *⬡ ᴠɪᴅᴇᴏ*
*┋* *⬡ ɢᴅʀɪᴠᴇ*
*┋* *⬡ ᴛᴡɪᴛᴛᴇʀ*
*┋* *⬡ ᴛᴛ*
*┋* *⬡ ᴍᴇᴅɪᴀғɪʀᴇ*
*┋* *⬡ ᴍᴇᴅɪᴀғɪʀᴇᴘʀᴏ*
*┋* *⬡ ꜱᴏɴɢ*
*┋* *⬡ ᴘʟᴀʏ*
*┋* *⬡ ᴘʟᴀʏ2*
*┋* *⬡ ᴘʟᴀʏ3*
*┋* *⬡ ᴠɪᴅᴇᴏ*
*┋* *⬡ ᴠɪᴅᴇᴏ2*
*┋* *⬡ ɢɪᴛᴄʟᴏɴᴇ*
*┋* *⬡ ɪᴍɢ*
*┋* *⬡ ᴀᴘᴋ*
*┋* *⬡ ʏᴛᴍᴘ3*
*┋* *⬡ ʏᴛᴍᴘ4*
*┋* *⬡ ᴘɪɴᴛᴇʀᴇsᴛ*
*┋* *⬡ ʙᴀɪsᴄᴏᴘᴇ*
*┋* *⬡ ɢɪɴɪsɪsɪʟᴀ*
╰─────────────╶╶···◈`
  },
  {
    index: 2,
    title: "SEARCH-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ʏᴛꜱ*
*┋* *⬡ ʏᴛᴀ*
*┋* *⬡ ɢᴏᴏɢʟᴇ*
*┋* *⬡ ʟᴏʟɪ*
*┋* *⬡ ɢɪᴛsᴛᴀʟᴋ*
*┋* *⬡ ᴡɪᴋɪᴘᴇᴅɪᴀ*
*┋* *⬡ sʀᴇᴘᴏ*
*┋* *⬡ ᴍᴏᴠɪᴇɪɴғᴏ*
*┋* *⬡ ɢᴏᴏɢʟᴇ*
*┋* *⬡ ʙɪʙʟᴇ*
*┋* *⬡ ᴍᴏᴠɪᴇ*
*┋* *⬡ ᴡᴇᴀᴛʜᴇʀ*
*┋* *⬡ ssᴡᴇʙ*
*┋* *⬡ ɴᴘᴍ*
╰─────────────╶╶···◈`
  },
  {
    index: 3,
    title: "AI-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ɢᴘᴛ*
*┋* *⬡ ᴀɪ*
*┋* *⬡ ʙᴏᴛ*
*┋* *⬡ ᴅᴀʀᴋɢᴘᴛ*
*┋* *⬡ ᴠɪsɪᴏɴ*
*┋* *⬡ sᴜʙᴢᴇʀᴏ*
*┋* *⬡ ɢᴇᴍɪɴɪ*
*┋* *⬡ ɢᴇᴍɪɴɪᴘʀᴏ*
*┋* *⬡ ʙɪɴɢ*
*┋* *⬡ ᴄᴏᴘɪʟᴏᴛ*
*┋* *⬡ ᴄʟᴀᴜᴅᴇᴀɪ*
*┋* *⬡ ᴀʀᴛ*
*┋* *⬡ ᴍɪsᴛʀᴀᴀɪ*
*┋* *⬡ ᴍᴇᴛᴀᴀɪ*
*┋* *⬡ ᴄʜᴀᴛɢᴘᴛ*
*┋* *⬡ ɢᴘᴛ3*
*┋* *⬡ ɢᴘᴛ4*
*┋* *⬡ ɢᴘᴛ4ᴏ*
*┋* *⬡ ʟʟᴀᴍᴀ2*
*┋* *⬡ ʟʟᴀᴍᴀ3*
*┋* *⬡ ғʟᴜx*
*┋* *⬡ ғʟᴜxᴘʀᴏ*
*┋* *⬡ ɪᴍᴀɢɪɴᴇ*
*┋* *⬡ ᴅᴀʟʟᴇ*
╰─────────────╶╶···◈`
  },
  {
    index: 4,
    title: "OWNER-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ᴜᴘᴅᴀᴛᴇᴄᴍᴅ*
*┋* *⬡ sᴇᴛᴛɪɴɢs*
*┋* *⬡ ᴏᴡɴᴇʀ*
*┋* *⬡ ʀᴇᴘᴏ*
*┋* *⬡ ʙᴏᴛsᴇᴛᴛɪɴɢs*
*┋* *⬡ ꜱʏꜱᴛᴇᴍ*
*┋* *⬡ ᴜᴘᴅᴀᴛᴇ*
*┋* *⬡ ꜱᴛᴀᴛᴜꜱ*
*┋* *⬡ ʙʟᴏᴄᴋ*
*┋* *⬡ ᴜɴʙʟᴏᴄᴋ*
*┋* *⬡ sʜᴜᴛᴅᴏᴡɴ*
*┋* *⬡ ᴄʟᴇᴀʀᴄʜᴀᴛs*
*┋* *⬡ sᴇᴛᴘᴘ*
*┋* *⬡ ғᴜʟʟᴘᴘ*
*┋* *⬡ ʙʀᴏᴀᴅᴄᴀsᴛ*
*┋* *⬡ ᴊɪᴅ*
*┋* *⬡ ɢᴊɪᴅ*
*┋* *⬡ ʀᴇꜱᴛᴀʀᴛ*
╰─────────────╶╶···◈`
  },
  {
    index: 5,
    title: "GROUP-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ʀᴇᴍᴏᴠᴇ*
*┋* *⬡ ᴅᴇʟᴇᴛᴇ*
*┋* *⬡ ᴀᴅᴅ*
*┋* *⬡ ᴋɪᴄᴋ*
*┋* *⬡ ᴋɪᴄᴋᴀʟʟ*
*┋* *⬡ sᴇᴛɢᴏᴏᴅʙʏᴇ*
*┋* *⬡ sᴇᴛᴡᴇʟᴄᴏᴍᴇ*
*┋* *⬡ ᴘʀᴏᴍᴏᴛᴇ*
*┋* *⬡ ᴅᴇᴍᴏᴛᴇ*
*┋* *⬡ ᴛᴀɢᴀʟʟ*
*┋* *⬡ ɢᴇᴛᴘɪᴄ*
*┋* *⬡ ɪɴᴠɪᴛᴇ*
*┋* *⬡ ʀᴇᴠᴏᴋᴇ*
*┋* *⬡ ᴊᴏɪɴʀᴇǫᴜᴇsᴛs*
*┋* *⬡ ᴀʟʟʀᴇǫ*
*┋* *⬡ ᴍᴜᴛᴇ*
*┋* *⬡ ᴜɴᴍᴜᴛᴇ*
*┋* *⬡ ʟᴏᴄᴋɢᴄ*
*┋* *⬡ ᴜɴʟᴏᴄᴋɢᴄ*
*┋* *⬡ ʟᴇᴀᴠᴇ*
*┋* *⬡ ᴜᴘᴅᴀᴛᴇɢɴᴀᴍᴇ*
*┋* *⬡ ᴜᴘᴅᴀᴛᴇɢᴅᴇsᴄ*
*┋* *⬡ ᴊᴏɪɴ*
*┋* *⬡ ʜɪᴅᴇᴛᴀɢ*
*┋* *⬡ ɢɪɴғᴏ*
*┋* *⬡ ᴅɪsᴀᴘᴘᴇᴀʀ ᴏɴ*
*┋* *⬡ ᴅɪsᴀᴘᴘᴇᴀʀ ᴏғғ*
*┋* *⬡ ᴅɪsᴀᴘᴘᴇᴀʀ 7ᴅ 24ʜ 90ᴅ*
*┋* *⬡ sᴇɴᴅᴅᴍ*
*┋* *⬡ ᴏᴘᴇɴᴛɪᴍᴇ*
*┋* *⬡ ᴄʟᴏsᴇᴛɪᴍᴇ*
╰─────────────╶╶···◈`
  },
  {
    index: 6,
    title: "INFO-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ᴍᴇɴᴜ*
*┋* *⬡ ᴀʟʟᴍᴇɴᴜ*
*┋* *⬡ ʙᴇᴛᴀᴍᴇɴᴜ*
*┋* *⬡ ᴀʙᴏᴜᴛ*
*┋* *⬡ sᴄʀɪᴘᴛ*
*┋* *⬡ ʀᴇᴘᴏ*
*┋* *⬡ ᴍʀғʀᴀɴᴋ*
*┋* *⬡ ᴀʟɪᴠᴇ*
*┋* *⬡ ʙᴏᴛɪɴꜰᴏ*
*┋* *⬡ ꜱᴛᴀᴛᴜꜱ*
*┋* *⬡ ꜱᴜᴘᴘᴏʀᴛ*
*┋* *⬡ ᴘɪɴɢ*
*┋* *⬡ ᴘɪɴɢ2*
*┋* *⬡ sᴜʙᴢᴇʀᴏɪɴᴄ*
*┋* *⬡ ꜱʏꜱᴛᴇᴍ*
*┋* *⬡ ᴜᴘᴅᴀᴛᴇ*
*┋* *⬡ ᴠᴇʀsɪᴏɴ*
*┋* *⬡ ᴘᴀɪʀ*
*┋* *⬡ ᴘᴀɪʀ2*
*┋* *⬡ ʀᴇᴘᴏʀᴛ*
*┋* *⬡ ʜᴇʟᴘ*
╰─────────────╶╶···◈`
  },
  {
    index: 7,
    title: "CONVERTER-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ sᴛɪᴄᴋᴇʀ*
*┋* *⬡ ᴠsᴛɪᴄᴋᴇʀ*
*┋* *⬡ ᴛʀᴛ*
*┋* *⬡ ᴛᴛs*
*┋* *⬡ ʟᴏɢᴏᴘʀᴏ*
*┋* *⬡ ᴀᴛᴛᴘ*
*┋* *⬡ ʟᴏɢᴏ*
*┋* *⬡ ʟᴏɢᴏ1*
*┋* *⬡ ʟᴏɢᴏ2*
*┋* *⬡ ғᴀɴᴄʏ*
*┋* *⬡ ᴠᴠ*
*┋* *⬡ ϙʀ*
*┋* *⬡ ᴛɪɴʏ*
*┋* *⬡ sʜᴏʀᴛ*
*┋* *⬡ ᴠᴇʀsɪᴏɴ*
*┋* *⬡ ᴛᴇᴍᴘᴍᴀɪʟ*
*┋* *⬡ ᴇɴᴄᴏᴅᴇ*
*┋* *⬡ ᴅᴇᴄᴏᴅᴇ*
*┋* *⬡ ʀɪɴɢᴛᴏɴᴇs*
*┋* *⬡ ᴜʀʟ*
*┋* *⬡ ᴜᴘʟᴏᴀᴅ*
*┋* *⬡ ᴛᴏᴘᴅғ*
╰─────────────╶╶···◈`
  },
  {
    index: 8,
    title: "SUBZERO-SETTINGS",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ sᴜʙᴢᴇʀᴏᴇɴᴠ*
*┋* *⬡ ᴜᴘᴅᴀᴛᴇ*
*┋* *⬡ ᴘɪɴɢ*
*┋* *⬡ ᴍʀғʀᴀɴᴋ*
*┋* *⬡ ᴏᴡɴᴇʀ*
*┋* *⬡ sᴜʙᴢᴇʀᴏɪɴᴄ*
*┋* *⬡ ᴀʙᴏᴜᴛ*
*┋* *⬡ sᴇᴛᴛɪɴɢs*
*┋* *⬡ ᴠᴇʀsɪᴏɴ*
*┋* *⬡ sᴜᴘᴘᴏʀᴛ*
*┋* *⬡ ᴀʟɪᴠᴇ*
*┋* *⬡ sᴇssɪᴏɴs*
*┋* *⬡ ʀᴇᴘᴏᴛʀᴇᴇ*
*┋* *⬡ ʟɪsᴛᴘʟᴜɢɪɴs*
*┋* *⬡ ᴘʟᴜɢɪɴᴅʟ*
╰─────────────╶╶···◈`
  },
  {
    index: 9,
    title: "RANDOM-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ᴄᴘᴘ*
*┋* *⬡ ᴅᴏɢ*
*┋* *⬡ ʀᴀɴᴅᴏᴍᴡᴀʟʟᴘᴇʀ*
*┋* *⬡ ʟᴏʟɪ*
*┋* *⬡ ᴀᴡᴏᴏ*
*┋* *⬡ ᴡᴀɪғᴜ*
*┋* *⬡ ɢᴀʀʟ*
*┋* *⬡ ᴍᴀɪᴅ*
*┋* *⬡ ɴᴇᴋᴏ*
*┋* *⬡ ᴀɴɪᴍᴇ*
*┋* *⬡ ᴀɴɪᴍᴇɢɪʀʟ*
*┋* *⬡ ᴀɴɪᴍᴇɢɪʀʟ1*
*┋* *⬡ ᴀɴɪᴍᴇɢɪʀʟ2*
*┋* *⬡ ᴀɴɪᴍᴇɢɪʀʟ3*
*┋* *⬡ ᴀɴɪᴍᴇɢɪʀʟ4*
*┋* *⬡ ᴀɴɪᴍᴇɢɪʀʟ5*
╰─────────────╶╶···◈`
  },
  {
    index: 10,
    title: "WALLPAPERS-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ɪᴍɢ*
*┋* *⬡ ᴡᴀʟʟᴘᴀᴘᴇʀ*
*┋* *⬡ ᴅᴏɢ*
╰─────────────╶╶···◈`
  },
  {
    index: 11,
    title: "FUN-CMD",
    image: "https://example.com/fun_menu.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ sʜʏ*
*┋* *⬡ sʜʏʏ*
*┋* *⬡ ʜᴀᴘᴘʏ*
*┋* *⬡ sᴀᴅ*
*┋* *⬡ ᴀɴɢʀʏ*
*┋* *⬡ ʜᴀɴᴅ*
*┋* *⬡ ɴɪᴋᴀʟ*
*┋* *⬡ ʜᴜɢ*
*┋* *⬡ ᴍᴏᴏɴ*
*┋* *⬡ ᴋɪss*
*┋* *⬡ ᴄᴏɴғᴜsᴇᴅ*
*┋* *⬡ ʜᴇᴀʀᴛ*
*┋* *⬡ ᴘɪᴄᴋᴜᴘʟɪɴᴇ*
*┋* *⬡ ғᴀᴄᴛ*
*┋* *⬡ ᴛʀᴜᴛʜ*
*┋* *⬡ ᴅᴀʀᴇ*
*┋* *⬡ ᴄʜᴀʀᴀᴄᴛᴇʀ*
*┋* *⬡ ᴅɪᴀʀʏ*
*┋* *⬡ sᴇᴛᴅɪᴀʀʏᴘᴀssᴡᴏʀᴅ*
*┋* *⬡ ʟᴏɢɪɴ*
*┋* *⬡ ɢᴇᴛɪᴅ*
*┋* *⬡ ʀᴇsᴇᴛᴅɪᴀʀʏᴘᴀssᴡᴏʀᴅ*
╰─────────────╶╶···◈`
  },
  {
    index: 12,
    title: "TOOLS-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ᴛʀᴛ*
*┋* *⬡ ᴊᴏᴋᴇ*
*┋* *⬡ ᴛᴛs*
*┋* *⬡ ꜰᴀᴄᴛ*
*┋* *⬡ ɢɪᴛʜᴜʙ*
*┋* *⬡ ɢᴘᴀꜱꜱ*
*┋* *⬡ ssᴡᴇʙ*
*┋* *⬡ sʜᴏʀᴛᴇɴ*
*┋* *⬡ ᴛɪɴʏᴜʀʟ*
*┋* *⬡ ʜᴀᴄᴋ*
*┋* *⬡ ǫᴜᴏᴛᴇ*
*┋* *⬡ ʀᴇᴘᴏ*
*┋* *⬡ ᴛɢsᴛɪᴄᴋᴇʀ*
*┋* *⬡ sʀᴇᴘᴏ*
*┋* *⬡ ᴅᴇꜰɪɴᴇ*
*┋* *⬡ ᴀɴᴛɪᴠɪᴇᴡᴏɴᴄᴇ*
*┋* *⬡ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴀʟʟ*
*┋* *⬡ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ*
*┋* *⬡ ᴀɴᴛɪᴄᴀʟʟ*
*┋* *⬡ ᴀᴜᴛᴏʙɪᴏ*
*┋* *⬡ ϙʀ*
*┋* *⬡ sᴄᴀɴϙʀ*
*┋* *⬡ ᴇɴᴄᴏᴅᴇ*
*┋* *⬡ ᴅᴇᴄᴏᴅᴇ*
*┋* *⬡ ᴛᴇᴍᴘᴀᴍᴀɪʟ*
*┋* *⬡ ᴛᴇᴍᴘsᴍs*
*┋* *⬡ ᴛᴇᴍᴘᴘʜᴏɴᴇ*
╰─────────────╶╶···◈`
  },
  {
    index: 13,
    title: "NSFW-CMD",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* *⬡ ᴇᴊᴀᴄᴜʟᴀᴛɪᴏɴ*
*┋* *⬡ ᴘᴇɴɪs*
*┋* *⬡ ᴇʀᴇᴄ*
*┋* *⬡ ɴᴜᴅᴇ*
*┋* *⬡ sᴇx*
*┋* *⬡ ᴄᴜᴛᴇ*
*┋* *⬡ ᴏʀɢᴀsᴍ*
*┋* *⬡ ᴀɴᴀʟ*
*┋* *⬡ sᴜsᴘᴇɴsɪᴏɴ*
*┋* *⬡ ᴋɪss*
*┋* *⬡ xᴠɪᴅᴇᴏ*
╰─────────────╶╶···◈`
  },
  {
    index: 14,
    title: "BUG MENU",
    image: "https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg", // Replace with a proper URL
    content: `╭─────────────···◈
*┋* * ʙᴜɢs ᴄᴏᴍɪɴɢ sᴏᴏɴ ⚠️*
*┋* 
*┋* *⬡ ᴢᴇʀᴏᴄʀᴀsʜ*
*┋* *⬡ ᴢᴇʀᴏғʀᴇᴇᴢᴇ*
*┋* *⬡ ᴢᴇʀᴏʟᴀɢ*
*┋* *⬡ ᴢɪᴏs*
*┋* *⬡ ᴢᴀɴᴅʀᴏɪᴅ*
*┋* *⬡ ᴢᴋɪʟʟ*
*┋* *⬡ ᴢsᴘᴀᴍ*
*┋* *⬡ ᴢғʟᴏᴏᴅ*
*┋* *⬡ ᴢᴇʀᴏᴇxᴇᴄᴜᴛɪᴏɴ*
*┋* *⬡ ᴢʜᴇᴀᴅsʜᴏʀᴛ*
*┋* *⬡ ᴢᴜɪ*
╰─────────────╶╶···◈`
  }
];

// Main menu command: Sends an overall menu with a numbered list of submenu titles,
// then awaits a reply from the user to send the corresponding submenu.
cmd({
  pattern: "tmenu",
  desc: "subzero menu",
  alias: "help",
  category: "menu",
  react: "✅",
  filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, pushname, isMe, isOwner, groupMetadata, reply }) => {
  try {
    const version = await fetchVersion();
    // Build overall menu string with bot info and list of submenu options
    let overallMenu = `\`\`\`${config.BOT_NAME}\`\`\`\n\n`;
    overallMenu += `⟣──────────────────⟢\n`;
    overallMenu += `▧ *ᴄʀᴇᴀᴛᴏʀ* : *ᴍʀ ғʀᴀɴᴋ (🇿🇼)*\n`;
    overallMenu += `▧ *ᴍᴏᴅᴇ*    : *${config.MODE}*\n`;
    overallMenu += `▧ *ᴘʀᴇғɪx*  : *${config.PREFIX}*\n`;
    overallMenu += `▧ *ʀᴀᴍ*     : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(os.totalmem() / 1024 / 1024)}MB\n`;
    overallMenu += `▧ *ᴠᴇʀsɪᴏɴ* : *${version}* ⚡\n`;
    overallMenu += `▧ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}\n`;
    overallMenu += `▧ *ᴛɪᴍᴇ*    : ${getHarareTime()} ⌛\n`;
    overallMenu += `⟣──────────────────⟢\n\n`;
    overallMenu += `${readMore}\n\n`;
    overallMenu += `*Select a submenu by replying with its number:*\n\n`;
    
    submenus.forEach(item => {
      overallMenu += `${item.index} | ${item.title}\n`;
    });
    overallMenu += `\nReply with the menu number to view its commands.\n`;
    overallMenu += `\n— Made with ❤️ by Mr Frank`;
    
    // Send the overall menu with an image attachment
    await conn.sendMessage(
      from,
      {
        image: { url: `https://i.postimg.cc/WpQLCg85/White-and-Green-Simple-Professional-Business-Project-Presentation.jpg` },
        caption: overallMenu,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363304325601080@newsletter',
            newsletterName: '❄️『 𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐌𝐃 』❄️',
            serverMessageId: 143
          }
        }
      },
      { quoted: mek }
    );
    
    // Wait for user's reply (adapt this to your bot framework's message waiting logic)
    const filter = msg => msg.sender === sender;
    const responses = await conn.awaitMessages(from, filter, { max: 1, time: 60000 });
    
    if (responses && responses.length > 0) {
      const userReply = responses[0].body.trim();
      const submenuItem = submenus.find(item => item.index.toString() === userReply);
      
      if (submenuItem) {
        let submenuMessage = `*${submenuItem.title}*\n\n`;
        submenuMessage += `${submenuItem.content}\n\n`;
        submenuMessage += `— Enjoy using ${config.BOT_NAME}!`;
        
        await conn.sendMessage(
          from,
          {
            image: { url: submenuItem.image },
            caption: submenuMessage,
            contextInfo: {
              mentionedJid: [m.sender]
            }
          },
          { quoted: responses[0] }
        );
      } else {
        await conn.sendMessage(from, { text: "Invalid selection. Please try again." }, { quoted: m });
      }
    } else {
      await conn.sendMessage(from, { text: "Timed out waiting for your reply. Please try again." }, { quoted: m });
    }
    
  } catch (e) {
    console.log(e);
    reply(`${e}`);
  }
});

//  SUBZERO SC BY MR FRANK
