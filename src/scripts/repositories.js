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

export { repos, setReposData }