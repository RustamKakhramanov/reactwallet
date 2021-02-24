import axios from 'axios/index';

export default class Client {

    static async create(data) {
        const response = await axios.post('/api/v1/clients/register', data);
        return response;
    }

    static async paginated(params = {}) {
        const response = await axios.get('/api/v1/wallet/layouts', {
            params,
        });

        // if (response.status !== 200) {
        //     return {};
        // }

        return response;
    }

    static async store(attributes) {
        const response = await axios.post('/api/v1/wallet/layouts', attributes);

        if (response.status !== 201) {
            return {};
        }

        return response.data;
    }

    static async show(id) {
        const response = await axios.get(`/api/v1/clients/${id}`);

        // if (response.status !== 200) {
        //     return {};
        // }

        return response.data;
    }

    static async paginated(params = {}) {
        const response = await axios.get(`/api/v1/clients`, {
            params,
        });

        // if (response.status !== 200) {
        //     return {};
        // }

        return response;
    }

    static async changeValues(id, type, value) {
        const response = await axios.get(`/api/v1/clients/change/${id}/${type}/${value}`);

        if (response.status !== 200) {
            return false;
        }
            
        return response.data;
    }

    static async sendPush(id, data) {
        let response;
        if(id){
            response = await axios.post(`/api/v1/clients/push/${id}`, data);
        }else{
            response = await axios.post(`/api/v1/clients/push`, data);
        }
        return response;
    }

    static async update(id, data) {
        data.append('_method', 'PATCH');
        const response = await axios.post(`/api/v1/clients/${id}`, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return response;
    }

    static  delete(id) {
        return axios.delete(`/api/v1/clients/${id}`);
    }

}
