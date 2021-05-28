import { END_POINT } from "../enviroment/Enviroment"


export const getTasksByUser = async (idUser) => {
    const response = await fetch(`${END_POINT}user/tasks/${idUser}`);
    const data = response.json();
    return data;
}

export const getCategoryTasks = async () => {
    const response = await fetch(`${END_POINT}categoryTasks/`);
    const data = response.json();
    return data;
}

export const addTaskByUser = async (task) => {
    const response = await fetch(`${END_POINT}tasks/`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
    const data = await response.json();
    return data;
}

export const updateTaskByUser = async (task) => {
    let idTask = task.id;

    const response = await fetch(`${END_POINT}tasks/${idTask}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        },
    );
    const data = await response.json();
    return data;
}

export const deleteTaskByUser = async (idTask) => {
    const response = await fetch(`${END_POINT}tasks/${idTask}`,
    {
        method: 'DELETE',
    },
    );
    const data = await response.json();
    return data;
}