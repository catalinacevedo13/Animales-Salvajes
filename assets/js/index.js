import { Leon, Lobo, Oso, Serpiente, Aguila } from "./tipos.js";
import animalesData from "./animales.js";

let animales = [];
let imagenSrc;
let sonido;

const reloadTable = () => {
    const animalesTemplate = document.getElementById("Animales");
    animalesTemplate.innerHTML = "";
    animales.forEach((p, i) => {
        animalesTemplate.innerHTML += `
            <div class="px-3 pb-2">
                <div class="bg-dark text-white">
                    <img
                        height="200"
                        src=${p.getImg()}
                        data-toggle="modal" data-target="#exampleModal"
                        onclick="modalDetails('${i}')"
                    />
                    <div>
                        <button onclick="playSound('${p.getNombre()}')" class="btn btn-secondary w-100">
                            <img height="30" src="/assets/imgs/lion.svg" />
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
};

document.getElementById("btnRegistrar").addEventListener("click", async (e) => {
    e.preventDefault();
    let nombreElement = document.getElementById("animal");
    let edadElement = document.getElementById("edad");
    let comentarioElement = document.getElementById("comentarios");

    let nombre = nombreElement.value;
    let edad = edadElement.value;
    let comentario = comentarioElement.value;

    if (nombre && edad && comentario) {
        let animal =
            nombre == "Leon"
                ? new Leon(nombre, edad, imagenSrc, comentario, sonido)
                : nombre == "Lobo"
                ? new Lobo(nombre, edad, imagenSrc, comentario, sonido)
                : nombre == "Oso"
                ? new Oso(nombre, edad, imagenSrc, comentario, sonido)
                : nombre == "Serpiente"
                ? new Serpiente(nombre, edad, imagenSrc, comentario, sonido)
                : nombre == "Aguila"
                ? new Aguila(nombre, edad, imagenSrc, comentario, sonido)
                : undefined;

        nombreElement.selectedIndex = 0;
        edadElement.selectedIndex = 0;
        comentarioElement.value = "";
        document.getElementById("preview").style.backgroundImage = "url(./assets/imgs/lion.svg)";
        animales.push(animal);
        reloadTable();
    } else {
        alert("Debe llenar todos los datos del formulario");
    }
});

document.getElementById("animal").addEventListener("change", async (e) => {
    const animalSelected = e.target.value;
    const animalesDataList = await animalesData.getData();
    const animalObject = animalesDataList.find((a) => a.name === animalSelected);
    imagenSrc = `./assets/imgs/${animalObject.imagen}`;
    sonido = animalObject.sonido;
    const preview = document.getElementById("preview");
    preview.parentElement.classList.remove("p-5");
    preview.style.backgroundImage = `url(${imagenSrc})`;
});

window.modalDetails = (i) => {
    let modalBody = document.getElementsByClassName("modal-body")[0];
    let animal = animales[i];
    if (animal) {
        modalBody.innerHTML = `
            <div class="px-3 pb-2">
                <div class="card w-50 m-auto bg-dark text-white border-0">
                    <img src="${animal.getImg()}" class="d-block m-auto w-100"/>
                    <div class="card-body text-center">
                        <h6 class="card-text">${animal.getEdad()}</h6>
                        <h6 class="card-text">COMENTARIOS</h6>
                        <hr/>
                        <p>${animal.getComentarios()}</p>
                    </div>
                </div>
            </div>
        `;
    }
};

window.playSound = (nombre) => {
    let animal = animales.find((a) => a.getNombre() === nombre);

    if (animal) {
        switch (nombre) {
            case 'Leon':
                animal.Rugir();
                break;
            case 'Lobo':
                animal.Aullar();
                break;
            case 'Oso':
                animal.Grunnir();
                break;
            case 'Serpiente':
                animal.Sisear();
                break;
            case 'Aguila':
                animal.Chillar();
                break;
            default:
                break;
        }
    }
};
