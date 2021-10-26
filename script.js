
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
                        alert('Please Write Somethng');
                        output.innerText = '';
                    } else {
                        output.innerText = data.translatedText;
                    }
                })
        }).catch((err) => {
            console.log('err', err);
        })

}

var copy = document.getElementById('copy');
copy.addEventListener('click', copytext);

function copytext() {
    let text = document.getElementById('output');
    text.select();
    navigator.clipboard.writeText(text.value);
}


