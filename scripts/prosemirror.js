export function getProsemirrorDropdown() {
  return {
    title: "LMJE.EDITOR.dropdowntitle",
    cssClass: "enrichers",
    entries: [
      {
        actions: 'toc',
        title: 'LMJE.EDITOR.NAMES.toc',
        children: [
          {
            actions: 'orderedtoc',
            title: 'LMJE.EDITOR.NAMES.ordered',
            cmd: insertOrderedToc,
          },
          {
            actions: 'unorderedtoc',
            title: 'LMJE.EDITOR.NAMES.unordered',
            cmd: insertToc,
          }
        ]
      }
    ]
  }
}

function insertOrderedToc() {
  console.log("LMJE | insert ordered toc")
}

function insertToc() {
  console.log("LMJE | insert unordered toc")
}
