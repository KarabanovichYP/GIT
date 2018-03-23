let filters = document.createElement('div');
filters.className = 'filters';
filters.innerHTML = `
<div class="roman username flt">Filters</div>
<div class="filter">
  <input type="text" placeholder="Username" t="name">
</div>
<div class="filter">
  <input type="text" placeholder="Date(dd.mm.yyyy)" t="date">
</div>
<div class="filter">
  <input type="text" placeholder="#hashtags" t="hashtag">
</div>
`
let fltrs_username = filters.querySelector('input[t="name"]');
let fltrs_date = filters.querySelector('input[t="date"]');
let fltrs_hashtag = filters.querySelector('input[t="hashtag"]');



fltrs_username.addEventListener('input', (e) => {
    filterConfig.author = e.target.value;
    displayPhotoPosts(0, N, filterConfig, true);
})
fltrs_date.addEventListener('input', (e) => {
    let arr = e.target.value.split('.');
    if (arr.length >= 2 && arr[1].length === 2) {
        filterConfig.createdAt = new Date(arr[2] ? arr[2] : 0, arr[1] - 1, arr[0]);
        displayPhotoPosts(0, N, filterConfig, true);
    }
    else {
        filterConfig.createdAt = 0;
        displayPhotoPosts(0, N, 0, true);
    }


})
fltrs_hashtag.addEventListener('input', (e) => {
    filterConfig.hashTags = e.target.value.split('#').slice(1);
    displayPhotoPosts(0, N, filterConfig, true);
})





function start() {
    main.style.height = 'calc(100% - 62px)';
    main.style.margin = '62px 0px 0px 0px';
    App.insertBefore(header, App.firstChild);
    if (sign_pg.querySelector('.sign_wrong'))
        sign_pg.removeChild(sign_wrong);
    while (content.firstChild)
        content.removeChild(content.firstChild);
    content.appendChild(filters);
    content.appendChild(content_div);
    newUser(JSON.parse(localStorage.user).Username);
    JSON.parse(localStorage.user).Password = '';
    sign_input_login.value = '';
    sign_input_pass.value = '';
}
function mainf(add=false,post,edit=false) {
    while (content.firstChild)
        content.removeChild(content.firstChild);
    content.appendChild(filters);
    content.appendChild(content_div);
    if(add){
        addPhotoPost(post);
    }
    if(edit){
        editPhotoPost(post.id,post);
    }
}