const Posts = (function () {
  const photoPosts = [
    {
      id: '1',
      description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['ура', 'победа'],
      likes: ['Иван Петров', 'Юра Иванов']
    },
    {
      id: '2',
      description: 'Home',
      createdAt: new Date('2018-02-25T21:00:00'),
      author: 'Иванов Илья',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new', 'house'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '3',
      description: 'My dog',
      createdAt: new Date('2018-02-20T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['dog'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '4',
      description: 'Моя Родина',
      createdAt: new Date('2018-01-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['Belarus'],
      likes: ['Иванов Иван', 'Ира Иванова']
    },
    {
      id: '5',
      description: 'My house',
      createdAt: new Date('2018-02-19T23:00:00'),
      author: 'Иванов Илья',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new', 'house'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '6',
      description: 'New car',
      createdAt: new Date('2018-02-15T23:20:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '7',
      description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new', 'home'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '8',
      description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new', 'home'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '9',
      description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new', 'home'],
      likes: ['Иванов Иван', 'Юра Иванов']
    },
    {
      id: '10',
      description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
      createdAt: new Date('2018-02-23T23:00:00'),
      author: 'Иванов Иван',
      photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
      hashTags: ['new', 'home'],
      likes: ['Иванов Иван', 'Юра Иванов']
    }
  ];
  return {
    getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
      return photoPosts
        .filter((elem) => {
          if (filterConfig) {
            if (filterConfig.author && elem.author !== filterConfig.author)
              return false;
            if (filterConfig.createdAt) {
              let d1 = elem.createdAt;
              let d2 = filterConfig.createdAt;
              if (!(d1.getDate() === d2.getDate() && d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()))
                return false;
            }
            if (filterConfig.hashTags) {
              let h1 = elem.hashTags;
              let h2 = filterConfig.hashTags;
              let f = true;
              h2.forEach((el1) => {
                if (!h1.find((el2) => { return el2 === el1; }))
                  f = false;
              });
              return f;
            }
          }
          return true;
        })
        .slice(skip, skip + top);
    },
    getPhotoPost: function (id) {
      return photoPosts.find((el) => {
        return el.id === id;
      })
    },
    validatePhotoPost: function (photoPost) {
      return Boolean(photoPost && Object.keys(photoPost).length < 8 && typeof photoPost.id === "string" &&
        typeof photoPost.description === "string" && photoPost.description.length < 200 && photoPost.createdAt instanceof Date &&
        typeof photoPost.author === "string" && photoPost.author.length > 0 && typeof photoPost.photoLink === "string" && photoPost.photoLink.length > 0);
    },
    addPhotoPost: function (photoPost) {
      if (this.validatePhotoPost(photoPost) && !this.getPhotoPost(photoPost.id)) {
        photoPosts.push(photoPost);
        photoPosts.sort((elem, b) => {
          return elem.createdAt - b.createdAt;
        });
        return true;
      }
      return false;
    },
    editPhotoPost: function (id, photoPost) {
      let ind;
      let post = photoPosts.find((el, i) => {
        if (el.id === id) {
          ind = i;
          return true;
        }
        return false;
      });
      if (post) {
        var temp = {};
        for (var k in post) {
          if (Array.isArray(post[k]))
            temp[k] = post[k].slice();
          else
            temp[k] = post[k];
        }
        if (photoPost.description)
          temp.description = photoPost.description;
        if (photoPost.photoLink)
          temp.photoLink = photoPost.photoLink;
        if (photoPost.hashTags && photoPost.hashTags.length > 0)
          temp.hashTags = photoPost.hashTags.slice();
        if (this.validatePhotoPost(temp)) {
          photoPosts.splice(ind, 1, temp);
          return true;
        }
        else
          return false;
      }
      return false;
    },
    removePhotoPost: function (id) {
      let ind = photoPosts.findIndex((el) => {
        return el.id === id
      });
      if (ind !== -1) {
        photoPosts.splice(ind, 1);
        return true;
      }
      return false;
    }
  }
})();