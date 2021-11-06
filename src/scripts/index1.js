import { user } from '/src/scripts/objects/user.js'
import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'

const profileDataHTML = document.getElementById('profile-data')

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
        profileDataHTML.classList.add("show")
        return;
    }

    await user.setInfo(userResponse)
    await user.setRepositories(repositories)
    
    render(user)
}

async function render(user) {
    let repositoriesItens = ""
    user.repositories.forEach(repo => {
        repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    })

    profileDataHTML.innerHTML = `<div class="info" id="info">
                                <img src="${user.avatarUrl}" alt="Foto do perfil">
                                <div class="data">
                                    <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                    <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                </div>
                            </div>
                            <div class="repositories section ${repositoriesItens.length > 0 ? 'show' : 'hide'}">
                                <h2 id="title">Repositórios</h2>                      
                                <ul id="list">${repositoriesItens}</ul>
                            </div>`
   // }
    profileDataHTML.classList.add("show")
}