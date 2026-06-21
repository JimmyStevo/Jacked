export default class APIService{
    static insertSettings(body){
        return fetch('http://localhost:500/api/settings',{
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
        },
    body:JSON.stringify(body)
})
.then(response => response.json())
.catch(error => console.log(error))
    }

    static insertStartup(body){
        return fetch('http://localhost:500/api/startUP',{
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
        },
    body:JSON.stringify(body)
})
.then(response => response.json())
.catch(error => console.log(error))
    }
}