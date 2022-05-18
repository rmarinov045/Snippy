chrome.storage.local.get('snippets', (snippets) => {

    if (!snippets.snippets || snippets.snippets?.length === 0) return

    setInterval(() => {
        document.querySelectorAll('input').forEach(i => {
            i.addEventListener('keyup', (e) => {

                if (!e) return

                if (snippets.snippets.some(snippet => e.target.value.toLowerCase().includes(snippet.shortcut))) {
                    const { shortcut, outputText } = snippets.snippets.find(snippet => e.target.value.toLowerCase().includes(snippet.shortcut))
                    e.target.value = e.target.value.replace(shortcut, outputText)
                }

            }, 500)
        })

        document.querySelectorAll('textarea').forEach(i => {
            i.addEventListener('keyup', (e) => {

                if (!e) return

                if (snippets.snippets.some(snippet => e.target.value.toLowerCase().includes(snippet.shortcut))) {
                    const { shortcut, outputText } = snippets.snippets.find(snippet => e.target.value.toLowerCase().includes(snippet.shortcut))
                    e.target.value = e.target.value.replace(shortcut, outputText)
                }

            }, 500)
        })
    })
})