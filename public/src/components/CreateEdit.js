var currentDate;
var make = false;
let image;
let ph_src;
let ph_id;
let create_div = document.createElement('div');
create_div.className = 'create_div';
let create_top = document.createElement('div');
create_top.className = 'create_top';
let create_cancel = document.createElement('i');
create_cancel.className = 'material-icons create_cancel';
create_cancel.innerHTML = 'cancel';
let username = document.createElement('div');
username.className = 'username roman create_us';
let photo_place = document.createElement('div');
photo_place.className = 'photo_place';
photo_place.innerHTML = `
    <img class='drag_img' src=""/>
    <div class='drag_div'>
        <div class='drag_text'>Drag here<br> or click</div>
    </div>
    <input class="hidden_input" type="file" title=" " accept="image/x-png,image/gif,image/jpeg" >
`
let hidden_input = photo_place.querySelector('.hidden_input');
let photo = photo_place.querySelector('img');
let create_description = document.createElement('input');
create_description.className = 'create_inp';
let create_hash = document.createElement('input');
create_hash.className = 'create_inp';

let date = document.createElement('div');
date.className = 'date';
let time = document.createElement('div');
let day = document.createElement('div');
let save_div = document.createElement('div');
save_div.className = 'create_save_div';
let save = document.createElement('button');
save.className = 'create_save'
save.innerHTML = 'Save';
let change = document.createElement('button');
change.className = 'create_save'
change.innerHTML = 'Save';
let create_wrong = document.createElement('div')
create_wrong.className = 'sign_wrong sign_button_div';
create_wrong.innerHTML = 'Choose Image!';
create_description.placeholder = 'Description ...';
create_hash.placeholder = '#hashtags'
function delAll() {
    while (create_div.firstChild)
        create_div.removeChild(create_div.firstChild);
    make = false;
    URL.revokeObjectURL(photo.src);
    photo.src = " ";
    create_description.value = '';
    create_hash.value = '';
    photo_place.style.height = '350px';
    hidden_input.value = null;
}
function wrongImg() {
    create_div.insertBefore(create_wrong, create_div.childNodes[0]);
}
hidden_input.addEventListener('change', (e) => {
    if (e.target.files[0]) {
        image = e.target.files[0];
        photo.src = URL.createObjectURL(e.target.files[0]);
        ph_src = hidden_input.value;
        make = true;
        photo_place.style.height = 'auto';
    }

})
create_cancel.addEventListener('click', () => {
    delAll();
    mainf();
})
function savePh() {
    if (make) {
        if (sendImage()) {
            mainf(true, {
                description: create_description.value,
                createdAt: currentDate,
                author: username.innerHTML,
                photoLink: ph_src,
                hashTags: create_hash.value.split('#').slice(1),
                likes: []
            });
            delAll();
        }
    }
    else
        wrongImg();
}
function editPh() {
    id = ph_id;
    if (make) {
        if (sendImage()) {
            mainf(false, {
                id: `${id}`,
                description: create_description.value ? create_description.value : ' ',
                createdAt: currentDate,
                author: username.innerHTML,
                photoLink: ph_src,
                hashTags: create_hash.value.split('#').slice(1),
            }, true);
            delAll();
        }
    }
    else {
        mainf(false, {
            id: `${id}`,
            description: create_description.value ? create_description.value : ' ',
            createdAt: currentDate,
            author: username.innerHTML,
            photoLink: ph_src,
            hashTags: create_hash.value.split('#').slice(1),
        }, true);
        delAll();
    }
}
save.addEventListener('click', savePh);
change.addEventListener('click', editPh);
create_div.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode;
    if (key === 13) {
        if (save_div.lastChild === change)
            editPh();
        else
            savePh();
        e.preventDefault();
    }
})
function sendImage() {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `/api/images`, false);
    var formData = new FormData();
    formData.append("img", image);
    xhr.send(formData);
    if (xhr.response) {
        ph_src = xhr.response;
        return true;
    }
    return false;
}
function create() {
    while (content.firstChild)
        content.removeChild(content.firstChild);
    username.innerHTML = JSON.parse(localStorage.User);
    currentDate = new Date();
    let s1, s2, s3;
    s1 = '' + currentDate.getHours();
    s2 = '' + currentDate.getMinutes();
    if (s1.length == 1)
        s1 = '0' + s1;
    if (s2.length == 1)
        s2 = '0' + s2;
    time.innerHTML = s1 + ':' + s2;
    s1 = '' + currentDate.getDate();
    s2 = '' + (currentDate.getMonth() + 1);
    s3 = '' + currentDate.getFullYear();
    if (s1.length == 1)
        s1 = '0' + s1;
    if (s2.length == 1)
        s2 = '0' + s2;
    day.innerHTML = s1 + '.' + s2 + '.' + s3;
    create_top.appendChild(username);
    create_top.appendChild(create_cancel);
    create_div.appendChild(create_top);
    create_div.appendChild(photo_place);
    create_div.appendChild(create_description);
    create_div.appendChild(create_hash);
    date.appendChild(time);
    date.appendChild(day);
    create_div.appendChild(date);
    if (save_div.firstChild)
        save_div.removeChild(save_div.firstChild);
    save_div.appendChild(save);
    create_div.appendChild(save_div);
    document.querySelector('.content').appendChild(create_div);
}
function edit(post) {
    while (content.firstChild)
        content.removeChild(content.firstChild);
    ph_id = post.id;
    photo.src = post.photoLink;
    ph_src = post.photoLink;
    photo_place.style.height = 'auto';
    username.innerHTML = JSON.parse(localStorage.User);
    currentDate = post.createdAt;
    if (typeof currentDate === 'string') {
        currentDate = new Date(currentDate);
    }
    let s1, s2, s3;
    s1 = '' + currentDate.getHours();
    s2 = '' + currentDate.getMinutes();
    if (s1.length == 1)
        s1 = '0' + s1;
    if (s2.length == 1)
        s2 = '0' + s2;
    time.innerHTML = s1 + ':' + s2;
    s1 = '' + currentDate.getDate();
    s2 = '' + (currentDate.getMonth() + 1);
    s3 = '' + currentDate.getFullYear();
    if (s1.length == 1)
        s1 = '0' + s1;
    if (s2.length == 1)
        s2 = '0' + s2;
    day.innerHTML = s1 + '.' + s2 + '.' + s3;
    create_description.value = post.description;
    if (post.hashTags.length > 0)
        create_hash.value = '#' + post.hashTags.join('#');
    create_top.appendChild(username);
    create_top.appendChild(create_cancel);
    create_div.appendChild(create_top);
    create_div.appendChild(photo_place);
    create_div.appendChild(create_description);
    create_div.appendChild(create_hash);
    date.appendChild(time);
    date.appendChild(day);
    create_div.appendChild(date);
    if (save_div.childNodes[0])
        save_div.removeChild(save_div.childNodes[0]);
    save_div.appendChild(change);
    create_div.appendChild(save_div);
    document.querySelector('.content').appendChild(create_div);
}