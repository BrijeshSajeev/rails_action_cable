import consumer from "channels/consumer"

consumer.subscriptions.create("ChatRoomChannel", {
  connected() {
    this.installFormHandler()
  },

  disconnected() {
    if (this.formHandler) {
      document.removeEventListener("submit", this.formHandler)
      this.formHandler = null
    }
  },

  received(data) {
    const messages = document.getElementById("chat-messages")
    if (!messages) return

    const row = document.createElement("p")
    row.className = "chat-row"
    row.innerHTML = `<strong>${data.name}</strong>: ${data.message} <span class="chat-time">${data.sent_at}</span>`
    messages.appendChild(row)
    messages.scrollTop = messages.scrollHeight
  },

  installFormHandler() {
    if (this.formHandler) return

    this.formHandler = (event) => {
      if (event.target.id !== "chat-form") return

      event.preventDefault()
      const nameInput = document.getElementById("chat-name")
      const messageInput = document.getElementById("chat-message-input")
      if (!nameInput || !messageInput) return

      const name = nameInput.value.trim()
      const message = messageInput.value.trim()
      if (!name || !message) return

      this.perform("speak", { name, message })
      messageInput.value = ""
      messageInput.focus()
    }

    document.addEventListener("submit", this.formHandler)
  }
})
