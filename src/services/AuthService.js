import axios from 'axios/index';
import {inject, observer} from 'mobx-react';

const API_URL = 'https://peaceful-ocean-66963.herokuapp.com';


class AuthService {

    constructor (){}

    postReg = (creds) =>{
        const url = `${API_URL}/auth/registration/`
        axios.post(url, creds).then(result => {
                console.log(result)
        }).catch(error => {
            console.log(error.response)
        })
    };
}
export default AuthService;