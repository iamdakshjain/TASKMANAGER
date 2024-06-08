export default class APIservice {
    static updateTask(id, taskData){
       return fetch(`http://localhost:5000/update/${id}/`, {
           method: 'PUT',
           headers: {
              'Content-Type': 'application/json',
           },
           body: JSON.stringify(taskData)
       })
       .then(resp => resp.json());
    }

    static addTask(title, description) {
        return fetch(`http://localhost:5000/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description })
        })
        .then(resp => resp.json());
    }
}