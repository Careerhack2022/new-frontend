import axios from './index';
// equipment/generation?data_type=' + data_type

export async function getDeviceDataAll(data_type) {
    const res = await axios.get("?data_type=" + data_type);
    return res;
}

export async function getDeviceDataOne(index_num, data_type) {
    const res = await axios.get("/" + index_num + "?data_type=" + data_type);
    return res;
}
