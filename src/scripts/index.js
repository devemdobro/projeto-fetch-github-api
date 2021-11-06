import { user } from '/src/scripts/objects/user.js'
import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'
import { screen } from '/src/scripts/objects/screen.js'

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
    
    screen.render(user)
}