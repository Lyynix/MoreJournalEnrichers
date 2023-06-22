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
      var sceneRefHtml = /* html */ `
            <a  class="content-link" 
                draggable="true" 
                data-uuid="Scene.${uuid}" 
                data-id="${uuid}" 
                data-type="Scene" 
                data-tooltip="Scene">
                    ${sceneDocument.name}
            </a>
            `;

      var sceneControl = /* html */ `
            <a onclick="
                    game.scenes.get('${uuid}')?.view(); 
                    return false;
                    ">
                <i class="fas fa-eye" style="margin: 5px"></i>
            </a>
            <a onclick="
                    //game.scenes.get('${uuid}')?.update({ active: true }); 
                    game.scenes.get('${uuid}')?.activate(); 
                    return false;
                    ">
                <i class="fas fa-bullseye" style="margin: 5px"></i>
            </a>
            <a onclick="
                    new SceneConfig(game.scenes.get('${uuid}')).render(true);
                    return false;
                    ">
                <i class="fas fa-cogs" style="margin: 5px"></i>
            </a>
            `;

      menuHtml += /* html */ `    
            <tr>
                <td>${sceneRefHtml}</td>
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

class LMJEfunctionality {
  static viewScene(uuid) {
    var sceneDocument = game.scenes.get(uuid);

    return false;
  }

  static activateScene(uuid) {
    var sceneDocument = game.scenes.get(uuid);

    sceneDocument.update({ active: true });

    return false;
  }
}

/* Scene Object:
{
    "name": "main",
    "_id": "TVbcc60tW0Kxy9OL",
    "active": true,
    "navigation": true,
    "navOrder": 0,
    "navName": "",
    "background": {
        "src": null,
        "scaleX": 1,
        "scaleY": 1,
        "offsetX": 0,
        "offsetY": 0,
        "rotation": 0
    },
    "foregroundElevation": 4,
    "width": 4000,
    "height": 3000,
    "padding": 0.25,
    "initial": {
        "x": null,
        "y": null,
        "scale": null
    },
    "backgroundColor": "#999999",
    "grid": {
        "type": 1,
        "size": 100,
        "color": "#000000",
        "alpha": 0.2,
        "distance": 1,
        "units": "Schritt"
    },
    "tokenVision": true,
    "fogExploration": true,
    "fogReset": 1687370264443,
    "globalLight": false,
    "globalLightThreshold": null,
    "darkness": 0,
    "drawings": [],
    "tokens": [],
    "lights": [],
    "notes": [
        {
            "entryId": "vcr3JrfgvvOhOD9r",
            "pageId": "AIRaOqGoe6P1PdoE",
            "text": "",
            "x": 2150,
            "y": 2050,
            "global": false,
            "iconSize": 400,
            "texture": {
                "tint": null,
                "src": "icons/svg/book.svg",
                "scaleX": 1,
                "scaleY": 1,
                "offsetX": 0,
                "offsetY": 0,
                "rotation": 0
            },
            "fontFamily": "Signika",
            "fontSize": 32,
            "textColor": "#FFFFFF",
            "textAnchor": 1,
            "_id": "bpIk82UKowiUaIYJ",
            "flags": {}
        }
    ],
    "sounds": [],
    "templates": [],
    "tiles": [],
    "walls": [],
    "playlist": null,
    "playlistSound": null,
    "journal": null,
    "journalEntryPage": null,
    "folder": null,
    "sort": 0,
    "ownership": {
        "default": 0,
        "sKRd3Ri9cNO5Bi9s": 3
    },
    "flags": {
        "dsa5": {
            "enableDPS": ""
        }
    },
    "_stats": {
        "systemId": "dsa5",
        "systemVersion": "5.0.5",
        "coreVersion": "11.302",
        "createdTime": 1687370264449,
        "modifiedTime": 1687370315239,
        "lastModifiedBy": "sKRd3Ri9cNO5Bi9s"
    },
    "foreground": null,
    "fogOverlay": null,
    "fogExploredColor": null,
    "fogUnexploredColor": null,
    "weather": ""
}
*/
