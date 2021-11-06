import { url, reposQuantity } from '/src/scripts/variables.js'

async function getRepositories(userName) {
    const response = await fetch(`${url}/${userName}/repos?per_page=${reposQuantity}&sort=createdAt:%20asc`)      
    return await response.json()
}

export { getRepositories }