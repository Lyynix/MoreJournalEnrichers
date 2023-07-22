export const templates = {
  whisperTable:
    "modules/lyynix-more-journal-enrichers/templates/whisperTable.hbs",
  chatTable: "modules/lyynix-more-journal-enrichers/templates/chatTable.hbs",
  character: {
    dnd: "modules/lyynix-more-journal-enrichers/templates/characterDnD.html",
    pf2e: "modules/lyynix-more-journal-enrichers/templates/characterPF2e.html",
  },
};

export const patterns = {
  toc: /(@ToC)(\[([a-zA-Z0-9]+)\])?(\{(big|bigger|medium|smaller|small)?\})?/g,
  character: /@Character\[([a-zA-Z0-9]+)\]/g,
  chat: {
    chat: /@Chat\{([\s\S]+?)\}/gm,
    whisper: /@Whisper\{([\s\S]+?)\}/gm,
  },
  scene: {
    menu: /@SceneMenu\[((([a-zA-Z0-9])(\;\s[a-zA-Z0-9])*)+)\]/g,
    inline: /@InlineScene\[([a-zA-Z0-9]+)\](\{(.+)\})?/g,
  },
  playlist: {
    menu: /@PlaylistMenu\[((([a-zA-Z0-9])(\;\s[a-zA-Z0-9])*)+)\]/g,
    inline: /@Playlist\[(\s*[a-zA-Z0-9]+)\](\{(.+)\})?/g,
  },
};

export function invalidHtml(error) {
  return /* html */ `
    <a class="content-link broken" draggable="true" data-id="null" data-uuid="asd">
      <i class="fas fa-unlink"></i>LMJE: ${error}
    </a>
  `;
}
