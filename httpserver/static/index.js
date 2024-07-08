PIXI.sound.add("MenuBtnPress",{
    url: "static\\MenuBtnPress.mp3",
    preload: true
   })

function play_click_sound(){
PIXI.sound.play('MenuBtnPress')
}

function parse_set_common_data_return_content(resp){
    if (resp == "LOGIN"){
        document.getElementById('chk-form-login').checked = true
        return ""
    }
    var sepIndex = resp.indexOf('$')
    if (sepIndex == -1){
        return resp
    }
    var content = resp.slice(sepIndex+1)
    var data = JSON.parse(resp.slice(0,sepIndex))
    for(var key in data) {
        if (key == 'src' || key == 'val') continue
        document.getElementById(key).innerHTML = data[key]
    }
    for(var key in data.src) {
        document.getElementById(key).src = data.src[key]
    }
    for(var key in data.val) {
        document.getElementById(key).value = data.val[key]
    }
    return content
}


function refresh_user_form(ignore=false){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        if (ignore){
            XPscreen.innerHTML = xmlHttp.responseText
        }else{
            XPscreen.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText)
        }
    }
    xmlHttp.open( "GET", 'user', true );
    xmlHttp.send( null );
}


function refresh_play_form(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        ColorMenu.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText)
    }
    xmlHttp.open( "GET", 'play', true );
    xmlHttp.send( null );
}


function login(){
    play_click_sound()
    var formData = new FormData(document.forms.loginForm);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        var resp = xmlHttp.responseText
        if (resp == "OK"){
            errnavLogin.style.display= "none"
            document.getElementById('chk-form-play').checked = true
            refresh_play_form()
            refresh_user_form()
            refresh_shop_form()
        }else{
            errnavLogin.style.display= "block"
            errnavLogin.innerHTML = resp
        }
    }
    xmlHttp.open("POST", "login",true);
    xmlHttp.send(formData);
}


function register(){
    play_click_sound()
    var formData = new FormData(document.forms.registerForm);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        var resp = xmlHttp.responseText
        if (resp == "OK"){
            errnavReg.style.display= "none"
            document.getElementById('chk-form-login').checked = true
        }else{
            errnavReg.style.display= "block"
            errnavReg.innerHTML = resp
        }
    }
    xmlHttp.open("POST", "register",true);
    xmlHttp.send(formData);
}


function logout(){
    play_click_sound()
    document.getElementById('chk-form-play').checked = true
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.onload = function(){
        var resp = xmlHttp.responseText
        document.getElementById('chk-form-play').checked = true
        refresh_play_form()
    }
    xmlHttp.open( "GET", 'logout', false )
    xmlHttp.send( null )

}


function refresh_shop_form(ignore=false){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        if (ignore){
            ShopForm.innerHTML = xmlHttp.responseText
        }else{
            ShopForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText)
        }

    }
    xmlHttp.open( "GET", 'shop', true );
    xmlHttp.send( null );
}


function set_avimg(){
    play_click_sound()
    var formData = new FormData(document.forms.avimgs);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "image");
    xmlHttp.send(formData);
    var _void = xmlHttp.responseText
    refresh_user_form()
    document.getElementById('chk-form-user').checked = true

}


function open_avimg_form(){
    play_click_sound()
    AvimgForm.innerHTML = ""
    document.getElementById('chk-form-avimg').checked = true
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", 'image', false )
    xmlHttp.send( null )
    AvimgForm.innerHTML = xmlHttp.responseText

}


function open_item_page(index,type='V'){
    play_click_sound()
    ItemForm.innerHTML = ''
    document.getElementById('chk-form-item').checked = true
    document.getElementById('lbl-form-item').style.backgroundImage = "url(static/"+type+'.svg)'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'shop/'+index, false );
    xmlHttp.send( null );
    ItemForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText);

}


function buy_item(button,index){
    play_click_sound()
    button.disabled = true;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "POST", 'shop/'+index, false );
    xmlHttp.send( null );
    ItemBuyForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText);
    button.disabled = false;

}


document.onkeydown = function(event) {
    if (event.keyCode == 9 || event.keyCode == 112 || event.keyCode == 114 ) {  //tab pressed
        event.preventDefault();
    }
}


function user_form_select(){
    if (!document.getElementById('chk-form-user').checked){
        play_click_sound()
        refresh_user_form()
    }
}


function play_form_select(){
    if (!document.getElementById('chk-form-play').checked){
        play_click_sound()
        refresh_play_form()
    }
}


function shop_form_select(){
    if (!document.getElementById('chk-form-shop').checked){
        play_click_sound()
        refresh_shop_form()
    }
}


function image_select(obj){
    if (!obj.checked){
        play_click_sound()
    }
}


function settings_form_select(){
    if (!document.getElementById('chk-form-settings').checked){
        play_click_sound()
    }
}


refresh_shop_form(true)
refresh_user_form(true)


