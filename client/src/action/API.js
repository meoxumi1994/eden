function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const get = (url) => {
  return fetch(process.env.REACT_APP_SERVER_IP + url, {
    headers: {
        "Content-Type": "application/json",
        "x-eden-token": getCookie("access_token")
    },
    method: 'GET',
  }).then((response) => response.json())
  .then(res => res)
  .catch(error => {
    console.error('GET', process.env.REACT_APP_SERVER_IP + url , error)
  })
}

export const post = (url, body) => {
  return fetch(process.env.REACT_APP_SERVER_IP + url, {
    headers: {
        "Content-Type": "application/json",
        "x-eden-token": getCookie("access_token")
    },
    body: JSON.stringify(body),
    method: 'POST',
  }).then((response) => response.json())
  .then(res => res)
  .catch(error => {
    console.error('POST', process.env.REACT_APP_SERVER_IP + url , error)
  })
}



export const put = (url, body) => {
  return fetch(process.env.REACT_APP_SERVER_IP + url, {
    headers: {
        "Content-Type": "application/json",
        "x-eden-token": getCookie("access_token")
    },
    body: JSON.stringify(body),
    method: 'PUT',
  }).then((response) => response.json())
  .then(res => res)
  .catch(error => {
    console.error('PUT', process.env.REACT_APP_SERVER_IP + url , error)
  })
}

export const dele = (url, body) => {
  return fetch(process.env.REACT_APP_SERVER_IP + url, {
    headers: {
        "Content-Type": "application/json",
        "x-eden-token": getCookie("access_token")
    },
    body: JSON.stringify(body),
    method: 'DELETE',
  }).then((response) => response.json())
  .then(res => res)
  .catch(error => {
    console.error('DELETE', process.env.REACT_APP_SERVER_IP + url , error)
  })
}
