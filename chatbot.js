// Array cu intrebari si raspunsuri 
const bazaDate = [
    { key: "salut", reply: "Salut! Eu sunt bot-ul de pe site." },
    { key: "facultate", reply: "Tudor este student la UVT, in anul 1." },
    { key: "proiecte", reply: "Poti vedea proiectele lui pe pagina de Proiecte." },
    { key: "cine esti", reply: "Sunt un bot." }
];

function trimiteMesaj() {
    let input = document.getElementById("user-input");
    let box = document.getElementById("chat-box");
    let text = input.value.trim().toLowerCase();

    if (text === "") return;

    // afiseaza mesajul tau
    let userP = document.createElement("p");
    userP.className = "user-msg";
    userP.textContent = "Tu: " + input.value;
    box.appendChild(userP);
    
    box.scrollTop = box.scrollHeight; // scroll automat jos
    
    // cautam raspunsul
    let gasit = "Nu stiu sa raspund la asta. Incearca: salut, facultate sau proiecte.";
    
    for (let i = 0; i < bazaDate.length; i++) {
        if (text.includes(bazaDate[i].key)) {
            gasit = bazaDate[i].reply;
            break;
        }
    }

    // rasp botului cu o mica intarziere (0.5 secunde)
    setTimeout(() => {
        let botP = document.createElement("p");
        botP.className = "bot-msg";
        botP.textContent = "Bot: " + gasit;
        box.appendChild(botP);
        
        box.scrollTop = box.scrollHeight; // scroll automat jos
    }, 500);

    input.value = ""; // golim casuta
}

// functia pentru butoanele de sugestii
function puneText(valoare) {
    document.getElementById("user-input").value = valoare;
    trimiteMesaj();
}