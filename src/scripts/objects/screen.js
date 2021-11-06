const screen = {
    userProfile: document.querySelector('.profile-data'),
    userProfileImg: document.querySelector('#info img'),
    userProfileName: document.querySelector('#info .data h1'),
    userProfileBio: document.querySelector('#info .data p'),
    userProfileRepositoriesSection: document.querySelector('#info .repositories'),
    userProfileRepositoriesList: document.querySelector('#info .repositories ul'),
    async render(user) {
        let repositoriesItens = ""
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)
    
        this.userProfileImg.src = user.avatarUrl
        this.userProfileName.innerHTML = user.name ?? 'Não possui nome cadastrado 😢'
        this.userProfileBio.innerHTML = user.bio ?? 'Não possui bio cadastrada 😢'
    
        this.userProfile.classList.remove('hide')
        this.userProfileRepositoriesSection.classList.remove('hide')
    
        if(repositoriesItens.length > 0) {
            this.userProfileRepositoriesList.innerHTML = repositoriesItens
        } else {
            this.userProfileRepositoriesSection.classList.add('hide')
            this.userProfileRepositoriesList.innerHTML = ''
        }
    }
}

export { screen }