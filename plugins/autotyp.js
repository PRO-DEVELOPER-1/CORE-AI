import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const body = m.body.toLowerCase().trim(); // Normalize input for case-insensitive checks

  // Check if the message starts with 'autotyping' (no prefix, any case)
  if (body.startsWith('autotyping')) {
    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    let responseMessage;

    // Extract the argument ('on' or 'off')
    const args = body.split(' ')[1];

    if (args === 'on') {
      config.AUTO_TYPING = true;
      responseMessage = "Auto-Typing has been enabled.";
    } else if (args === 'off') {
      config.AUTO_TYPING = false;
      responseMessage = "Auto-Typing has been disabled.";
    } else {
      responseMessage = "Usage:\n- `autotyping on`: Enable Auto-Typing\n- `autotyping off`: Disable Auto-Typing";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autotypingCommand;
