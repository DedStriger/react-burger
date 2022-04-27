export default function checkResponse(resp) {
    if (resp.ok) {
        return resp.json();
    }
    return Promise.reject(resp.status);
}