const form = document.getElementById("project-form");
const tableBody = document.querySelector("#projects-table tbody");
const dropZone = document.getElementById("drop-zone");
const imageInput = document.getElementById("project-image");
const imageName = document.getElementById("image-name");
const formStatus = document.getElementById("form-status");

const previewImage = document.getElementById("preview-image");
const previewTitle = document.getElementById("preview-title");
const previewDescription = document.getElementById("preview-description");
const previewTech = document.getElementById("preview-tech");
const previewDate = document.getElementById("preview-date");

let imagineAleasa = "";

// stergem mesajele vechi de eroare
function stergeErori() {
    const erori = document.querySelectorAll(".error");
    const campuri = form.querySelectorAll("input, textarea, select");

    erori.forEach(function (eroare) {
        eroare.textContent = "";
    });

    campuri.forEach(function (camp) {
        camp.classList.remove("input-error");
    });

    formStatus.textContent = "";
}

// afisam o eroare langa camp
function arataEroare(idCamp, idEroare, mesaj) {
    document.getElementById(idEroare).textContent = mesaj;
    document.getElementById(idCamp).classList.add("input-error");
}

// verificam daca linkul este valid
function esteUrlValid(text) {
    try {
        new URL(text);
        return true;
    } catch (eroare) {
        return false;
    }
}

// actualizam cardul din dreapta
function actualizeazaPreview() {
    const nume = document.getElementById("project-name").value.trim();
    const descriere = document.getElementById("project-description").value.trim();
    const tech = document.getElementById("project-tech").value;
    const data = document.getElementById("project-date").value;

    previewTitle.textContent = nume || "Numele proiectului";
    previewDescription.textContent = descriere || "Descrierea apare aici in timp ce completezi formularul.";
    previewTech.textContent = tech || "-";
    previewDate.textContent = data || "-";
    previewImage.src = imagineAleasa || "file.png";
}

// citim imaginea aleasa sau trasa in pagina
function citesteImagine(fisier) {
    if (!fisier) {
        return;
    }

    if (!fisier.type.startsWith("image/")) {
        arataEroare("project-image", "image-error", "Fisierul trebuie sa fie imagine.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        imagineAleasa = reader.result;
        imageName.textContent = "Imagine aleasa: " + fisier.name;
        dropZone.classList.add("has-image");
        actualizeazaPreview();
    };

    reader.readAsDataURL(fisier);
}

// verificam formularul inainte sa adaugam proiectul
function valideazaFormular() {
    let valid = true;

    const nume = document.getElementById("project-name").value.trim();
    const descriere = document.getElementById("project-description").value.trim();
    const url = document.getElementById("project-url").value.trim();
    const tech = document.getElementById("project-tech").value;
    const data = document.getElementById("project-date").value;

    if (nume.length < 3) {
        arataEroare("project-name", "name-error", "Numele trebuie sa aiba cel putin 3 caractere.");
        valid = false;
    }

    if (descriere.length < 10) {
        arataEroare("project-description", "description-error", "Descrierea trebuie sa fie putin mai lunga.");
        valid = false;
    }

    if (!esteUrlValid(url)) {
        arataEroare("project-url", "url-error", "Scrie un link valid, de forma https://...");
        valid = false;
    }

    if (tech === "") {
        arataEroare("project-tech", "tech-error", "Alege o tehnologie.");
        valid = false;
    }

    if (data === "") {
        arataEroare("project-date", "date-error", "Alege data finalizarii.");
        valid = false;
    }

    return valid;
}

// adaugam o celula simpla in tabel
function adaugaCelula(rand, text) {
    const celula = document.createElement("td");
    celula.textContent = text;
    rand.appendChild(celula);
}

// adaugam randul nou in tabel
function adaugaProiect() {
    const nume = document.getElementById("project-name").value.trim();
    const descriere = document.getElementById("project-description").value.trim();
    const url = document.getElementById("project-url").value.trim();
    const tech = document.getElementById("project-tech").value;
    const data = document.getElementById("project-date").value;

    const rand = document.createElement("tr");

    adaugaCelula(rand, nume);
    adaugaCelula(rand, descriere);

    const celulaLink = document.createElement("td");
    const link = document.createElement("a");
    link.href = url;
    link.textContent = "Vezi proiect";
    link.target = "_blank";
    link.rel = "noopener";
    celulaLink.appendChild(link);
    rand.appendChild(celulaLink);

    adaugaCelula(rand, tech);

    const celulaImagine = document.createElement("td");
    const imagine = document.createElement("img");
    imagine.src = imagineAleasa || "file.png";
    imagine.alt = "thumbnail pentru " + nume;
    imagine.loading = "lazy";
    celulaImagine.appendChild(imagine);
    rand.appendChild(celulaImagine);

    adaugaCelula(rand, data);

    const celulaButon = document.createElement("td");
    const buton = document.createElement("button");
    buton.type = "button";
    buton.className = "delete-btn";
    buton.textContent = "Sterge";
    celulaButon.appendChild(buton);
    rand.appendChild(celulaButon);

    tableBody.appendChild(rand);
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    stergeErori();

    if (valideazaFormular()) {
        adaugaProiect();
        form.reset();
        imagineAleasa = "";
        imageName.textContent = "";
        dropZone.classList.remove("has-image");
        actualizeazaPreview();
        formStatus.textContent = "Proiectul a fost adaugat in tabel.";
    }
});

form.addEventListener("reset", function () {
    stergeErori();
    imagineAleasa = "";
    imageName.textContent = "";
    dropZone.classList.remove("has-image");
    setTimeout(actualizeazaPreview, 0);
});

// schimbam preview-ul cand scriem in formular
form.addEventListener("input", function () {
    actualizeazaPreview();
});

// cand alegem imaginea normal
imageInput.addEventListener("change", function () {
    stergeErori();
    citesteImagine(imageInput.files[0]);
});

// cand apasam pe zona de drag and drop
dropZone.addEventListener("click", function () {
    imageInput.click();
});


// cand tragem imaginea peste zona
dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZone.classList.add("drag-over");
});

// cand iesim cu imaginea din zona
dropZone.addEventListener("dragleave", function () {
    dropZone.classList.remove("drag-over");
});

// cand lasam imaginea in zona
dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    stergeErori();
    dropZone.classList.remove("drag-over");

    const fisier = event.dataTransfer.files[0];
    imageInput.files = event.dataTransfer.files;
    citesteImagine(fisier);
});

// stergem proiectul din tabel
tableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.closest("tr").remove();
    }
});
