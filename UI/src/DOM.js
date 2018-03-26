const Dom = (function () {
  let Username = null;
  let posts = document.querySelector(".posts");
  function makePost(el) {
    let post = document.createElement('div');
    post.className = "post";
    let username = document.createElement('div');
    username.innerHTML = el.author;
    username.className = 'username roman';
    post.appendChild(username);
    let img_div = document.createElement('div');
    img_div.className = 'img';
    let img = document.createElement('img');
    img.src = el.photoLink;
    img.alt = `${el.author} image`;
    img_div.appendChild(img);
    post.appendChild(img_div);
    let bottom = document.createElement('div');
    bottom.className = 'bottom';
    let icons = document.createElement('div');
    icons.className = 'icons';
    let f = false;
    if (Username) {
      el.likes.forEach((l) => {
        if (l === Username)
          f = true;
      });
    }
    if (f) {
      icons.innerHTML += `
      <div class='like'>
        <i class="material-icons cur fav" >favorite</i>
      </div>
      `
    }
    else if (Username)
      icons.innerHTML += `
        <div class='like'>
          <i class="material-icons cur ic">favorite_border</i>
        </div>
      `;
    if (el.author === Username)
      icons.innerHTML += `
        <i class="material-icons cur ic red">create</i>
        <i class="material-icons cur ic del">delete_forever</i>
      `;

    bottom.appendChild(icons);
    let date = document.createElement('div');
    date.className = 'date';
    let time = document.createElement('div');
    let s1, s2, s3;
    if (typeof el.createdAt==='string'){
      el.createdAt=new Date(el.createdAt);
    }
    s1 = '' + el.createdAt.getHours();
    s2 = '' + el.createdAt.getMinutes();
    if (s1.length == 1)
      s1 = '0' + s1;
    if (s2.length == 1)
      s2 = '0' + s2;
    time.innerHTML = s1 + ':' + s2;
    let day = document.createElement('div');
    s1 = '' + el.createdAt.getDate();
    s2 = '' + (el.createdAt.getMonth() + 1);
    s3 = '' + el.createdAt.getFullYear();
    if (s1.length == 1)
      s1 = '0' + s1;
    if (s2.length == 1)
      s2 = '0' + s2;
    day.innerHTML = s1 + '.' + s2 + '.' + s3;
    date.appendChild(time);
    date.appendChild(day);
    bottom.appendChild(date);
    post.appendChild(bottom);
    let bottom2 = document.createElement('div');
    bottom2.className = 'bottom likes';
    bottom2.innerHTML = `
      <div class='likes_word'>
        <div>Likes:</div>
        <div class='likes_num'>${el.likes.length}</div>
      </div>
    `;
    post.appendChild(bottom2);
    let description = document.createElement('div');
    description.className = "description";
    description.innerHTML = el.description;
    post.appendChild(description);
    let hashTags = document.createElement('div');
    hashTags.className = 'hashtags';
    el.hashTags.forEach((h) => {
      hashTags.innerHTML += '#' + h;
    });
    post.appendChild(hashTags);
    post.id = el.id;
    return post;
  }
  return {
    displayPhotoPosts: function (photoPosts) {
      posts = document.querySelector(".posts");
      if (photoPosts)
        photoPosts.forEach((el) => {
          posts.appendChild(makePost(el));
        });
    },
    addPhotoPost: function (photoPost) {
      posts = document.querySelector(".posts");
      posts.insertBefore(makePost(photoPost), posts.firstChild);
    },
    removePhotoPost: function (id) {
      posts = document.querySelector(".posts");
      if (document.getElementById(id))
        posts.removeChild(document.getElementById(id));
    },
    editPhotoPost: function (id, photoPost) {
      if (document.getElementById(id)) {
        let el = photoPost;
        let post = document.getElementById(id);
        if (el.photoLink) {
          let img_div = post.querySelector('.img');
          let img = document.createElement('img');
          img.src = el.photoLink;
          img.alt = `${el.author} image`;
          img_div.removeChild(img_div.firstChild);
          img_div.appendChild(img);
        }
        if (el.description) {
          let description = post.querySelector('.description');
          description.innerHTML = el.description;
        }
        if (el.hashTags) {
          let hashTags = post.querySelector('.hashtags');
          hashTags.innerHTML = '';
          el.hashTags.forEach((h) => {
            hashTags.innerHTML += '#' + h;
          });
        }
      }
    },
    addLike: function (id) {
      if (document.getElementById(id)) {
        let post = document.getElementById(id);
        let likes = post.querySelector('.likes_num');
        likes.innerHTML = +likes.innerHTML + 1;
        let like = post.querySelector('.like');
        like.innerHTML = '<i class="material-icons cur fav" >favorite</i>';
      }
    },
    delLike: function (id) {
      if (document.getElementById(id)) {
        let post = document.getElementById(id);
        let likes = post.querySelector('.likes_num');
        likes.innerHTML = +likes.innerHTML - 1;
        let like = post.querySelector('.like');
        like.innerHTML = '<i class="material-icons cur ic" >favorite_border</i>';
      }
    },
    newUser: function (username) {
      Username = username;
      let sign = document.querySelector('.signb');
      let name = document.getElementById('Username');
      name.innerHTML = Username;
      if (!Username) {
        sign.innerHTML = 'Sign in';
        sign.style.height = '30px';
      }
      else {
        sign.innerHTML = 'Sign out';
        sign.style.height = 'auto';
      }
    }
  }
})();
function displayPhotoPosts(skip, top, filterConfig, del = false) {
  let photoPosts = Posts.getPhotoPosts(skip, top, filterConfig);
  if (del) {
    let posts = document.querySelector(".posts");
    while (posts.firstChild)
      posts.removeChild(posts.firstChild);
  }
  Dom.displayPhotoPosts(photoPosts);
}
function addPhotoPost(photoPost) {
  if (Posts.addPhotoPost(photoPost)) {
    if (Posts.getPhotoPosts()[0].id === photoPost.id) {
      Dom.addPhotoPost(photoPost);
    }
    else {
      let posts = document.querySelector(".posts");
      while (posts.firstChild)
        posts.removeChild(posts.firstChild);
      displayPhotoPosts();
    }
    return true;
  }
  return false;
}
function removePhotoPost(id) {
  if (Posts.removePhotoPost(id)) {
    Dom.removePhotoPost(id);
  }
}
function editPhotoPost(id, photoPost) {
  if (Posts.editPhotoPost(id, photoPost)) {
    Dom.editPhotoPost(id, photoPost);
  }
}
function newUser(Username) {
  Dom.newUser(Username);
  let posts = document.querySelector(".posts");
  while (posts.firstChild)
    posts.removeChild(posts.firstChild);
  displayPhotoPosts(0, 5);
}
function addLike(id, user) {
  if (Posts.addLike(id, user))
    Dom.addLike(id);
}
function delLike(id, user) {
  if (Posts.delLike(id, user))
    Dom.delLike(id);
}

/*
var post1 = {
  id: '12',
  description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'Иванов Иваннннн',
  photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
  hashTags: ['победа'],
  likes: ['Иван Петров', 'Юра Иванов']
};
addPhotoPost(post1);
removePhotoPost('2');
editPhotoPost('3', { description: "COOOOL", hashTags: ["aww", "nice", "yeah"] });
*/