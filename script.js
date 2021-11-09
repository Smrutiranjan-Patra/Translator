var button = document.getElementById('translate');
button.addEventListener("click", translate);


async function translate() {
    var input = document.getElementById('input').value;

    function input_lan() {
        var input_language = document.getElementById('input_language').value;
        return input_language;
    }
    function output_lan() {
        var output_language = document.getElementById('output_language').value;
        return output_language;
    }
    var inp = input_lan();
    var out = output_lan();

    const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        body: JSON.stringify({
            q: input,
            source: inp,
            target: out,
        }),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => {
            var result = res.json()
                .then((data) => {
                    var output = document.getElementById('output');
                    if (data.translatedText == undefined) {
                        output.innerText = '';
                    } else {
                        output.innerText = data.translatedText;
                    }
                })
        }).catch((err) => {
            console.log('err', err);
        })

}

var copy = document.getElementById('copy_button');
copy.addEventListener('click', copytext);

function copytext() {
    let text = document.getElementById('output');
    text.select();
    navigator.clipboard.writeText(text.value);
}

var voice_button = document.getElementById('voice_button');
voice_button.addEventListener("click", voice);

function voice() {
    var recoginition = new webkitSpeechRecognition();
    recoginition.lang = "en-GB";
    recoginition.onresult = function (event) {
        // console.log(event);
        let input = document.getElementById('input');
        input.innerText = event.results[0][0].transcript;
    }
    recoginition.start();
}