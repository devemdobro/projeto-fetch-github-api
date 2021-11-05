import { url, reposQuantity } from '/src/scripts/variables.js'

async function repos(user) {    
    const response = await fetch(`${url}/${user}/repos?per_page=${reposQuantity}&sort=createdAt:%20asc`)
    return await response.json()    
}

const setReposData = (reposData) => {        
    let output = ""
    reposData.forEach(repo => {
        output += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    });        

    document.getElementById('title').innerHTML = "Repositórios";
    document.getElementById('list').innerHTML = output
}

function getUserRepositories(userName) {  
    repos(userName).then(reposData => {            
        setReposData(reposData);
    }).catch(function (error) {
        document.getElementById('title').innerHTML = "Repositórios não encontrados";
        console.log(error);
    });
}

export { repos, setReposData, getUserRepositories }