import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.cjs';
import axios from 'axios';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const menu = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;

  const validCommands = ['list', 'help', 'menu'];

  if (validCommands.includes(cmd)) {
    const mainMenu = `
╭━━━〔 *${config.BOT_NAME}* 〕━━━┈⊷
┃★╭──────────────
┃★│ Owner : *${config.OWNER_NAME}*
┃★│ User : *${m.pushName}*
┃★│ Baileys : *Multi Device*
┃★│ Type : *NodeJs*
┃★│ Mode : *${mode}*
┃★│ Platform : *${os.platform()}*
┃★│ Prefix : [${prefix}]
┃★│ Version : *3.1.0*
┃★╰──────────────
╰━━━━━━━━━━━━━━━┈⊷

> ${pushwish} *${m.pushName}*!

╭━━〔 *Menu List* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• 1. Download Menu      
┃◈┃• 2. Converter Menu        
┃◈┃• 3. AI Menu  
┃◈┃• 4. Tools Menu  
┃◈┃• 5. Group Menu 
┃◈┃• 6. Search Menu   
┃◈┃• 7. Main Menu
┃◈┃• 8. Owner Menu 
┃◈┃• 9. Stalk Menu     
┃◈┃• update
┃◈└───────────┈⊷
╰──────────────┈⊷
> *Reply with the number (1-9)*`;

    // Function to get menu image (now using the URL provided)
    const getMenuImage = async () => {
      const imageUrl = 'https://files.catbox.moe/7jt69h.jpg';
      try {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
      } catch (error) {
        console.error('Error fetching menu image from URL:', error);
        // Fallback to a local image in case the URL fails
        return fs.readFileSync('./media/khan.jpg');
      }
    };

    const menuImage = await getMenuImage();

    const sentMessage = await Matrix.sendMessage(m.from, {
      image: menuImage,
      caption: mainMenu,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363398040175935@newsletter',
          newsletterName: "JawadTechX",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://files.catbox.moe/ksvao4.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });

    // Set up listener for menu selection
    Matrix.ev.on('messages.upsert', async (event) => {
      const receivedMessage = event.messages[0];
      if (!receivedMessage?.message?.extendedTextMessage) return;

      const receivedText = receivedMessage.message.extendedTextMessage.text.trim();
      if (receivedMessage.message.extendedTextMessage.contextInfo?.stanzaId !== sentMessage.key.id) return;

      let menuResponse;

      switch (receivedText) {
        case "1":
          menuResponse = `
╭━━〔 *Download Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• apk
┃◈┃• facebook
┃◈┃• mediafire
┃◈┃• pinterestdl
┃◈┃• gitclone
┃◈┃• gdrive
┃◈┃• insta
┃◈┃• ytmp3
┃◈┃• ytmp4
┃◈┃• play
┃◈┃• song
┃◈┃• video
┃◈┃• ytmp3doc
┃◈┃• ytmp4doc
┃◈┃• tiktok
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "2":
          menuResponse = `
╭━━〔 *Converter Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• attp
┃◈┃• attp2
┃◈┃• attp3
┃◈┃• ebinary
┃◈┃• dbinary
┃◈┃• emojimix
┃◈┃• mp3
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "3":
          menuResponse = `
╭━━〔 *AI Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ai
┃◈┃• bug
┃◈┃• report
┃◈┃• gpt
┃◈┃• dalle
┃◈┃• remini
┃◈┃• gemini
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "4":
          menuResponse = `
╭━━〔 *Tools Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• calculator
┃◈┃• tempmail
┃◈┃• checkmail
┃◈┃• trt
┃◈┃• tts
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "5":
          menuResponse = `
╭━━〔 *Group Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• linkgroup
┃◈┃• setppgc
┃◈┃• setname
┃◈┃• setdesc
┃◈┃• group
┃◈┃• gcsetting
┃◈┃• welcome
┃◈┃• add
┃◈┃• kick
┃◈┃• hidetag
┃◈┃• tagall
┃◈┃• antilink
┃◈┃• antitoxic
┃◈┃• promote
┃◈┃• demote
┃◈┃• getbio
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "6":
          menuResponse = `
╭━━〔 *Search Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• play
┃◈┃• yts
┃◈┃• imdb
┃◈┃• google
┃◈┃• gimage
┃◈┃• pinterest
┃◈┃• wallpaper
┃◈┃• wikimedia
┃◈┃• ytsearch
┃◈┃• ringtone
┃◈┃• lyrics
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "7":
          menuResponse = `
╭━━〔 *Main Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ping
┃◈┃• alive
┃◈┃• owner
┃◈┃• menu
┃◈┃• infobot
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "8":
          menuResponse = `
╭━━〔 *Owner Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• join
┃◈┃• leave
┃◈┃• block
┃◈┃• unblock
┃◈┃• setppbot
┃◈┃• anticall
┃◈┃• setstatus
┃◈┃• setnamebot
┃◈┃• autotyping
┃◈┃• alwaysonline
┃◈┃• autoread
┃◈┃• autosview
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        case "9":
          menuResponse = `
╭━━〔 *Stalk Menu* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• truecaller
┃◈┃• instastalk
┃◈┃• githubstalk
┃◈└───────────┈⊷
╰──────────────┈⊷`;
          break;

        default:
          menuResponse = "*Invalid Reply Please Reply With A Number Between 1 to 9*";
      }

      // Send the menu response
      await Matrix.sendMessage(m.from, {
        text: menuResponse,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true
        }
      });
    });
  }
};

export default menu;
