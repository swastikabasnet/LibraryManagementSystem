import axios from 'axios';

const getApi = async (path) => {
    try {
        const res = await axios.get("http://localhost:8080" + path, {
            headers: { 'Content-Type': 'application/json' },
            params: {}
        });
    } catch (err) {
        console.log(err);
    }
};

export const postApi = async (path, body) => {
    try {
        const res = await axios.post("http://localhost:8080" + path, body).then(response => {
            if (response.status == 200) {
                console.log(response.data);
                return response.data;
            } else {
                console.log("Error");
            }
            return response.data;
        })
    } catch (err) {
        console.log(err);
    }
};
