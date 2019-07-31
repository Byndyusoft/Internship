export function post({ body, url, token }) {
  return fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }).then(x => x.json());
}

export function get({ url, token }) {
  return fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    }
  }).then(x => x.json());
}
