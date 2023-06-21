// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

CONFIG.TextEditor.enrichers.push({
  pattern: /@SceneMenu\[(.*?)\]/g,
  enricher: async (match, options) => {
    const uuids = match[1].split(" ");

    var menuHtml = /*html*/ `
        <table>
            <tr>
                <td colspan="2">Szenenmenü</td>
            </tr>
        `;

    for (var i = 0; i < uuids.length; i++) {
        var uuid = uuids[i];

        var sceneDocument = game.scenes.get(uuid);
        var sceneRefHtml = /* html */ `
            <a  class="content-link" 
                draggable="true" 
                data-uuid="Scene.${uuid}" 
                data-id="${uuid}" 
                data-type="Scene" 
                data-tooltip="Scene">
                    <i class="fas fa-map"></i>${sceneDocument.name}
            </a>
            `;

        var sceneControl = /* html */ `
            <a><i class="fas fa-eye" style="margin: 5px"></i></a><a><i class="fas fa-bullseye" style="margin: 5px"></i></a><a><i class="fas fa-gear-complex" style="margin: 5px"></i></a>
            `;

        menuHtml += /* html */ `    
            <tr>
                <td>${sceneRefHtml}</td>
                <td width="100em">${sceneControl}</td>
            </tr>
            `;
    }

    menuHtml += /* html */ `
        </table>
        `;

    return $(menuHtml)[0];
  },
});
