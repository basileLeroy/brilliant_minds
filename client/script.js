import environment from "./config.js";
const listBox = document.querySelector(".list-of-ideas");

const handleDeleteAction = async (idea) => {
    console.log(idea.id)

    try {
        const response = await fetch(environment.backend_url + "/delete", 
            {
                method:"DELETE", 
                body:JSON.stringify({id:idea.id}), 
                headers: {'Content-type': 'application/json; charset=UTF-8'}
            }
        )
        const data = await response.json();

        if (data.message === "OK") window.location.reload();

    } catch(err) {
        console.error(err);
    }
}

const createIdeaCard = (idea) => {
        // create elements
        const container = document.createElement('div');
        container.className = "card"

        const title = document.createElement("h3");
        title.textContent = idea.title;

        const textBody = document.createElement('div');
        textBody.className = "card-body";
        const description = document.createElement('p');
        description.textContent = idea.description;

        const buttonBox = document.createElement('div');
        buttonBox.className = "buttons";

        const deleteIcon = document.createElement('img');
        deleteIcon.className="delete";
        deleteIcon.src = "./assets/delete.svg";
        deleteIcon.alt = `Delete button for "${idea.title}"`;
        deleteIcon.title = `Delete button for "${idea.title}"`;

        const updateIcon = document.createElement('img');
        updateIcon.className="edit";
        updateIcon.src = "./assets/edit.svg";
        updateIcon.alt = `Edit button for "${idea.title}"`;
        updateIcon.title = `Edit button for "${idea.title}"`;

        // Delete idea
        deleteIcon.addEventListener("click", () => {
            handleDeleteAction(idea);
        })

        buttonBox.append(updateIcon, deleteIcon)
        textBody.append(description, buttonBox)
        container.append(title, textBody);
        listBox.append(container);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch("http://localhost:3070/")
        const data = await response.json();

        if (data) {
            data.forEach(idea => {
                createIdeaCard(idea);
            })
        }
    } catch (err) {
        console.error(err)
    }
})