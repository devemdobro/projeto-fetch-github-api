import { user } from '/src/scripts/objects/user.js'
import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'

const profileDataHTML = document.querySelector('.profile-data')
const userInfoImgHTML = document.querySelector('#info img')
const userInfoTitleHTML = document.querySelector('#info .data h1')
const userInfoBioHTML = document.querySelector('#info .data p')
const userRepositoriesSectionHTML= document.querySelector('#info .repositories')
const userRepositoriesListHTML= document.querySelector('#info .repositories ul')

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub')
        return
    }
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', function (e) {
    const userName = document.getElementById('input-search').value

    var key = e.which || e.keyCode
    if (key == 13) { // codigo da tecla enter
        if (userName.length === 0) {
            alert('Preencha o campo com o nome do usuário no GitHub')
            return
        }
        getUserData(userName);
    }
})

async function getUserData(userName) {
    const userResponse = await getUser(userName)
    const repositories = await getRepositories(userName)
    
    if (userResponse.message === "Not Found") {
        profileDataHTML.innerHTML = "<h3>Usuário não encontrado</h3>"
        return;
    }

    await user.setInfo(userResponse)
    await user.setRepositories(repositories)
    
    render(user)
}

async function render(user) {
    let repositoriesItens = ""
    user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

    userInfoImgHTML.src = user.avatarUrl
    userInfoTitleHTML.innerHTML = user.name ?? 'Não possui nome cadastrado 😢'
    userInfoBioHTML.innerHTML = user.bio ?? 'Não possui bio cadastrada 😢'

    profileDataHTML.classList.remove('hide')
    userRepositoriesSectionHTML.classList.remove('hide')

    if(repositoriesItens.length > 0) {
        userRepositoriesListHTML.innerHTML = repositoriesItens
    }else {
        userRepositoriesSectionHTML.classList.add('hide')
        userRepositoriesListHTML.innerHTML = ''
    }
}