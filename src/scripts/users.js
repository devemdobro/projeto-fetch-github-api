import { url } from '/src/scripts/variables.js'

async function user(user) {        
    const response = await fetch(`${url}/${user}`)        
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

export { user, setProfileData }