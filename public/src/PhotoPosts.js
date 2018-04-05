const Posts = (function () {
  return {
    getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
      let body = JSON.stringify({
        skip: skip,
        top: top,
        filterConfig: filterConfig
      });
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/posts/all', false);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(body);
      let res = JSON.parse(xhr.response);
      if (res)
        return res;
    },
    getPhotoPost: function (id) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `/api/posts?id=${id}`, false);
      xhr.send();
      let res = JSON.parse(xhr.response);
      if (res)
        return res;
    },
    addPhotoPost: function (photoPost) {
      let body = JSON.stringify(photoPost);
      let xhr = new XMLHttpRequest();
      xhr.open('POST', `/api/posts`, false);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(body);
      if (JSON.parse(xhr.response))
        return true;
      else
        return false;

    },
    editPhotoPost: function (id, photoPost) {
      let body = JSON.stringify(photoPost);
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', `/api/posts?id=${id}`, false);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(body);
      if (JSON.parse(xhr.response))
        return true;
      else
        return false;
    },
    removePhotoPost: function (id) {
      let xhr = new XMLHttpRequest();
      xhr.open('DELETE', `/api/posts?id=${id}`, false);
      xhr.send();
      if (JSON.parse(xhr.response))
        return true;
      else
        return false;
    },
    addLike: function (id, name) {
      let body = JSON.stringify({
        add: "yes",
        id: id,
        name: name
      });
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', `/api/likes`, false);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(body);
      if (JSON.parse(xhr.response))
        return true;
      else
        return false;
    },
    delLike: function (id, name) {
      let body = JSON.stringify({
        id: id,
        name: name
      });
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', `/api/likes`, false);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.send(body);
      if (JSON.parse(xhr.response))
        return true;
      else
        return false;
    }
  }
})();