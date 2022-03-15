export const colorApi = (color, text) => {
    const url = "http://localhost:7050/getcolor";
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            color: color,
            text: text,
        })
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
}