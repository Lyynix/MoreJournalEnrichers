import { templates } from "../helpers.js";

export async function chat(match, options) {
  var message = match[1];

  var onClick = `
    ChatMessage.create({
      user: game.users.current,
      content: \`${message}\`
    })
  `;

  var enricherData = {
    click: onClick,
    message: message,
  };

  var html = await renderTemplate(templates.chatTable, enricherData);

  return $(html)[0];
}

export async function whisper(match, options) {
  var message = match[1];

  var otherUsers = game.users.filter((x) => {
    return !x.isSelf;
  });

  var dialogContent = `
    <table>`;
  for (var i = 0; i < otherUsers.length; i++) {
    dialogContent += `
      <tr>
        <td id="LMJE-Whisper_Dialog_User" style="display: flex; align-content:center">
          <img src="${otherUsers[i].avatar}" height="20px">
          <a style="
            display: block;
            width: 10px; height: 10px;
            border-radius: 5px;
            border: 1px black solid;
            background-color: ${otherUsers[i].border.css};
    
            margin-left: 10px;
            margin-top: 4px;
            margin-right: 10px;
          "></a>
          <a onclick="
            ChatMessage.create({
              user: game.users.current,
              whisper: [\`${otherUsers[i]._id}\`],
              content: \`${message}\`
            })
          ">
              ${otherUsers[i].name}
          </a>
        </td>
      </tr>`;
  }
  `</table>
  `;

  var onClick = `
    new Dialog({
      title: '${game.i18n.localize("LMJE.WHISPER.Dialog.Title")}',
      content: '${dialogContent.trim().replace(/(\r\n|\n|\r)/gm, "")}',
      buttons: {
        close: {
          label: '${game.i18n.localize("LMJE.WHISPER.Dialog.Cancel")}',
        }
      },
      default: close,
      close: () => {}
    }).render(true)
  `;

  var enricherData = {
    click: onClick,
    message: message,
  };

  var html = await renderTemplate(templates.whisperTable, enricherData);

  return $(html)[0];
}
