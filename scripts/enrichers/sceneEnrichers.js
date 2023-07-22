import { invalidHtml } from "../helpers.js";

export async function sceneMenu(match, options) {
  const uuids = match[1].split(/\;\s+/g);

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

  for (var i = 0; i < uuids.length; i++) {
    var uuid = uuids[i];

    var sceneDocument = game.scenes.get(uuid);
    if (!sceneDocument) continue;

    var sceneName = sceneDocument.navName
      ? `${sceneDocument.navName} (${sceneDocument.name})`
      : sceneDocument.name;

    var sceneControl = /* html */ `
    <a title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Show")}" onclick="
      game.scenes.get('${uuid}')?.view(); 
      return false;
      ">
      <i class="fas fa-eye" style="margin: 5px"></i>
    </a>
    <a title="${game.i18n.localize(
      "LMJE.SCENEMENU.Tooltip.Activate"
    )}" onclick="
        game.scenes.get('${uuid}')?.activate(); 
        return false;
        ">
      <i class="fas fa-bullseye" style="margin: 5px"></i>
    </a>
    <a title="${game.i18n.localize(
      "LMJE.SCENEMENU.Tooltip.ToggleNav"
    )}" onclick="
        var document = game.scenes.get('${uuid}'); 
        document.update({navigation: !document.navigation})
        return false;
        ">
      <i class="fas fa-compass" style="margin: 5px"></i>
    </a>
    <a title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Edit")}" onclick="
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
}

export async function inlineScene(match, options) {
  var uuid = match[1];
  var sceneDocument = game.scenes.get(uuid);
  if (!sceneDocument) return $(invalidHtml("invalid sceneID"))[0];

  var sceneName =
    match[2] === undefined
      ? sceneDocument.navName
        ? `${sceneDocument.navName} (${sceneDocument.name})`
        : sceneDocument.name
      : match[3];

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
        game.scenes.get('${uuid}')?.view(); 
        return false;
      ">
        <i class="fas fa-eye" style="margin-left: 4px; color: var(--color-text-dark-inactive);"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Activate")}" 
      onclick="
        game.scenes.get('${uuid}')?.activate(); 
        return false;
      ">
        <i class="fas fa-bullseye" style="color: var(--color-text-dark-inactive);"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.ToggleNav")}" 
      onclick="
        var document = game.scenes.get('${uuid}'); 
        document.update({navigation: !document.navigation})
        return false;
      ">
        <i class="fas fa-compass" style="color: var(--color-text-dark-inactive);"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.SCENEMENU.Tooltip.Edit")}" 
      onclick="
        new SceneConfig(game.scenes.get('${uuid}')).render(true);
        return false;
      ">
        <i class="fas fa-cogs" style="color: var(--color-text-dark-inactive);"></i>
    </a>
    </i>
    `;

  return $(sceneHtml)[0];
}
