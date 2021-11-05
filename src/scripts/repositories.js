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

    document.getElementById('list').innerHTML = output
}

function getUserRepositories(userName) {
    repos(userName).then(response => {
        if (response.ok && !response.ok)
            throw new Error("Ocorreu um erro ao tentar buscar os repositório desse usuário");

        setReposData(response);
    }).catch(function (error) {
        document.getElementById('repositories').innerHTML = "Repositórios não encontrados";

        console.log(error);
    });
}

export { repos, setReposData, getUserRepositories }