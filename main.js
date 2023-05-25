// este componente funciona a traves de un arreglo
//ese texto lo voy a agregar a un arreglo

let tags = [];

const inputTagContainer = document.querySelector("#input-tag"); // esta es la referencia al html
const tagsContainer = document.createElement("div");
const inputTag = document.createElement("span"); // se usa span porque se adapta al tamaño total del texto

inputTag.ariaRoleDescription = "textbox"; // accesibilidad
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

inputTagContainer.addEventListener("click", (e) => {
  // cuando yo le de click a mi contenedor no es un input nativo
  if (
    e.target.id === "input-tag" || //aqui reegreso el foco a este span
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus();
  }
});

inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTag.textContent !== "") {
    // cuando presione enter y tenga texto en mi input
    e.preventDefault();
    if (!existTag(inputTag.textContent)) {
      tags.push(inputTag.textContent); // voy a añadir ese texto al array tags
      inputTag.textContent = ""; // voy a eliminar el contenido
      renderTags(); // y al final llamo a esta function
    }
  } else if ( // si entonces la tecla que estoy usando para eliminar es backspace deberia hacerlo 
    e.key === "Backspace" &&
    inputTag.textContent === "" &&
    tags.length > 0
  ) {
    tags.pop();
    renderTags();
  }
});

function renderTags() {
  // lo que voy a hacer es agarrar tags iterarlo y agregarle botoncitos con el valor
  tagsContainer.innerHTML = "";
  const html = tags.map((tag) => {
    // de cada uno de los elementos que ya submitie como etiquetas
    const tagElement = document.createElement("div");
    const tagButton = document.createElement("button");

    tagElement.classList.add("tg-item");
    tagButton.textContent = "X";
    tagButton.addEventListener("click", (e) => {
      //eliminar etiqueta
      removeTag(tag);
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagButton);
    return tagElement;
  });

  html.forEach((element) => {
    // cada uno de estos elementos agregarlo a mi capa principal
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag); // por ultimo como estoy renderizando todo debo renderizar mi input
  inputTag.focus();
}

function existTag(value){// vamos a crear una function que no permite crear el mismo tag
    return tags.includes(value);
}

function removeTag(value){// aca vamos a crear una funcion para eliminar una etiqueta de mi arreglo
    tags = tags.filter(tag => tag !== value);
    renderTags();
}