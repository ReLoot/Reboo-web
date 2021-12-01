const context = require.context('./', true, /\.js$/)
const getLangOptions = () => {
    let options = {}

    context.keys().forEach(element => {
        if(!element.includes('index')) {
            let lang = loadLang(element.replace(/\.\//g, ''))
            options = {...options, ...lang}
        }
    });
    
    return options
}

const loadLang = (file) => {
    let lang = {}, msgs = require(`@/lang/${file}`)
    lang[file.replace(/\.js/g, '')] = msgs.default
    return lang
}


export default getLangOptions