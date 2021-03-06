
export const validate = (element, formData = []) => {
    let error = [true, ''];

    if (element.validation.email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
        const valid = re.test(element.value);
        const message = `${!valid ? ' *Please enter a valid email' : '' }`;
        error = !valid ? [valid, message] : error;
    };

    if(element.validation.number) {
        const re = /^[0-9\b]+$/;
        const valid = re.test(element.value);
        const message = `${!valid ? ' *Please enter a number' : '' }`;
        error = !valid ? [valid, message] : error;
    }


    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? ' *This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    };

    return error;
};

export const update = (element, formData, formName) => {
    const newFormData = {
        ...formData
    }

    const newElement = {
        ...newFormData[element.id]
    }

    newElement.value = element.event.target.value;

    if (element.blur) {
        let validData = validate(newElement, formData);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;
    newFormData[element.id] = newElement;

    return newFormData;
};

export const generateData = (formData, formName) => {
    let dataToSubmit = {};

    for (let key in formData) {
        // console.log("key", key)
        if (key !== 'confirmPassword') {
            dataToSubmit[key] = formData[key].value
        }
    };

    return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
    let formValid = true;

    for (let key in formData) {
        formValid = formData[key].valid && formValid
    }

    return formValid;
};

export const populateOptionFields = (formData, arrayData = [], field) => {
    const newArray = [];
    const newFormData = { ...formData };

    arrayData.forEach(item => {
        newArray.push({ key: item._id, value: item.name })
    });
    newFormData[field].config.options = newArray;

    return newFormData;
};


export const resetFields = (formData, formName) => {
    const newFormData = { ...formData };

    for (let key in newFormData) {
        if(key === 'images') {
            newFormData[key].value = [];
        }else {
            newFormData[key].value = ''; 
        }

        newFormData[key].valid = false;
        newFormData[key].touched = false;
        newFormData[key].validationMessage = '';
    }
    return newFormData
};

export const populateFields = (formData, fields) => {
    for (let key in formData) {
        formData[key].value = fields[key];
        formData[key].valid = true;
        formData[key].touched = true;
        formData[key].validationMessage = '';
    }

    return formData;
}