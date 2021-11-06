import { user } from '/src/scripts/objects/user.js'
import { screen } from '/src/scripts/objects/screen.js'

import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repositories.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', function (e) {
    const userName = e.target.value
    const key = e.which || e.keyCode
    const isEnterKeyPressed = key == 13 // codigo da tecla enter

    if (isEnterKeyPressed) { 
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub')
        return true
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