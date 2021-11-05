import { getUserProfile } from '/src/scripts/users.js'
import { getUserRepositories } from '/src/scripts/repositories.js'

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
    const userName = document.getElementById('input-search').value

    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário no GitHub')
        return
    }

    getUserProfile(userName);

    getUserRepositories(userName);

    showResult()
}

function showResult() {
    document.getElementById('result').classList.add("show")
}