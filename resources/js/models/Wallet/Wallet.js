import axios from 'axios/index';

export default class Wallet {

    static async create(data) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        const response = await axios.post('/api/v1/wallet/layouts/create', data, config);

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
        const response = await axios.get(`/api/v1/wallet/layouts/${id}`);

        // if (response.status !== 200) {
        //     return {};
        // }

        return response.data;
    }

    static async update(id, data) {
        data.append('_method', 'PATCH');
        console.log(id);

        const response = await axios.post(`/api/v1/wallet/layouts/${id}`, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        return response;
    }

    static  delete(id) {
        return axios.delete(`/api/v1/wallet/layouts/${id}`);
    }

}
