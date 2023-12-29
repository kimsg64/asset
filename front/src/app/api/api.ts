import axios from "axios";

console.log(`baseUrl: ${process.env.NEXT_PUBLIC_SERVER_URL}`);

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        accept: "application/json",
    },
});

const Apis = {
    get: (url: string, params?: any) => api.get(url, params).then((res: any) => res.data),
    post: (url: string, payload: any) => api.post(url, payload).then((res: any) => res.data),
};

export default Apis;
