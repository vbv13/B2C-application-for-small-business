export const validate = (element, formdata = []) => {
    let error = [true, ''];

    if(element.validation.email){
        const valid = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b/.test(element.value);
        const message = `${!valid ? 'Type valid email':''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required':''}`;
        error = !valid ? [valid, message] : error;
    }

    return error
}


export const update = (element, formdata, formName) => {
    const newFormdata = {
        ...formdata
    }
    const newElement = {
        ...newFormdata[element.id]      //this will be an email, we have a copy of it right now
    }

    newElement.value = element.event.target.value;

    if(element.blur){
        let validData = validate(newElement, formdata);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

}

export const generateData = (formdata, formName) => {
    let dataToSubmit = {};

    for(let key in formdata){
        dataToSubmit[key] = formdata[key].value;
    }

    return dataToSubmit;
}

export const isFormValid = (formdata, formName) => {
    let formIsValid = true;

    for(let key in formdata){
        formIsValid = formdata[key].valid && formIsValid
    }
    return formIsValid;
}