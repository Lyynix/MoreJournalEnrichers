// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@Em\[(.*?)\]/g,
        enricher: async(match, options) => {
            const content = match[1]
            return $(`
            <em>${content}</em>`)[0]
        }
    })