import { invalidHtml, templates } from "../helpers.js";

export async function characterDnD(match, options) {
  var char = game.actors.get(match[1]);
  if (!char) return $(invalidHtml("invalid actorID"))[0];
  //var charOptions = match[3].split(/\s/g)
  //console.log(char)

  var templateEntries = {
    id: char._id,
    name: char.name,
    img: char.img,
    race: char.system.details.race,
    alignment: char.system.details.alignment,
    stats: {
      str: char.system.abilities.str.value,
      dex: char.system.abilities.dex.value,
      con: char.system.abilities.con.value,
      int: char.system.abilities.int.value,
      wis: char.system.abilities.wis.value,
      cha: char.system.abilities.cha.value,
    },
  };
  var returnHtml = await renderTemplate(
    templates.character.dnd,
    templateEntries
  );
  return $(returnHtml)[0];
}

export async function characterPF2e(match, options) {
  var char = game.actors.get(match[1]);
  if (!char) return $(invalidHtml("invalid actorID"))[0];
  //var charOptions = match[3].split(/\s/g)
  //console.log(char)

  var templateEntries = {
    id: char._id,
    name: char.name,
    img: char.img,
    level: char.system.details.level.value,
    stats: {
      str: char.system.abilities.str.value,
      dex: char.system.abilities.dex.value,
      con: char.system.abilities.con.value,
      int: char.system.abilities.int.value,
      wis: char.system.abilities.wis.value,
      cha: char.system.abilities.cha.value,
    },
  };
  var returnHtml = await renderTemplate(
    templates.character.pf2e,
    templateEntries
  );
  return $(returnHtml)[0];
}
