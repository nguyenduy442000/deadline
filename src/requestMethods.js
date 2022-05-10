import axios from 'axios';

const BASE_URL ="http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjJjNzAxMGVmMjdhMDY2MWMxMjYzMCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTg5MDYyMywiZXhwIjoxNjUyMTQ5ODIzfQ.o2oOVQAOvEb5irq5bixIy5h-5Ok7Ud0jXqBYJrQdLnw"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`},
})