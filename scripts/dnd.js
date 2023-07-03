Hooks.on("init", () => {
  loadTemplates(["modules/lyynix-more-journal-enrichers/templates/characterDnD.html"])

  if (game.system.id === "dnd5e") {
    console.log("LMJE | Initializing enrichers for dnd5e");

    CONFIG.TextEditor.enrichers.push({
      pattern: /@Character\[([a-zA-Z0-9]+)\]/g/*(\{(((attr|bio)\s?)+)\})?*/,
      enricher: async (match, options) => {

        var char = game.actors.get(match[1])
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
          }
        }
        var returnHtml = await renderTemplate("modules/lyynix-more-journal-enrichers/templates/characterDnD.html", templateEntries)
        return $(returnHtml)[0];
      },
    });
  }
});