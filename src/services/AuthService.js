import axios from 'axios/index';
import {inject, observer} from 'mobx-react';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';


export default @inject('AuthStore') @observer class AuthService {

    constructor (){}

    postReg = (creds) =>{
        const url = `${API_URL}/auth/registration/`
        axios.post(url, creds).then(result => {
                console.log(result)
        }).catch(error => {
            console.log(error.response)
        }).then(result => {
            this.props.AuthStore.addUser(result.data)
        }).catch(error => {
            console.log(error.response)
        })
    };
}