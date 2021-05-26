import { END_POINT } from "../enviroment/Enviroment"


export const getEventsByUser = async (idUser) => {
    const response = await fetch(`${END_POINT}user/events/${idUser}`);
    const data = response.json();
    return data;
}

export const getCategoryEvents = async () => {
    const response = await fetch(`${END_POINT}categoryEvents`);
    const data = response.json();
    return data;
}

//export const postEventByUser()