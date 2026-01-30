const API_URL = "http://127.0.0.1:8000/chat";

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: text
    })
  })
  .then(res => res.json())
  .then(data => {
    addMessage(data.reply, "bot");
  })
  .catch(() => {
    addMessage("Backend connect nahi ho raha ❌", "bot");
  });
}

function addMessage(text, type) {
  const chat = document.getElementById("chatArea");
  const div = document.createElement("div");
  div.className = type;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
