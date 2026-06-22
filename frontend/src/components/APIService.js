export default class APIService{
    // SETTINGS API TO GET AND POST DATA FROM DB
    static insertSettings(body){
        return fetch('http://localhost:5000/api/settings',{
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
        },
    body:JSON.stringify(body)
})
.then(response => response.json())
.catch(error => console.log(error))
    }

    static getSettings(){
        return fetch('http://localhost:5000/api/settings',{
            'method':'GET',
            headers: {
                'Content-Type':'application/json'
        }
    })
.then(response => response.json())
.catch(error => console.log(error))
    }

// START UP API TO GET AND POST DATA FROM DB
    static insertStartup(body){
        return fetch('http://localhost:5000/api/startUP',{
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