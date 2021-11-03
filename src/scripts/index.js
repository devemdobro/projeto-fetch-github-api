const url = 'https://api.github.com/users'
const reposQuantity = 10

async function sendUserNameToGitHub(){
    let userName = document.getElementById('input-search').value

    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub') 
        return
    }

    await getUser(userName).then(response => {
        if(response.ok && !response.ok) throw new Error("Ocorreu um erro ao tentar buscar esse usuário");  

        setProfileData(response)
    }).catch(function(error) {
        document.getElementById('info').innerHTML = "Usuário não encontrado"

        console.log(error);
    });

    await getRepos(userName).then(response => {
        if(response.ok && !response.ok) throw new Error("Ocorreu um erro ao tentar buscar os repositório desse usuário");  

        setReposData(response)
    }).catch(function(error) {
        document.getElementById('repositories').innerHTML = "Repositórios não encontrados"

        console.log(error);
    });

    showResult()
}

document.getElementById('btn-search').addEventListener('click', () => {
    sendUserNameToGitHub()
})

document.getElementById('input-search').addEventListener('keyup', function(e){
    var key = e.which || e.keyCode;
    if (key == 13) { // codigo da tecla enter      
        sendUserNameToGitHub()
    }
  });

function showResult(){
    document.getElementById('result').classList.add("show")
}

async function getUser(user) {        
    const response = await fetch(`${url}/${user}`)        
    return await response.json()        
}

async function getRepos(user) {    
    const response = await fetch(`${url}/${user}/repos?per_page=${reposQuantity}&sort=createdAt:%20asc`)
    return await response.json()    
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
    let output = ""
    reposData.forEach(repo => {
        output += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    });        

    document.getElementById('list').innerHTML = output
}