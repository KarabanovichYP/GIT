console.log("Все посты:")
console.log(Posts.getPhotoPosts(0,20));
console.log("5 постов, начиная с 6:");
console.log(Posts.getPhotoPosts(5, 5) );
console.log("Фильтрация по автору, дате и хэштегам:");
console.log("getPhotoPosts(0,10,{author:'Иванов Иван',createdAt:new Date(2018,01,23),hashTags:['ура']}):");
console.log(Posts.getPhotoPosts(0,10,{author:'Иванов Иван',createdAt:new Date(2018,01,23),hashTags:['ура']}));
console.log("Пост с id=2:");
console.log(Posts.getPhotoPost('2'));
console.log("Валидность поста:");
var post1={
  id: '11',
  description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'Иванов Иван',
  photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
  hashTags:['победа'],
  likes:['Иван Петров','Юра Иванов']
};
var post2={
  id:'12',
  description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
  createdAt: new Date('2018-02-23T23:00:00'),
  author: 'Иванов Иван'
}
console.log(post1);
console.log("Валидный: "+Posts.validatePhotoPost(post1));
console.log(post2);
console.log("Валидный: "+Posts.validatePhotoPost(post2));
console.log("Добавление поста:");
console.log(post1);
console.log("Добавлен: "+Posts.addPhotoPost(post1));
console.log(post2);
console.log("Добавлен: "+Posts.addPhotoPost(post2));
console.log("Редактирование поста:");
console.log('editPhotoPost("5",{description:"COOOOL",hashTags:["aww","nice"]}):'+Posts.editPhotoPost('5',{description:"COOOOL",hashTags:["aww","nice"]}));
console.log('editPhotoPost("30",{description:"COOOOL"}):'+Posts.editPhotoPost('30',{description:"COOOOL"}));
console.log("Удаление поста:");
console.log('removePhotoPost("7"):'+Posts.removePhotoPost('7'));
console.log('removePhotoPost("30"):'+Posts.removePhotoPost('30'));
console.log("Все посты:")
console.log(Posts.getPhotoPosts(0,30));