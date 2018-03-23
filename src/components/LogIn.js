let sign_pg = document.createElement('div');
sign_pg.className = 'sign_pg';
let heart = document.createElement('div');
heart.innerHTML = 'favorite';
heart.className = 'material-icons sign_heart';
let sign_text = document.createElement('div');
sign_text.className = 'sign_text roman';
sign_text.innerHTML = 'Sign in to Inlike';
let sign_wrong = document.createElement('div')
sign_wrong.className = 'sign_wrong';
sign_wrong.innerHTML = 'Incorrect Login or Password';
let sign_form = document.createElement('div');
sign_form.className = 'sign_form roman';
let sign_form_text1 = document.createElement('div');
sign_form_text1.className = 'sign_form_text';
sign_form_text1.innerHTML = 'Login';
let sign_form_text2 = document.createElement('div');
sign_form_text2.className = 'sign_form_text';
sign_form_text2.innerHTML = 'Password';
let sign_input_login = document.createElement('input');
sign_input_login.className = 'sign_input';
let sign_input_pass = document.createElement('input');
sign_input_pass.className = 'sign_input';
sign_input_pass.type = 'password';
let sign_button_div = document.createElement('div');
sign_button_div.className = 'sign_button_div';
let sign_button = document.createElement('button');
sign_button.className = 'sign_button roman';
sign_button.innerHTML = 'Sign in';
let sign_mainPg = document.createElement('div')
sign_mainPg.className = 'sign_mainPg';
sign_mainPg.innerHTML = 'Main page';


sign_mainPg.addEventListener('click', (e) => {
    start();
})
sign_button.addEventListener('click', sign)
sign_form.addEventListener('keypress', (e) => {
    let key = e.which || e.keyCode;
    if (key === 13)
        sign();
})
function sign() {
    let user={};
    user.Username = sign_input_login.value;
    user.Password = sign_input_pass.value;
    localStorage.user = JSON.stringify(user);
    if (isValid(user))
        start();
    else
        wrongUser();
}
function isValid() {
    return JSON.parse(localStorage.users).find((el) => {
        return el.Username === JSON.parse(localStorage.user).Username && el.Password === JSON.parse(localStorage.user).Password;
    }) ? true : false
}
function wrongUser() {
    sign_pg.insertBefore(sign_wrong, sign_form);
}

function LogIn() {
    localStorage.user=JSON.stringify({Username:'',Password:''});
    if (App.firstChild.className === 'header');
    App.removeChild(App.firstChild);
    while (content.firstChild)
        content.removeChild(content.firstChild);
    main.style.height = '100%';
    main.style.margin = '0';
    sign_button_div.appendChild(sign_button);
    sign_form.appendChild(sign_form_text1);
    sign_form.appendChild(sign_input_login);
    sign_form.appendChild(sign_form_text2);
    sign_form.appendChild(sign_input_pass);
    sign_form.appendChild(sign_button_div);
    sign_pg.appendChild(heart);
    sign_pg.appendChild(sign_text);
    sign_pg.appendChild(sign_form);
    sign_pg.appendChild(sign_mainPg);
    content.appendChild(sign_pg);
}