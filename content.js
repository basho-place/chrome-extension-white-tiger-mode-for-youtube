const TIGER = image("emoji_u1f405.svg")
const TIGER_FACE = image("emoji_u1f42f.svg")
const CSS = `
img.emoji[alt="π"] {
    content: url("${TIGER}");
}

img.emoji[alt="π―"] {
    content: url("${TIGER_FACE}");
}
`.trim()

const LOG_NAME = "γγ―γ€γγΏγ€γ¬γΌγ’γΌγ for YouTube"

const ENABLED = "enabled"

const state = {
    style: null,
    enabled: false,
}

init()

function init() {
    const style = state.style = document.createElement("style")
    style.textContent = CSS

    chrome.storage.sync.get(ENABLED, result => {
        set(validate(result.enabled))
    })

    chrome.storage.sync.onChanged.addListener(changes => {
        if (ENABLED in changes) {
            set(validate(changes[ENABLED].newValue))
        }
    })
}

function set(enabled) {
    if (state.style === null) {
        warn("styleγnullγ«γͺγ£γ¦γγΎγγ")
        return
    }

    if (state.enabled === enabled) {
        return
    }

    if (enabled) {
        document.head.appendChild(state.style)
        info("ζεΉγ«γͺγγΎγγγ")
    } else {
        document.head.removeChild(state.style)
        info("η‘εΉγ«γͺγγΎγγ")
    }

    state.enabled = enabled
}

function validate(enabled) {
    return enabled !== false;
}

function image(name) {
    return chrome.runtime.getURL(`images/${name}`)
}

function info(message) {
    console.info(`[${LOG_NAME}] ${message}`)
}

function warn(message) {
    console.warn(`[${LOG_NAME}] ${message}`)
}
