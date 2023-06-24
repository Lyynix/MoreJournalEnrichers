// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

CONFIG.TextEditor.enrichers.push(
  {
    pattern: /@SceneMenu\[((\s*[a-zA-Z0-9]+)+\s*?)\]/g,
    enricher: async (match, options) => {
      const uuids = match[1].split(/\s+/g);

      var menuHtml = /* html */ `
      <table>
        <tr>
          <td colspan="2">${game.i18n.localize("SCENEMENU.Title")}</td>
        </tr>
      `;

      for (var i = 0; i < uuids.length; i++) {
        var uuid = uuids[i];

        var sceneDocument = game.scenes.get(uuid);
        if (!sceneDocument) continue;

        var sceneName = sceneDocument.navName
          ? `${sceneDocument.navName} (${sceneDocument.name})`
          : sceneDocument.name;

        var sceneControl = /* html */ `
        <a title="${game.i18n.localize("SCENEMENU.Tooltip.Show")}" onclick="
          game.scenes.get('${uuid}')?.view(); 
          return false;
          ">
          <i class="fas fa-eye" style="margin: 5px"></i>
        </a>
        <a title="${game.i18n.localize("SCENEMENU.Tooltip.Activate")}" onclick="
            game.scenes.get('${uuid}')?.activate(); 
            return false;
            ">
          <i class="fas fa-bullseye" style="margin: 5px"></i>
        </a>
        <a title="${game.i18n.localize(
          "SCENEMENU.Tooltip.ToggleNav"
        )}" onclick="
            var document = game.scenes.get('${uuid}'); 
            document.update({navigation: !document.navigation})
            return false;
            ">
          <i class="fas fa-compass" style="margin: 5px"></i>
        </a>
        <a title="${game.i18n.localize("SCENEMENU.Tooltip.Edit")}" onclick="
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
  },
  {
    pattern: /(@ToC)(?!\[)/g,
    enricher: async (match, options) => {
      //console.log(options.relativeTo.parent)

      var tocHtml = /* html */ `
        <ul>
      `

      var journalPage = options.relativeTo.parent
      var thisPageId = options.relativeTo._id

      journalPage.pages.forEach(element => {
        tocHtml += /* html */ `
          <li><a>${element.name}</a></li>
        `
      });

      
      tocHtml += /* html */ `
        </ul>
      `

      return $(tocHtml)[0];
    }
  },
  {
    pattern: /(@ToC)(\[((\s*[a-zA-Z0-9]+)+\s*?)\])/g,
    enricher: async (match, options) => {
      
    }
  }
);
