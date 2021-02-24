import axios from 'axios';


export default class Setting {

    static async getOptions(type,user_id) {
        const response = await axios.get(`/api/v1/settings/${type}`);

        // if (response.status !== 200) {
        //     return {};
        // }

        return response;
    }
    static async save(type, data) {
        const response = await axios.post(`/api/v1/settings/${type}`, data);

        if (response.status !== 201) {
            return {};
        }

        return response.data;
    }
}