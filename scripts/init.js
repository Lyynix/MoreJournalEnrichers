// Module specific code goes here. See https://foundryvtt.com/article/module-development/ for help.

CONFIG.TextEditor.enrichers.push(
    {
        pattern: /@Em\[(.*?)\]/g,
        enricher: async(match, options) => {
            const content = match[1]
            return $(`
            <a class="content-link"><em>${content}</em>`)[0]
        }
    },
    {
        pattern: /@SceneMenu\[(.*?)\]/g,
        enricher: async(match, options) => {
            const uuid = match[1]
            return $(`<a  class="content-link" 
                draggable="true" 
                data-uuid="Scene.${uuid}" 
                data-id="${uuid}" 
                data-type="Scene" 
                data-tooltip="Scene">
                    <i class="fas fa-map"></i>main
            </a>`)[0]
        }
    })