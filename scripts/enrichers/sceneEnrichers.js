import { EnricherPattern } from "../enricherPattern.js";
import { getDocument, invalidHtml } from "../helpers.js";

export async function sceneMenu(match, options) {
  const ids = match[1].split(EnricherPattern.SEPARATOR);

  var menuHtml = /* html */ `
    <table class="LMJE-SceneMenu_Table">
      <style>
        .LMJE-SceneMenu_Table {
          border-spacing: 0;
          border-collapse: separate;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px var(--color-border-dark-5) solid;
        }
        .LMJE-SceneMenu_Table tr th {
          background: #00000030
        }
      </style>
        <tr>
          <th colspan="2">${game.i18n.localize("LMJE.SCENEMENU.Title")}</td>
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
  
  var sceneHtml = /* html */ `
    <i style="
      border: 1px var(--color-border-dark-tertiary) solid;
      border-radius: 3px;
      padding: 1px 4px;
      margin-right: 0.3em;

      white-space: nowrap;
      word-break: break-all;

      background: #DDD;
    ">
    ${sceneName}
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Show")}" 
      onclick="
        game.scenes.get('${sceneDocument.id}')?.view(); 
        return false;
      ">
        <i class="fas fa-eye" style="margin-left: 4px; color: var(--color-text-dark-inactive);"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Activate")}" 
      onclick="
        game.scenes.get('${sceneDocument.id}')?.activate(); 
        return false;
      ">
        <i class="fas fa-bullseye" style="color: var(--color-text-dark-inactive);"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.ToggleNav")}" 
      onclick="
        var document = game.scenes.get('${sceneDocument.id}'); 
        document.update({navigation: !document.navigation})
        return false;
      ">
        <i class="fas fa-compass" style="color: var(--color-text-dark-inactive);"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Edit")}" 
      onclick="
        new SceneConfig(game.scenes.get('${sceneDocument.id}')).render(true);
        return false;
      ">
        <i class="fas fa-cogs" style="color: var(--color-text-dark-inactive);"></i>
    </a>
    </i>
    `;

  return $(sceneHtml)[0];
}