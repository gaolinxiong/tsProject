import axios from 'axios';

class apiRequest  {
    constructor() {
        this.headers = {
            // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            'Content-Type' : 'application/json;charset=UTF-8',
        };
    }
    send (url, data = {}, methods = 'post') {
        axios ({
            method: methods,
            url: `http://localhost:8888${url}`,
            data: data,
            headers: this.headers
        })
    }
}

export default apiRequest;
