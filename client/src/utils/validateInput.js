const validateEmail = (email) => {

    const regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    return regex.test(email);
};

const validatePassword = (password) => {

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
    return regex.test(password);
};

const validateUsername = (username) => {

    const regex = /^[a-zA-Z0-9_]{3,10}$/;
    return regex.test(username);
};


export { validateEmail, validatePassword, validateUsername };