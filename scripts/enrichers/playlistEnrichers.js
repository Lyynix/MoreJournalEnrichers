import { invalidHtml } from "../helpers.js";

export async function playlistMenu(match, options) {
  const uuids = match[1].split(/\;\s/g);

  var menuHtml = /* html */ `
    <table class="LMJE-Playlist_Table">
      <style>
        .LMJE-Playlist_Table {
          border-spacing: 0;
          border-collapse: separate;
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px var(--color-border-dark-5) solid;
        }
        .LMJE-Playlist_Table tr th {
          background: #00000030
        }
      </style>
      <tr>
        <th colspan="2">${game.i18n.localize("LMJE.PLAYLIST.Title")}</td>
      </tr>
  `;

  for (var i = 0; i < uuids.length; i++) {
    var uuid = uuids[i];

    var playlistDocument = game.playlists.get(uuid);
    if (!playlistDocument) continue;

    var playlistName = playlistDocument.name;

    var playlistControl = /* html */ `
    <a 
      title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.PlayPause")}" 
      onclick="
        var playlist = game.playlists.get('${uuid}')
        playlist?.playing ? playlist.stopAll() : playlist.playAll(); 
        return false;
      "> 
        <i class="fas fa-play-pause" style="margin: 5px"></i>
    </a> 
    <a 
      title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.FastForward")}" 
      onclick="
      game.playlists.get('${uuid}')?.playNext(); 
        return false;
      "> 
        <i class="fas fa-forward-fast" style="margin: 5px"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.Edit")}" 
      onclick="
        new PlaylistConfig(game.playlists.get('${uuid}')).render(true);
        return false;
      ">
        <i class="fas fa-cogs" style="margin: 5px"></i>
    </a>
  `;

    menuHtml += /* html */ `    
  <tr>
    <td>${playlistName}</td>
    <td style="display: flex; justify-content: flex-end">${playlistControl}</td>
  </tr>
  `;
  }

  menuHtml += /* html */ `
</table>
`;

  return $(menuHtml)[0];
}

export async function inlinePlaylist(match, options) {
  var uuid = match[1];
  var playlist = game.playlists.get(uuid);
  if (!playlist) return $(invalidHtml("invalid playlistID"))[0];

  var playlistName = match[2] === undefined ? playlist.name : match[3];

  var html = /* html */ `
  <i style="
    border: 1px var(--color-border-dark-tertiary) solid;
    border-radius: 3px;
    padding: 1px 4px;
    margin-right: 0.3em;

    white-space: nowrap;
    word-break: break-all;

    background: #DDD;
  ">
  ${playlistName}
  <a 
    title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.PlayPause")}" 
    onclick="
      var playlist = game.playlists.get('${uuid}')
      playlist?.playing ? playlist.stopAll() : playlist.playAll(); 
      return false;
    "> 
      <i class="fas fa-play-pause" style="margin-left: 4px; color: var(--color-text-dark-inactive);"></i>
  </a> 
  <a 
    title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.FastForward")}" 
    onclick="
    game.playlists.get('${uuid}')?.playNext(); 
      return false;
    "> 
      <i class="fas fa-forward-fast" style="color: var(--color-text-dark-inactive);"></i>
  </a>
  </i>
  `;

  return $(html)[0];
}
