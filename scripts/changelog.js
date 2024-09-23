export const allVersions = ["1.0.0", "1.1.0", "1.2.0", "1.2.1"];
export const changelog_en = {
  '1.3.0': {
    name: "1.3.0",
    additions: [
      {
        change: "Enrichers can now be added with the Prosemirror editor",
        explanations: [
          "In the Prosemirror editor, you can now select the enrichers from a dropdown menu.",
          "The module lets you select documents, enter aliases etc automatically.",
          "Currently menus can't be added with the Prosemirror editor"
        ]
      },
      {
        change: "Checkboxes and conditional text",
        explanations: [
          "The @​Checkbox or @​CB enricher lets you add functional Checkboxes, that store wether they are selected or not.",
          "The @​IfChecked lets you add text, that is shown when the connected checkbox is checked."
        ]
      },
      {
        change: "Polyglot integration",
        explanations: [
          "If the module Polyglot is installed and active, you can use the @​Polyglot or @​Translate enricher.",
          "This enricher lets you enter text, that gets scrambled if the players character doesn't understand the language. The text can also be posted to the chat."
        ]
      },
      {
        change: "Text can be multiline",
        explanations: [
          "Many enrichers that handle text (ChatPost, ChatWhisper, Polyglot, ...) can now have multiline text.",
          "To make a new line, separate lines using a semicolon ';'."
        ]
      }
    ],
    fixes: [
      {
        change: "Menus can now be separated by ';'. No space needed anymore.",
        explanations: []
      },
      {
        change: "RollTableMenu now has the correct Title",
        explanations: []
      }
    ]
  },
  "1.2.1": {
    name: "1.2.1",
    additions: [],
    fixes: [
      {
        change:
          "Fixed issue, where the @Page​[] enricher wouldn't render in textboxes that didn't belong to a journal page.",
        explanations: [],
      },
      {
        change:
          "When embedding a Scene through @​SceneFull[], that has a video background, the video is now muted.",
        explanations: [],
      },
      {
        change: 'Fixed the title of @​RolltableMenu[] saying "Playlist Menu".',
        explanations: [],
      },
    ],
  },
  "1.2.0": {
    name: "1.2.0",
    additions: [
      {
        change: "The possibility to add variables",
        explanations: [
          "A button in the header of the texteditor to edit existing variables and add new ones",
          "Enricher @Var​[] in which the key of a variable can be entered. The Enricher will be replaced by the value stored in the variable",
        ],
      },
      {
        change: "@Page Enricher, to add the content of another page",
        explanations: [
          "[] has the ID/name of the referenced page, () optionally contains the UUID/ID/name of the journal that contains the page",
          "() is needed, if there are multiple journals containing a page with that name from []",
          "This enricher works for text, image and video pages",
        ],
      },
      {
        change:
          "The @​SceneFull enricher now can preview the background of a Scene, if the background is a video file",
        explanations: [],
      },
      {
        change: "The @​Scene enrichers now have a button to preload the scene",
        explanations: [],
      },
    ],
    fixes: [
      {
        change:
          "fixed problems with the chat post from the @Info​[] enricher from the dsa5 system",
        explanations: [],
      },
    ],
  },
  "1.1.0": {
    name: "1.1.0",
    additions: [
      {
        change:
          "JournalEntry with introduction and further instructions for enrichers (English and German)",
        explanations: [],
      },
    ],
    fixes: [
      {
        change:
          'Fixed small issues that occured in combination with "Yendor\'s UI"',
        explanations: [],
      },
    ],
  },
  "1.0.0": {
    name: "1.0.0",
    additions: [
      {
        change: "Polished Code for release",
        explanations: [],
      },
    ],
    fixes: [],
  },
};

