// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@Post\[(.*?)\]/g,
        enricher: async(match, options) => {
            const content = match[1]
            return $(`
            <div class="row-section wrap maskfield postChatSection">
                <div class="col ninety"></div>
                <div class="col ten center postContentChat" data-tooltip="SHEET.PostItem">
                    <em class="far fa-comment-dots"></em>
                </div>
                <div class="col postChatContent">${content}</div>
            </div>
            `)[0]
        }
    })