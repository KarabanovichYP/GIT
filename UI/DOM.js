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
    if(f){
      icons.innerHTML +=`
      <i class="material-icons cur like" style="">favorite</i>
      `
    }
    else
      icons.innerHTML += `
        <i class="material-icons cur ic">favorite_border</i>
      `;
    if (el.author === Username)
      icons.innerHTML += `
        <i class="material-icons cur ic">create</i>
        <i class="material-icons cur ic">delete_forever</i>
      `;
   
    bottom.appendChild(icons);
    let date = document.createElement('div');
    date.className = 'date';
    let time = document.createElement('div');
    let s1, s2, s3;
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
      Likes:${el.likes.length}
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
      photoPosts.forEach((el) => {
        posts.appendChild(makePost(el));
      });
    },
    removePhotoPost: function (id) {
      if (document.getElementById(id))
        posts.removeChild(document.getElementById(id));
    },
    editPhotoPost: function (id, photoPost) {
      if (document.getElementById(id)) {
        let el = Posts.getPhotoPost(id);
        let post = document.getElementById(id);
        let img_div = post.childNodes[1];
        let img = document.createElement('img');
        img.src = el.photoLink;
        img.alt = `${el.author} image`;
        img_div.removeChild(img_div.firstChild);
        img_div.appendChild(img);
        let description = post.childNodes[3];
        description.innerHTML = el.description;
        let hashTags = post.childNodes[4];
        hashTags.innerHTML = '';
        el.hashTags.forEach((h) => {
          hashTags.innerHTML += '#' + h;
        });
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
function displayPhotoPosts(skip, top, filterConfig) {
  let photoPosts = Posts.getPhotoPosts(skip, top, filterConfig);
  Dom.displayPhotoPosts(photoPosts);
}
function addPhotoPost(photoPost) {
  if (Posts.addPhotoPost(photoPost)) {
    let posts = document.querySelector(".posts");
    while (posts.firstChild)
      posts.removeChild(posts.firstChild);
    displayPhotoPosts();
  }
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

var Username = 'Иванов Илья';
Dom.newUser(Username);
displayPhotoPosts(0, 5);
displayPhotoPosts(5, 10);
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