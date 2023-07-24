//------Validación formulario doctores------ 

const formulariodoc = document.getElementById('formsdoc')
const inputs = document.querySelectorAll('#formsdoc input')

const expreregdoc = {
    nombredoc: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    apellidodoc: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    ceduladoc: /^[\d]{7,10}$/,
    consultoriodoc: /^[\d]{3,5}$/,
    emaildoc: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = {
    nombredoc: false,
    apellidodoc: false,
    ceduladoc: false,
    consultoriodoc: false,
    emaildoc: false
}

const ValFormdoc = (e) => {
    switch (e.target.name){
        case "nombredoc":
            ValidarCampo(expreregdoc.nombredoc, e.target,'nombredoc')
        break;
        case "apellidodoc":
            ValidarCampo(expreregdoc.apellidodoc, e.target,'apellidodoc')
        break;
        case "ceduladoc":
            ValidarCampo(expreregdoc.ceduladoc, e.target,'ceduladoc')
        break;
        case "consultoriodoc":
            ValidarCampo(expreregdoc.consultoriodoc, e.target,'consultoriodoc')
        break;
        case "emaildoc":
            ValidarCampo(expreregdoc.emaildoc, e.target,'emaildoc')
        break;
    }
}

const ValidarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.add('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__${campo} .forminputerror`).classList.remove('forminputerror-activo')
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campo}`).classList.remove('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__${campo} .forminputerror`).classList.add('forminputerror-activo')
        campos[campo] = false;
    }

}


inputs.forEach((input) => {
    input.addEventListener('keyup', ValFormdoc)
    input.addEventListener('blur', ValFormdoc)
})

formulariodoc.addEventListener('submit', (e) => {

	if(campos.nombredoc && campos.apellidodoc && campos.ceduladoc && campos.consultoriodoc && campos.emaildoc){
    } else {
        e.preventDefault();
        document.getElementById('formmessagedoc').classList.add('formmessage-activo');
    }

});

