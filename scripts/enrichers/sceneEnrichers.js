import { EnricherPattern } from "../enricherPattern.js";
import { getDocument, invalidHtml, templates } from "../helpers.js";

export async function sceneMenu(match, options) {
  const ids = match[1].split(EnricherPattern.SEPARATOR);
  const label = match[2] !== undefined ? match[2] : game.i18n.localize("LMJE.SCENEMENU.Title");

  var menuHtml = /* html */ `
    <table class="LMJE-SceneMenu_Table LMJE-Table">
        <tr>
          <th align="left" colspan="2">
            <i class="fas fa-map"></i>
            ${label}
          </td>
        </tr>
    `;

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];

    var sceneDocument
    try {
      sceneDocument = await getDocument(id, "Scene");
    } catch (error) {
      //ignore error
      //TODO: feedback on error
      continue;
    }

    var sceneName = sceneDocument.navName
      ? `${sceneDocument.navName} (${sceneDocument.name})`
      : sceneDocument.name;

    var sceneControl = /* html */ `
    <a title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Show")}" onclick="
      game.scenes.get('${sceneDocument.id}')?.view(); 
      return false;
      ">
      <i class="fas fa-eye" style="margin: 5px"></i>
    </a>
    <a title="${game.i18n.localize(
      "LMJE.SCENEMENU.Tooltip.Activate"
    )}" onclick="
        game.scenes.get('${sceneDocument.id}')?.activate(); 
        return false;
        ">
      <i class="fas fa-bullseye" style="margin: 5px"></i>
    </a>
    <a title="${game.i18n.localize(
      "LMJE.SCENEMENU.Tooltip.ToggleNav"
    )}" onclick="
        var document = game.scenes.get('${sceneDocument.id}'); 
        document.update({navigation: !document.navigation})
        return false;
        ">
      <i class="fas fa-compass" style="margin: 5px"></i>
    </a>
    <a title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Edit")}" onclick="
        new SceneConfig(game.scenes.get('${sceneDocument.id}')).render(true);
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
}

export async function inlineScene(match, options) {
  var id = match[1];
  var sceneDocument
  try {
    sceneDocument = await getDocument(id, "Scene");
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0]
  }

  var sceneName =
    match[2] === undefined
      ? sceneDocument.navName
        ? `${sceneDocument.navName} (${sceneDocument.name})`
        : sceneDocument.name
      : match[2];
  
  var templateData = {
    faIcon: "fa-map",
    label: sceneName,
    buttons: [
      {
        tooltip: "LMJE.SCENEMENU.Tooltip.Show",
        faIcon: "fa-eye",
        onclick: `
          game.scenes.get('${sceneDocument.id}')?.view(); 
          return false;
        `
      },
      {
        tooltip: "LMJE.SCENEMENU.Tooltip.Activate",
        faIcon: "fa-bullseye",
        onclick: `
          game.scenes.get('${sceneDocument.id}')?.activate(); 
          return false;
        `
      },
      {
        tooltip: "LMJE.SCENEMENU.Tooltip.ToggleNav",
        faIcon: "fa-compass",
        onclick: `
          var document = game.scenes.get('${sceneDocument.id}'); 
          document.update({navigation: !document.navigation})
          return false;
        `
      },
      {
        tooltip: "LMJE.SCENEMENU.Tooltip.Edit",
        faIcon: "fa-cogs",
        onclick: `
          new SceneConfig(game.scenes.get('${sceneDocument.id}')).render(true);
          return false;
        `
      }
    ]
  }
  
  var sceneHtml = await renderTemplate(templates.inline, templateData);

  return $(sceneHtml)[0];
}
