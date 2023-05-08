const OPENAI_API_KEY = config.OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/chat/completions';

const chatHistory = document.querySelector('.history');
const chatInput = document.querySelector('.chat-input');
const submitButton = document.querySelector('#submit');
const output = document.querySelector('#output');
const input = document.querySelector('input');
const newChat = document.querySelector('#new-chat');

function changeInput(value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value;
}

async function getMessage() {
    console.log('Clicked!')
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": input.value}],
            max_tokens: 100,
            temperature: 0.9,
            top_p: 1,
            presence_penalty: 0,
            frequency_penalty: 0,
            stop: ["\n", " Human:", " AI:"]
        })
    }
    try {
        const response = await fetch(endpoint, options)
            const data = await response.json()
            console.log(data)
            output.textContent = data.choices[0].message.content
            if (data.choices[0].message.content) {
                const pElement = document.createElement('p')
                pElement.textContent = input.value
                pElement.addEventListener('click', () => changeInput(pElement.textContent))
                chatHistory.append(pElement)
            }
    } catch (error) {
        console.error(error)
    }

}

submitButton.addEventListener('click', getMessage);

function clearInput() {
    input.value = '';
}

newChat.addEventListener('click', clearInput);