export const changelog_de = {
  '1.3.0': {
    name: "1.3.0",
    additions: [
      {
        change: "Enricher können jetzt mit dem Prosemirror Editor eingefügt werden.",
        explanations: [
          "Im Prosemirror Editor können die Enricher aus einem Dropdownmenü ausgewählt werden.",
          "Der/die Nutzer*in wird automatisch zum Auswählen der benötigten Informationen aufgefordert.",
          "Zur Zeit können keine Listen/Menüs über Prosemirror eingefügt"
        ]
      },
      {
        change: "Checkboxes and conditional text",
        change: "Checkboxen und bedingter Text",
        explanations: [
          "Der @​Checkbox oder @​CB Enricher fügt funktionale Checkboxen ein, die ihren Zustand speichern können.",
          "Der @​IfChecked Enricher fügt Text ein, der nur gezeigt wird, wenn die verbundene Checkbox aktiv ist."
        ]
      },
      {
        change: "Polyglot Integration",
        explanations: [
          "Wenn das Modul Polyglot installiert und aktiviert ist, kann der @​Polyglot oder @​Translate Enricher verwendet werden.",
          "Dieser Enricher fügt Text ein, der gemäß Polyglot unkenntlich gemacht wird, wenn der Spielercharakter die Sprache nicht versteht. Der Text kann dann auch im Chat gepostet werden."
        ]
      },
      {
        change: "Text kann jetzt Mehrzeilig sein",
        explanations: [
          "Viele Enricher, die Text handhaben können jetzt mehrzeilig verwendet werden. (ChatPost, ChatWhisper, Polyglot, ...)",
          "Um eine neue Zeile zu erstellen, trenne die Zeilen mit einem Semikolon ';'."
        ]
      }
    ],
    fixes: [
      {
        change: "Listen/Menüs können jetzt nur durch ein Semikolon ';' getrennt werden. Kein Leerzeichen mehr nötig.",
        explanations: []
      },
      {
        change: "RollTableMenu hat jetzt den korrekten Titel",
        explanations: []
      }
    ]
  },
  "1.2.1": {
    name: "1.2.1",
    additions: [],
    fixes: [
      {
        change:
          "Der @Page​[] Enricher kann nun auch in Textfeldern verwendet werden, die nicht zu einem Journal gehören",
        explanations: [],
      },
      {
        change:
          "Wenn die Szene, die mit dem @​SceneFull[] Enricher eingebettet wird, ein Video als Hintergrund hat, ist das Video jetzt Stumm.",
        explanations: [],
      },
      {
        change:
          'Der Title von @RolltableMenu​[] lautet nun nicht mehr "Playlistenmenü"',
        explanations: [],
      },
    ],
  },
  "1.2.0": {
    name: "1.2.0",
    additions: [
      {
        change: "Es gibt nun die Möglichkeit, Platzhalter zu definieren",
        explanations: [
          "Es gibt einen Button im Header des Texteditors, um bestehende Platzhalter zu bearbeiten und neue einzufügen",
          "Der Enricher @Var​[] nimmt den Platzhalter zwischen den [] und fügt den definierten Text ein",
        ],
      },
      {
        change:
          "Der @Page Enricher, mit dem der Inhalt einer anderen Seite eingefügt werden kann",
        explanations: [
          "[] bekommt den Namen/ die ID der einzufügenden Seite, () ist optional und bekommt die UUID/ID/den Namen des Journals, aus dem die Seite kommt",
          "() wird benötigt, wenn es mehrere Journale gibt, die mindestens eine Seite mit dem Namen aus [] haben",
          "Dieser Enricher funktioniert für Text, Bild und Video Seiten",
        ],
      },
      {
        change:
          "Der @​SceneFull Enricher kann jetzte eine Vorschau des Szenenhintergrunds anzeigen, wenn der Hintergrund ein Video ist",
        explanations: [],
      },
      {
        change:
          "Die @​Scene Enricher haben jetzt einen Button zum Vorladen der Szene",
        explanations: [],
      },
    ],
    fixes: [
      {
        change:
          "Probleme mit dem Chatpost des @Info​[] Enrichers aus dem DSA5 System wurden behoben",
        explanations: [],
      },
    ],
  },
  "1.1.0": {
    name: "1.1.0",
    additions: [
      {
        change:
          "JournalEntry mit Einführung und weiteren Informationen wurde erstellt (Englisch und Deutsch)",
        explanations: [],
      },
    ],
    fixes: [
      {
        change: 'Kleine Konflikte mit "Yendor\'s UI" wurden behoben',
        explanations: [],
      },
    ],
  },
  "1.0.0": {
    name: "1.0.0",
    additions: [
      {
        change: "Code wurde zum Release vorbereitet",
        explanations: [],
      },
    ],
    fixes: [],
  },
};
