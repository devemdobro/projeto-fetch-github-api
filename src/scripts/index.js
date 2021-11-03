const url = 'https://api.github.com/users'
const reposQuantity = 10

document.getElementById('btn-search').addEventListener('click', () => {
    let userName = document.getElementById('input-search').value

    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub') 
        return
    }

    getUser(userName).then(user => setProfileData(user))
    getRepos(userName).then(repos => setReposData(repos))
    showResult()
})

function showResult(){
    document.getElementById('result').classList.add("show")
}

async function getUser(user) {
    try {
        const response = await fetch(`${url}/${user}`)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

async function getRepos(user) {
    try {
        const response = await fetch(`${url}/${user}/repos?per_page=${reposQuantity}`)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const setProfileData = (userData) => {
    let userInfo = `<img src="${userData.avatar_url}" alt="Foto do perfil">
                        <div class="data">
                            <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                            <p>${userData.bio ?? 'Não possui bio cadastrada 😢'}</p>
                    </div>`

    document.getElementById('info').innerHTML = userInfo
}

const setReposData = (reposData) => {
    //let repoHtml = reposData.map((repo) => )

    let reposInfo = `<ul>
                        <li><a href="">Repositorio 1</a></li>
                        <li><a href="">Repositorio 2</a></li>
                    </ul>`

    document.getElementById('list').innerHTML = reposInfo
}