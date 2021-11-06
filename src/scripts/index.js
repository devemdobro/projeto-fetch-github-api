import { user } from '/src/scripts/objects/user.js'
import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'
import { screen } from '/src/scripts/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    validateInput(userName)
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', function (e) {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key == 13 // codigo da tecla enter

    if (isEnterKeyPressed) { 
        validateInput(userName)
        getUserData(userName)
    }
})

function validateInput(userName){
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub')
        return
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found"){
        screen.renderNotFound()
        return
    }

    const repositories = await getRepositories(userName)
    
    user.setInfo(userResponse)
    user.setRepositories(repositories)
    
    screen.renderUser(user)
}