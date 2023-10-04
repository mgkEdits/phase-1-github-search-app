const init =() => {
    // global variables
    const gitContainer =document.getElementById("github-form");
    const userList =document.getElementById("user-list");
    const repoList =document.getElementById("repos-list");
    const gitHubForm =document.getElementById("github-form");

    gitHubForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const searchInput = document.querySelector('input#search');
        const searchContent = searchInput.value.trim(); // Get the comment content

        fetch(`https://api.github.com/search/users?q=${searchContent}`)
        .then(res => res.json())
        .then(data => {
            // update html elements
            userList.innerHTML = ""; //clear existing users
            data.items.forEach(user => {
                let li = document.createElement("li");

                const profileLink = document.createElement("a");
                profileLink.textContent = user.login;


               // Create an image element for the user's avatar
               const avatarImage = document.createElement("img");
               avatarImage.src = user.avatar_url;
               avatarImage.alt = `${user.login}'s Avatar`;

               // Append the anchor and image elements to the list item
               userList.appendChild(li);
               li.appendChild(avatarImage);
               li.appendChild(profileLink);
            });

        })
    })

    userList.addEventListener('click' , (e)=> {
        if (e.target.tagName === 'A') {
            // Retrieve the text of the clicked <li> element
            const text = e.target.textContent;
            

            fetch(`https://api.github.com/users/${text}/repos`)
        .then(res => res.json())
        .then(data => {
            // update html elements
            repoList.innerHTML = ""; //clear existing repo
            data.forEach(repo=> {
                let li = document.createElement("li");

                const profileLink = document.createElement("a");
                profileLink.textContent = text;


               // Create an image element for the repo
               const repoName = document.createElement("p");
               const repoFullName = document.createElement("a");
               const repoID = document.createElement("p");
               repoName.textContent = repo.name ;
               repoFullName.textContent=repo.full_name;
               repoID.textContent= repo.id;


               // Append the anchor and image elements to the list item
               userList.appendChild(li);
               li.appendChild(profileLink);
               li.appendChild(repoName);
               li.appendChild(repoFullName);

            });

        })
            
        }
    })




}

document.addEventListener("DOMContentLoaded", init) 
