let moduleID = "lyynix-more-journal-enrichers";
let enrichers = [
  "CB",
  "Checkbox",
  "IfChecked",
  "Var",
  "Replace",
  "Page",
  "ToC",
  "TableOfContents",
  "OrderedToC",
  "OrderedTableOfContents",
  "RollTableFull",
  "RollTableMenu",
  "CompendiumFull",
  "CompendiumInline",
  "ChatPost",
  "ChatWhisper",
  "SceneMenu",
  "SceneFull",
  "PlaylistMenu",
  "RollTableInline",
  "SceneInline",
  "PlaylistInline",
  "Playlist",
];

let pattern = new RegExp(
  `@(?:${enrichers.join("|")})(\[.*\])?({.*})?(\(.*\))?`,
  "g"
);
Hooks.on("init", async () => {
  game.settings.register(moduleID, "hintPosted", {
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });

  if (game.modules.filter(m => m.active && m.id==="lyynix-more-journal-enrichers").length > 0) return;

  console.log("oLMJE |", "Registered Settings");

  CONFIG.TextEditor.enrichers.push(
    {
      label: "LMJE - Module not active - remove",
      pattern: pattern,
      enricher: (match, options) => {
        return " ";
      },
    }
  );
});

Hooks.on("ready", async () => {
  if (game.modules.filter(m => m.active && m.id === "lyynix-more-journal-enrichers").length > 0) return;
  
  if (!game.settings.get(moduleID, "hintPosted")) {
    ChatMessage.create({
      user: game.users.current,
      whisper: [game.users.current._id],
      speaker: { alias: "Lyynix" },
      content: `
        <h3>Information for the GM</h3>
        <p>The module <b>${
          game.modules.get(moduleID).title
        }</b> uses features to improve their journals. These features are implemented through the module "Lyynix: More Journal Enrichers"</p>
        <p>The improvements are hidden for now, but you can view them by installing the module <b>"Lyynix: More Journal Enrichers"</b>.</p>
        <p>This message will only appear once, and won't bother you again</p>
      `,
    });

    game.settings.set(moduleID, "hintPosted", true);
    console.log("oLMJE |", "posted hint");
  }
});
