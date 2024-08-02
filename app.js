const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");

function normalizarTexto(texto) {
    return texto
        .normalize("NFD") 
        .replace(/[\u0300-\u036f]/g, "") 
        .toLowerCase(); 
}


function filtrarTexto(event) {
    let valor = event.target.value;
    let valorNormalizado = normalizarTexto(valor);
    let valorFiltrado = valorNormalizado.replace(/[^a-z\s]/g, '');
    if (valor !== valorFiltrado) {
        alert("Solo se permiten letras minúsculas sin acentos.");
    }
    event.target.value = valorFiltrado;
}

textArea.addEventListener('input', filtrarTexto);

function btnEncriptar() {
    const textoEncriptar = encriptar(textArea.value);
    mensaje.value = textoEncriptar;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function btnDesencriptar() {
    const textoDesencriptar = desencriptar(textArea.value);
    mensaje.value = textoDesencriptar;
    textArea.value = "";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["enter", "e"], ["imes", "i"], ["ai", "a"], ["ober", "o"], ["ufat", "u"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][0])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringDesencriptada;
}

function copiarTexto() {
    mensaje.select();
    mensaje.setSelectionRange(0, 99999);
    document.execCommand("copy");
    mensaje.value = "";
    alert("Texto copiado!");
}
