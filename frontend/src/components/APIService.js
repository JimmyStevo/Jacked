import { data } from "react-router-dom"

export default class APIService{
//====================================================
// LOGIN & REGISTER API TO GET DATA AND STORE TOKEN
//====================================================

    static login(body){
        return fetch('http://localhost:5000/auth/login',{
            'method' : 'POST',
            headers: {
                'Content-Type': 'application/json'},
            body:JSON.stringify(body)
        })
        .then(response=>response.json())
        .then(data => {
            localStorage.setItem('token', data.token)
            return data
        })
        .catch(error => console.log(error))
    }

    static register(body){
        return fetch('http://localhost:5000/auth/signup',{
            'method' : 'POST',
            headers: {
                'Content-Type' : 'application/json'},
            body:JSON.stringify(body)
        })
        .then(response=>response.json())
        .then(data=> {
            localStorage.setItem('token', data.token)
            return data
        })
        .catch(error=>console.log(error))
    }


//====================================================
// SETTINGS API TO GET AND POST DATA FROM DB
//====================================================
    static insertSettings(body){
        return fetch('http://localhost:5000/api/settings',{
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
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
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
.then(response => response.json())
.catch(error => console.log(error))
    }

//====================================================
// START UP API TO GET AND POST DATA FROM DB
//====================================================
    static insertStartup(body){
        return fetch('http://localhost:5000/api/startup',{
            'method':'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
    body:JSON.stringify(body)
})
.then(response => response.json())
.catch(error => console.log(error))
    }

    static getStartup(){
        return fetch('http://localhost:5000/api/startup',{
            'method':'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
.then(response => response.json())
.catch(error => console.log(error))
    }
}