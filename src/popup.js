const containerElement = document.querySelector('.snippet-container')
const snippetList = document.querySelector('.list')
const createButtonElement = document.querySelector('#create-btn')
const formElement = document.querySelector('.snippet-creator')
const backArrowElement = document.querySelector('.back-arrow')
const deleteButtonElement = document.getElementById('delete-btn')

const placeholderElement = document.createElement('p')
placeholderElement.innerText = 'No snippets yet. Click the create button to start!'

chrome.storage.local.get('snippets', async (snippets) => {
    if (snippets.snippets && snippets.snippets.length > 0) {
        snippets.snippets.forEach(snippet => {
            const snippetElement = document.createElement('p')
            snippetElement.innerText = `Shortcut: ${snippet.shortcut}, Text to output:\n${snippet.outputText}`
            snippetList.appendChild(snippetElement)
        })
    } else {
        snippetList.appendChild(placeholderElement)
        await chrome.storage.local.set({ 'snippets': [] })
    }
})

createButtonElement.addEventListener('click', () => {
    formElement.style.display = 'block'
    containerElement.style.display = 'none'
})

backArrowElement.addEventListener('click', () => {
    formElement.style.display = 'none'
    containerElement.style.display = 'block'
})

deleteButtonElement.addEventListener('click', async (e) => {
    await chrome.storage.local.remove('snippets')
    window.location.reload()
    snippetList.replaceChildren(createButtonElement, deleteButtonElement, placeholderElement)
})

formElement.addEventListener('submit', async (e) => {
    e.preventDefault()
    const { shortcut, outputText } = Object.fromEntries(new FormData(e.target))

    if (!shortcut || !outputText) return

    let { snippets } = await chrome.storage.local.get('snippets')

    snippets.push({ shortcut, outputText })
    await chrome.storage.local.set({ 'snippets': snippets })

    e.target.reset()

    window.location.reload()
    formElement.style.display = 'none'
    containerElement.style.display = 'block'
})