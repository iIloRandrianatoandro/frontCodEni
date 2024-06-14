import axios from 'axios'

export const axiosInstance = axios.create({
    headers: {
        accept: `*/*`,
    },
    //baseURL: constants.api.baseURL,
})

export default axiosInstance
