import environment from "./config.js";
const listBox = document.querySelector(".list-of-ideas");


(async () => {
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

        const deleteIcon = document.createElement('img')
        deleteIcon.src = "./assets/delete.svg";
        deleteIcon.alt = "Delete button for " + idea.title;
        deleteIcon.title = "Delete button for " + idea.title;

        deleteIcon.addEventListener('click', () => {
            console.log("clicked idea number : " + idea.id)
        })

        textBody.append(description, deleteIcon)
        container.append(title, textBody);
        listBox.append(container);
    })
})()