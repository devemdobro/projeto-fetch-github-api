const user = {
    avatarUrl: "",
    name: "",
    bio: "",
    userName: "",
    repositories: [],
    async setInfo(json) {               
        this.avatarUrl = json.avatar_url  
        this.name = json.name
        this.bio = json.bio
        this.userName = json.login            
    },
    async setRepositories(json) {                
        this.repositories = json
    }    
}

export { user }