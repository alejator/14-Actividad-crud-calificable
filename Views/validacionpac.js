
//------Validación formulario pacientes------ 

const formulariopac = document.getElementById('formspac')
const inputspac = document.querySelectorAll('#formspac input')

const expreregpac = {
    nombrepac: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    apellidopac: /^[a-zA-ZÀ-ÿ\s\u00f1\u00d1]{1,40}$/,
    cedulapac: /^[\d]{7,10}$/,
    edadpac: /^[\d]{1,3}$/,
    telefonopac: /^\d{7,14}$/,
}

const campospac = {
    nombrepac: false,
    apellidopac: false,
    cedulapac: false,
    edadpac: false,
    telefonopac: false
}

const ValFormpac = (e) => {
    switch (e.target.name){
        case "nombrepac":
            ValidarCampopac(expreregpac.nombrepac, e.target,'nombrepac')
        break;
        case "apellidopac":
            ValidarCampopac(expreregpac.apellidopac, e.target,'apellidopac')
        break;
        case "cedulapac":
            ValidarCampopac(expreregpac.cedulapac, e.target,'cedulapac')
        break;
        case "edadpac":
            ValidarCampopac(expreregpac.edadpac, e.target,'edadpac')
        break;
        case "telefonopac":
            ValidarCampopac(expreregpac.telefonopac, e.target,'telefonopac')
        break;
    }
}

const ValidarCampopac = (expresionpac, inputpac, campopac) => {
    if (expresionpac.test(inputpac.value)){
        document.getElementById(`grupo__${campopac}`).classList.remove('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campopac}`).classList.add('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campopac} i`).classList.remove('fa-circle-xmark')
        document.querySelector(`#grupo__${campopac} i`).classList.add('fa-circle-check')
        document.querySelector(`#grupo__${campopac} .forminputerror`).classList.remove('forminputerror-activo')
        campospac[campopac] = true;
    } else {
        document.getElementById(`grupo__${campopac}`).classList.add('formulariogrupo-incorrecto')
        document.getElementById(`grupo__${campopac}`).classList.remove('formulariogrupo-correcto')
        document.querySelector(`#grupo__${campopac} i`).classList.add('fa-circle-xmark')
        document.querySelector(`#grupo__${campopac} i`).classList.remove('fa-circle-check')
        document.querySelector(`#grupo__${campopac} .forminputerror`).classList.add('forminputerror-activo')
        campospac[campopac] = false;
    }

}



inputspac.forEach((input) => {
    input.addEventListener('keyup', ValFormpac)
    input.addEventListener('blur', ValFormpac)
})

formulariopac.addEventListener('submit', (e) => {

	if(campospac.nombrepac == false || campospac.apellidopac == false  || campospac.cedulapac == false  || campospac.edadpac == false  || campospac.telefonopac == false ){
        e.preventDefault();
        document.getElementById('formmessagepac').classList.add('formmessage-activo');
    }
});


