import { EnricherPattern } from "../enricherPattern.js";
import { getDocument, invalidHtml } from "../helpers.js";

export async function playlistMenu(match, options) {
  const ids = match[1].split(EnricherPattern.SEPARATOR);

  var menuHtml = /* html */ `
    <table class="LMJE-Playlist_Table LMJE-Table">
      <tr>
        <th align="left" colspan="2">
          <i class="fas fa-music"></i>
          ${game.i18n.localize("LMJE.PLAYLIST.Title")}
        </td>
      </tr>
  `;

  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];

    var playlistDocument;
    try {
      playlistDocument = await getDocument(id, "Playlist");
    } catch (error) {
      continue;
    }

    var playlistName = playlistDocument.name;

    var playlistControl = /* html */ `
    <a 
      title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.PlayPause")}" 
      onclick="
        var playlist = game.playlists.get('${playlistDocument.id}')
        playlist?.playing ? playlist.stopAll() : playlist.playAll(); 
        return false;
      "> 
        <i class="fas fa-play-pause" style="margin: 5px"></i>
    </a> 
    <a 
      title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.FastForward")}" 
      onclick="
      game.playlists.get('${playlistDocument.id}')?.playNext(); 
        return false;
      "> 
        <i class="fas fa-forward-fast" style="margin: 5px"></i>
    </a>
    <a 
      title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.Edit")}" 
      onclick="
        new PlaylistConfig(game.playlists.get('${playlistDocument.id}')).render(true);
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
  var id = match[1];
  var playlist;
  try {
    playlist = await getDocument(id, "Playlist");
  } catch (error) {
    return $(invalidHtml(game.i18n.localize(error)))[0];
  }

  var playlistName = match[2] === undefined ? playlist.name : match[2];

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
      var playlist = game.playlists.get('${playlist.id}')
      playlist?.playing ? playlist.stopAll() : playlist.playAll(); 
      return false;
    "> 
      <i class="fas fa-play-pause" style="margin-left: 4px; color: var(--color-text-dark-inactive);"></i>
  </a> 
  <a 
    title="${game.i18n.localize("LMJE.PLAYLIST.Tooltip.FastForward")}" 
    onclick="
    game.playlists.get('${playlist.id}')?.playNext(); 
      return false;
    "> 
      <i class="fas fa-forward-fast" style="color: var(--color-text-dark-inactive);"></i>
  </a>
  </i>
  `;

  return $(html)[0];
}
