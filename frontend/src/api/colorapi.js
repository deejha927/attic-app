export const colorApi = (color, text) => {
    const url = "http://52.18.205.130:1000/getcolor";
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