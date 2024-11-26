let langOption = document.querySelectorAll("select");
let fromText = document.querySelector(".fromText");
let transText = document.querySelector(".toTranslate");
let fromVoice = document.querySelector(".from");
let toVoice = document.querySelector(".to");
let cpyBtn = document.querySelector(".bx-copy");
let countValue = document.querySelector(".code_length");
let exchangeLang = document.querySelector(".bx-transfer");

const BASE_API_URL = "http://localhost:3000/"

async function getBase64Tts(text, lang) {
  return axios(BASE_API_URL + 'tts', {
    params: { text, lang },
  }).then((res) => res.data);
}

// Render language list
langOption.forEach((get, con) => {
  for (let countryCode in language) {
    let selected;
    if (con == 0 && countryCode == "en") {
      selected = "selected";
    } else if (con == 1 && countryCode == "vi") {
      selected = "selected";
    }

    let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
    get.insertAdjacentHTML("beforeend", option);
  }
});

// Catching input event
fromText.addEventListener("input", (e) => {
  if (langOption[0].value === "vi") {
    const text = numberToWordsVn(fromText.value);
    transText.value = text;
  }
  else if(langOption[0].value == "en") {
    const text = numberToWordsEng(fromText.value);
    transText.value = text;
  }
})

// Catching TTS
toVoice.addEventListener("click", async () => {
  try {
    const audioBase64 = await getBase64Tts(transText.value, langOption[0].value);
    const base64Audio = 'data:audio/mp3;base64,' + audioBase64;

    const audioBlob = await fetch(base64Audio).then((res) => res.blob());
    const audioUrl = URL.createObjectURL(audioBlob);

    const audio = new Audio(audioUrl);
    await audio.play();
  } catch {
    alert("Internal error")
  }
})

cpyBtn.addEventListener("click", function () {
  navigate.clipboard.writeText(transText.value);
});

fromText.addEventListener("keyup", function () {
  countValue.innerHTML = `${fromText.value.length}/5,000`;
});
