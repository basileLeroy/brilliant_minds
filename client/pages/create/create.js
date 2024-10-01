import environment from "../../config.js";

const form = document.querySelector('.create-form');

const createNewIdea = async (event) => {
    event.preventDefault();
    const title = event.target.title.value
    const description = event.target.description.value

    if(title.trim() && description.trim()) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        }

        try {
            const result = await fetch(`${environment.backend_url}/new`, options)
            const response = await result.json()
            
            if (response.message === "OK") window.location = "../../";
            

        } catch (err) {
            console.log(err)
        }

    } else {
        alert('ERROR: Empty input fields found.')
    }
}

form.addEventListener('submit', createNewIdea);