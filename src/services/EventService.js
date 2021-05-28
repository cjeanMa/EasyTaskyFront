import { END_POINT } from "../enviroment/Enviroment"


export const getEventsByUser = async (idUser) => {
    const response = await fetch(`${END_POINT}user/events/${idUser}`);
    const data = response.json();
    return data;
}

export const getCategoryEvents = async () => {
    const response = await fetch(`${END_POINT}categoryEvents/`);
    const data = response.json();
    return data;
}

export const addEventByUser = async (event) => {
    const response = await fetch(`${END_POINT}events/`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
    const data = await response.json();
    return data;
}

export const updateEventByUser = async (event) => {
    let idEvent = event.id;

    const response = await fetch(`${END_POINT}events/${idEvent}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        },
    );
    const data = await response.json();
    return data;
}

export const deleteEventByUser = async (idEvent) => {
    const response = await fetch(`${END_POINT}events/${idEvent}`,
    {
        method: 'DELETE',
    },
    );
    const data = await response.json();
    return data;
}

//export const postEventByUser()