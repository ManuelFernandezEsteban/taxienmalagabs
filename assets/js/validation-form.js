
class HtmlElementObserver {
    constructor(element) {
        this.element = element;
    }

    refresh(data) {
        this.element.innerHTML = data;
    }

}
class Error extends Sujeto {
    constructor() {
        super();
        this.data = '';
    }
    add(item) {
        this.data = item;
        this.notify(this.data);
    }
}

function dosDigitos(digito) {
    if (digito === 0) {
        digito = '01';
    } else if (digito > 0 && digito < 10) {
        digito = `0${digito}`;
    }
    return digito
}


function initDate() {
    const inputDate = document.querySelector('#fecha');
    const fechaHoy = new Date();
    const [month, day, year] = [fechaHoy.getMonth(), fechaHoy.getDate(), fechaHoy.getFullYear()];
    const stFechaHoy = `${year}-${dosDigitos(month + 1)}-${dosDigitos(day)}`;

    inputDate.setAttribute('min', stFechaHoy)
}
initDate();
const errorName = new HtmlElementObserver(msgErrorName);
const errorEmail = new HtmlElementObserver(msgErrorEmail);
const errorPhone = new HtmlElementObserver(msgErrorPhone);
const errorDate = new HtmlElementObserver(msgErrorDate);
const errorTime = new HtmlElementObserver(msgErrorTime);
const spanPax = new HtmlElementObserver(paxSpan);
const spanPrivacidad = new HtmlElementObserver(privacySpan);
const nameInput = new Error();
const emailInput = new Error();
const phoneInput = new Error();
const dateInput = new Error();
const timeInput = new Error();
const paxInput = new Error();
const inputPrivacidad = new Error();
nameInput.subscribe(errorName);
emailInput.subscribe(errorEmail);
phoneInput.subscribe(errorPhone);
dateInput.subscribe(errorDate);
timeInput.subscribe(errorTime);
paxInput.subscribe(spanPax);
inputPrivacidad.subscribe(spanPrivacidad);

function validarNombre() {
    const valueInputName = document.querySelector('#name').value;
    if (valueInputName.trim() === '') {
        nameInput.notify('Indique a nombre de quien será la reserva');
        return false;
    } else {
        nameInput.notify('');
    }
    return true;
}
function validarEmail() {

    const inputEmail = document.querySelector('#email');
    const valueInputEmail = inputEmail.value;
    if (valueInputEmail.trim() === '' || !inputEmail.validity.valid) {
        emailInput.notify('Indique un mail válido');
        return false;
    } else {
        emailInput.notify('');
    }
    return true;
}
function validarPhone() {
    const valueInputPhone = document.querySelector('#phone').value;
    if (valueInputPhone.trim() === '') {
        phoneInput.notify('Indique un teléfono de contacto para la reserva');
        return false;
    } else {
        phoneInput.notify('');
    }
    return true;
}
function validarFecha() {
    const valueInputDate = document.querySelector('#fecha').value;

    if (valueInputDate === '') {
        dateInput.notify('Indique una fecha para la reserva')
        return false;
    }
    dateInput.notify('');
    return true;
}

function validarHora() {
    const valueInputTime = document.querySelector('#hora').value;

    if (valueInputTime === '') {
        timeInput.notify('Indique una hora para la reserva')
        return false;
    }
    timeInput.notify('');
    return true;
}

function validarConditions() {

    if (!conditions.checked) {
        inputPrivacidad.notify('Debe acepatar las condiciones de la reserva');
        return false;
    }
    inputPrivacidad.notify('');
    return true;
}
function validarFormulario() {

    //validamos nombre
    let esValido = validarNombre();
    if (!esValido) {
        return esValido;

    }
    esValido = validarEmail();
    if (!esValido) {
        return esValido;
    }
    esValido = validarPhone();
    if (!esValido) {
        return esValido;
    }
    esValido = validarFecha();
    if (!esValido) {
        return esValido
    }
    esValido = validarHora();
    if (!esValido) {
        return esValido
    }
    esValido = validarConditions();
    if (!esValido) {
        return esValido;
    }

    return esValido;
}


btnConfirmarReserva.addEventListener('click', (event) => {
    event.preventDefault();
    const esValido = validarFormulario();

    if (esValido) {
        //enviamos formulario
        const data = new FormData(formReserva);
        const values = Object.fromEntries(data.entries());

        //    formReserva.submit()
        formReserva.reset();
        precio.value = 0;

    }

})