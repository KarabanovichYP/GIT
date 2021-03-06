if (!localStorage.User)
    localStorage.User = JSON.stringify(null);
let filterConfig = { author: '', createdAt: 0, hashTags: [] };
let content = document.querySelector('.content');
let App = document.querySelector('.App');
let main = document.querySelector('.main');
let header = document.createElement('div');
const N = 5;
header.className = 'header';
header.innerHTML = `
<div class="fl">
    <i class="cur ph material-icons " style="font-size:39px;">add_a_photo</i>
</div>
<div class="fl heart">
    <div class="material-icons" style="color:red ;font-size: 40px ">favorite</div>
</div>
<div class="fl">
    <div class="sign">
        <div class="username roman" id="Username" style="color:#f4f4f4">Username</div>
        <button class="signb cur">Sign out</button>
    </div>
</div>
`
let header_button = header.querySelector('.signb');
let create_button = header.querySelector('.ph')

let content_div = document.createElement('div');
content_div.className = 'content_div';
content_div.innerHTML = `
<div class="posts"></div>
<div class="refresh">
  <i class="material-icons refresh cur" style="font-size: 39px">refresh</i>
</div>
`

header_button.addEventListener('click', () => {
    LogIn();
})
create_button.addEventListener('click', () => {
    if (JSON.parse(localStorage.User)) {
        create();
    }
    else
        LogIn();
})
let refresh = content_div.querySelector('.refresh');
let posts = content_div.querySelector('.posts');
refresh.addEventListener('click', refr);

function refr() {
    let skip = posts.childNodes.length;
    displayPhotoPosts(skip, N, filterConfig);
}
posts.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'favorite_border') {
        let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        addLike(id, JSON.parse(localStorage.User));
    }
    else if (e.target.innerHTML === 'favorite') {
        let id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        delLike(id, JSON.parse(localStorage.User));
    }
    else if (e.target.innerHTML === 'delete_forever') {
        let id = e.target.parentNode.parentNode.parentNode.id;
        removePhotoPost(id);
    }
    else if (e.target.innerHTML === 'create') {
        let id = e.target.parentNode.parentNode.parentNode.id;
        edit(Posts.getPhotoPost(id));
    }
})
start();