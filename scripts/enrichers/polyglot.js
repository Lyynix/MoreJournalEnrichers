import { EnricherPattern } from "../enricherPattern.js";
import { invalidHtml, templates } from "../helpers.js";

export async function polyglot(match, options) {
  let langIn = match[1].toLowerCase();
  let paragraphs = match[2].split(EnricherPattern.SEPARATOR);

  if (!game.modules.get("polyglot").active) {
    let html = `<div>${paragraphs.map((p) => `<p>${p}</p>`).join("")}</div>`;
    return $(html)[0];
  }

  let lang = game.polyglot.languages[langIn]
  if (!lang) {
    return $(invalidHtml("Polyglot: " + game.i18n.localize("LMJE.POLYGLOT.UnknownLanguage")))[0];
  }
  let scrambledParagraphs = paragraphs.map(p => game.polyglot.scrambleString(p))
  let canUserUnderstand = game.polyglot.isLanguageknownOrUnderstood(langIn)

  let chatClick = `
  ChatMessage.create({
    user: game.userId,
    content: '<p>${paragraphs.join("</p><p>")}</p>',
    type: CONST.CHAT_MESSAGE_TYPES.IC, //2
    language: "${langIn}"
  })`

  let obj = {
    paragraphs: paragraphs,
    scrambledParagraphs: scrambledParagraphs,
    fontName: lang.font,
    langString: canUserUnderstand ? lang.label : game.i18n.localize("LMJE.POLYGLOT.UnknownLanguage"),
    showUnscrambled: canUserUnderstand && !game.user.isGM,
    isUserGm: game.user.isGM,
    chatClick: chatClick
  }
  let html = await renderTemplate(templates.modules.polyglot, obj)
  return $(html)[0]
}
