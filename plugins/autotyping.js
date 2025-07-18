import config from '../../config.cjs';

const autorecordingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const body = m.body.toLowerCase().trim(); // Case-insensitive check

  // Check if message is exactly "autorecording on" or "autorecording off" (case-insensitive)
  if (body.startsWith('autorecording')) {
    if (!isCreator) return m.reply("*📛 THIS IS AN OWNER COMMAND*");
    let responseMessage;

    if (body.includes('on')) {
      config.AUTO_RECORDING = true;
      responseMessage = "Auto-Recording has been enabled.";
    } else if (body.includes('off')) {
      config.AUTO_RECORDING = false;
      responseMessage = "Auto-Recording has been disabled.";
    } else {
      responseMessage = "Usage:\n- `autorecording on`: Enable Auto-Recording\n- `autorecording off`: Disable Auto-Recording";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autorecordingCommand;
