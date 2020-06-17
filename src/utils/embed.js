/**
 * @fileoverview Embed
 * @descriptions Function to generate embeds
 * @module embed
 */

const { colors } = require("root/config");
const format = require("utils/format");

/**
 * Creates an embed
 * @example msg.channel.createMessage(this.bot.embed("title", "description", "colortype", msg));
 *
 * @param {string} title The title of the embed
 * @param {string} description The description of the embed, set to null to clear
 * @param {object} msg Message object for setting the footer & sending the embed
 * @param {string} [colortype] Type of color (set in the config file)
 */

module.exports = (title, description, msg, colortype) => {
  let color = "";
  const construct = {
    embed: {
      footer: {},
    },
  };

  // Sets title & description
  if (title) construct.embed.title = title;
  if (description) construct.embed.description = description;

  // Author footer
  if (typeof msg === "object" && msg.author) {
    construct.embed.author = {};
    construct.embed.footer.text = `Ran by ${format.tag(msg.author)}`;
    construct.embed.footer.icon_url = msg.author.dynamicAvatarURL();
  }

  // Embed color
  if (colortype || !colortype && msg.author === "general" || msg.author === "error" || msg.author === "success") {
    if (!colortype && author) color = parseInt(colors[msg.author].replace(/#/g, "0x"));
    else if (colors[colortype]) color = parseInt(colors[colortype].replace(/#/g, "0x"));
    else throw Error("Invalid color - check the embed construct.");
  } else {
    color = parseInt(colors.general.replace(/#/g, "0x"));
  }

  construct.embed.color = color;
  if (msg) return msg.channel.createMessage(construct);
  else return construct;
};

/**
 * Exports this.bot.embed.color() for use in embed objects
 *
 * @example
 * msg.channel.createMessage({
 *   embed: {
 *    title: "title",
 *    color: this.bot.embed.color("colortype");
 *   }
 * });
 *
 * @param {string} colortype The type of color to parse (set in the config file)
 */

module.exports.color = colortype => {
  return parseInt(colors[colortype].replace(/#/g, "0x"));
};
