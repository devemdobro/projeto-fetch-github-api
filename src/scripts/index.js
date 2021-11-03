import { user, setProfileData } from '/src/scripts/users.js'
import { repos, setReposData } from '/src/scripts/repositories.js'

document.getElementById('btn-search').addEventListener('click', () => {
    fetchFromGitHub()
})

document.getElementById('input-search').addEventListener('keyup', function (e) {
    var key = e.which || e.keyCode;
    if (key == 13) { // codigo da tecla enter      
        fetchFromGitHub()
    }
});

function fetchFromGitHub() {
    let userName = document.getElementById('input-search').value

    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub')
        return
    }

    /* Get user info */
    getUserInfo(userName);

    /* Get repos info */
    getUserRepositories(userName);

    showResult()
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

function getUserInfo(userName) {
    user(userName).then(response => {
        if (response.ok && !response.ok)
            throw new Error("Ocorreu um erro ao tentar buscar esse usuário");

        setProfileData(response);
    }).catch(function (error) {
        document.getElementById('info').innerHTML = "Usuário não encontrado";

        console.log(error);
    });
}

function showResult() {
    document.getElementById('result').classList.add("show")
}