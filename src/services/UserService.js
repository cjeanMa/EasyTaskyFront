import {END_POINT} from "../enviroment/Enviroment"

export const getUsers = async () => {
    const response = await fetch(`${END_POINT}users`);
    const data = await response.json();
    return data;
}

export const getLogin = async(username, password) =>{

    let info = {
        username: username,
        password: password
    };

    const response = await fetch(
            `${END_POINT}login/`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info),
            
        })
    const data = await response.json();
    return data;
}