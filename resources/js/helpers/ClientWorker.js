import {Client} from '../models';


export const handleChange = async (id, type, value) => {
    return await Client.changeValues(id, type, value);
 }

