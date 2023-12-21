import environment from "./config.js";
const listBox = document.querySelector(".list-of-ideas");


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(environment.backend_url, {
        method: "GET",
    })
    const data = await response.json();

    data.forEach(idea => {
        const container = document.createElement('div');
        container.className = "card"

        const title = document.createElement("h3");
        title.textContent = idea.title;

        const textBody = document.createElement('div')
        textBody.className = "card-body"
        const description = document.createElement('p');
        description.textContent = idea.description;

        const buttonBox = document.createElement('div')
        buttonBox.className = "buttons";

        const deleteIcon = document.createElement('img')
        deleteIcon.className="delete";
        deleteIcon.src = "./assets/delete.svg";
        deleteIcon.alt = "Delete button for " + idea.title;
        deleteIcon.title = "Delete button for " + idea.title;

        const updateIcon = document.createElement('img')
        updateIcon.className="edit";
        updateIcon.src = "./assets/edit.svg";
        updateIcon.alt = "edit button for " + idea.title;
        updateIcon.title = "edit button for " + idea.title;

        buttonBox.append(updateIcon, deleteIcon)

        deleteIcon.addEventListener('click', () => {
            console.log("clicked idea number : " + idea.id)
        })

        textBody.append(description, buttonBox)
        container.append(title, textBody);
        listBox.append(container);
    })
})