export const validate = (element, formdata = []) => {
    let error = [true, ''];

    if(element.validation.email){
        const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(element.value);
        const message = `${!valid ? 'Wpisz poprawny email':''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Wprowadzone hasła nie pasują':''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.required){
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'To pole jest wymagane':''}`;
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

    newElement.touched = element.blur;
    newFormdata[element.id] = newElement;

    return newFormdata;
}

export const generateData = (formdata, formName) => {
    let dataToSubmit = {};

    for(let key in formdata){
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
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

export const populateOptionFields = (formdata, arrayData = [], field) => {
    const newArray = []
    const newFormdata = {...formdata}

    arrayData.forEach(item=>{
        newArray.push({key:item._id, value:item.name})
    })

    newFormdata[field].config.options = newArray
    return newFormdata
}

export const resetFields = (formdata, formName) => {
    const newFormdata = {...formdata};

    for(let key in newFormdata){
        if(key === 'images'){
            newFormdata[key].value = []
        } else {
            newFormdata[key].value = ''
        }

        newFormdata[key].valid = false
        newFormdata[key].touched = false
        newFormdata[key].validationMessage = ''
    }
    return newFormdata
}

export const populateFields = (formData, fields) => {

    for(let key in formData){
        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = ''
    }

    return formData;
}


