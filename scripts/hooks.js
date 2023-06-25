console.log(
  Hooks.on("ready", () => {
    ChatMessage.create({
      user: game.users.find((x) => x.role === 4)._id,
      speaker: {
        alias: "Lyynix' Enhanced Journal Enrichers"
      },
      whisper: game.users.find((x) => x.role === 4)._id,
      content: /* html */ `
          <h3>
            ${game.i18n.localize("LMJE.WELCOME.Title")}
          </h3>
        `,
    });
  })
);
