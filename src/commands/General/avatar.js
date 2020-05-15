const Command = require("../../lib/structures/Command");
const format = require("../../lib/scripts/Format");

class avatarCommand extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["pfp", "profilepic", "profilepicture", "uicon", "usericon"],
      args: "[member:member&fallback]",
      description: "Sends a member's avatar.",
    });
  }

  run(msg, args, pargs) {
    const user = pargs[0].value;
    // Sends the avatar
    msg.channel.createMessage({
      embed: {
        color: this.bot.embed.color("general"),
        author: {
          icon_url: user.user.dynamicAvatarURL(null),
          name: format.tag(user.user),
        },
        image: {
          url: user.user.dynamicAvatarURL(null),
        },
      },
    });
  }
}

module.exports = avatarCommand;