var Posts=(function() {
var photoPosts=[
  {
    id: '1',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['ура','победа'],
    likes:['Иван Петров','Юра Иванов']
  },
  {
    id: '2',
    description: 'Home',
    createdAt: new Date('2018-02-25T21:00:00'),
    author: 'Иванов Илья',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new','house'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '3',
    description: 'My dog',
    createdAt: new Date('2018-02-20T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['dog'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '4',
    description: 'Моя Родина',
    createdAt: new Date('2018-01-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['Belarus'],
    likes:['Иванов Иван','Ира Иванова']
  },
  {
    id: '5',
    description: 'My house',
    createdAt: new Date('2018-02-19T23:00:00'),
    author: 'Иванов Илья',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new','house'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '6',
    description: 'New car',
    createdAt: new Date('2018-02-15T23:20:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '7',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new','home'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '8',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new','home'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '9',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new','home'],
    likes:['Иванов Иван','Юра Иванов']
  },
  {
    id: '10',
    description: 'Женская сборная Беларуси выиграла эстафету в рамках соревнований по биатлону на Олимпийских играх в Пхёнчхане!!!',
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    hashTags:['new','home'],
    likes:['Иванов Иван','Юра Иванов']
  }
];
return {
  getPhotoPosts: function(){
    var arr=photoPosts.slice();
    arr.sort((a,b)=>{
      return a.createdAt-b.createdAt;
    });
    if(arguments.length>2){
      var obj=arguments[2];
      if(obj.author)
        arr=arr.filter((a)=>{
          return a.author==obj.author;
        });
      if(obj.createdAt)
        arr=arr.filter((a)=>{
          let d1=a.createdAt;
          let d2=obj.createdAt;
          return d1.getDate()==d2.getDate()&&d1.getFullYear()==d2.getFullYear()&&d1.getMonth()==d2.getMonth();
        });
      if(obj.hashTags)
        arr=arr.filter((a)=>{
          var h1=a.hashTags;
          var h2=obj.hashTags;
          var f=true;
          h2.forEach((el1)=>{
            if(!h1.find((el2)=>{return el2==el1;}))
              f=false;
          });
          return f;
          });
      
    }
    var a=arguments[0]? arguments[0]:0;
    var b=arguments[1]? arguments[1]:10;
    arr=arr.slice(a,a+b);
   
    return arr;
  },
  getPhotoPost: function(id){
    return photoPosts.find((el)=>{
      return el.id==id;
    })
  },
  validatePhotoPost: function(photoPost){
    return Boolean(photoPost&&Object.keys(photoPost).length<8&&typeof photoPost.id=="string"&&
    typeof photoPost.description=="string"&&photoPost.description.length<200&&photoPost.createdAt instanceof Date&&
    typeof photoPost.author=="string"&&photoPost.author.length>0&&typeof photoPost.photoLink=="string"&&photoPost.photoLink.length>0);
  },
  addPhotoPost: function(photoPost){
    if(this.validatePhotoPost(photoPost)&&!this.getPhotoPost(photoPost.id)){
      photoPosts.push(photoPost);
      return true;
    }
    return false;
  },
  editPhotoPost: function(id,photoPost){
    var ind=0;
    if(photoPosts.find((el,i)=>{
      if(el.id==id){
        ind=i;
        return true;
      }
      return false;
    })){
      var temp=[];
      for(var k in photoPosts[ind]){
        if(Array.isArray(photoPosts[ind][k]))
          temp[k]=photoPosts[ind][k].slice();
        else
          temp[k]=photoPosts[ind][k];
      }
      if(photoPost.description)
        temp.description=photoPost.description;
      if(photoPost.photoLink)
        temp.photoLink=photoPost.photoLink;
      if(photoPost.hashTags&&photoPost.hashTags.length>0)
        temp.hashTags=photoPost.hashTags.slice();
      if(this.validatePhotoPost(temp)){
        photoPosts.splice(ind,1,temp);
        return true;
      }
      else
        return false;
    }
    return false;
  },
  removePhotoPost: function(id){
    var ind=0;
    if(photoPosts.find((el,i)=>{
      if(el.id==id){
        ind=i;
        return true;
      }
      return false;
    })){
      photoPosts.splice(ind,1);
      return true;
    }
    return false;
  }
}
})();