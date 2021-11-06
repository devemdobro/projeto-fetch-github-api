const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    repositories: [],
    async setInfo(gitHubUser) {               
        this.avatarUrl = gitHubUser.avatar_url  
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login            
    },
    async setRepositories(repositories) {                
        this.repositories = repositories
    }    
}

export { user }