// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

CONFIG.TextEditor.enrichers.push({
  pattern: /@SceneMenu\[(.*?)\]/g,
  enricher: async (match, options) => {
    const uuids = match[1].split(" ");

    var menuHtml = /* html */ `
      <table>
        <tr>
          <td colspan="2">Szenenmenü</td>
        </tr>
      `;

    for (var i = 0; i < uuids.length; i++) {
      var uuid = uuids[i];

      var sceneDocument = game.scenes.get(uuid);

      var sceneName = sceneDocument.navName
        ? `${sceneDocument.navName} (${sceneDocument.name})`
        : sceneDocument.name;

      var sceneControl = /* html */ `
        <a title="Szene anzeigen" onclick="
          game.scenes.get('${uuid}')?.view(); 
          return false;
          ">
          <i class="fas fa-eye" style="margin: 5px"></i>
        </a>
        <a title="Szene aktivieren" onclick="
            game.scenes.get('${uuid}')?.activate(); 
            return false;
            ">
          <i class="fas fa-bullseye" style="margin: 5px"></i>
        </a>
        <a title="Szene in Navigation anzeigen" onclick="
            var document = game.scenes.get('${uuid}'); 
            document.update({navigation: !document.navigation})
            return false;
            ">
          <i class="fas fa-compass" style="margin: 5px"></i>
        </a>
        <a title="Szene bearbeiten" onclick="
            new SceneConfig(game.scenes.get('${uuid}')).render(true);
            return false;
            ">
          <i class="fas fa-cogs" style="margin: 5px"></i>
        </a>
        `;

      menuHtml += /* html */ `    
        <tr>
          <td>${sceneName}</td>
          <td style="display: flex; justify-content: flex-end">${sceneControl}</td>
        </tr>
        `;
    }

    menuHtml += /* html */ `
      </table>
      `;

    return $(menuHtml)[0];
  },
});
