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
    console.log(resp.slice(0,sepIndex))
    var data = JSON.parse(resp.slice(0,sepIndex))
    console.log(data)
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


function refresh_user_form(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        XPscreen.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText)
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
    var formData = new FormData(document.forms.loginForm);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        var resp = xmlHttp.responseText
        if (resp == "OK"){
            errnavLogin.style.display= "none"
            document.getElementById('chk-form-play').checked = true
            refresh_play_form()
        }else{
            errnavLogin.style.display= "block"
            errnavLogin.innerHTML = resp
        }
    }
    xmlHttp.open("POST", "login",true);
    xmlHttp.send(formData);
}


function register(){
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


function refresh_shop_form(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onload = function(){
        ShopForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText)
    }
    xmlHttp.open( "GET", 'shop', true );
    xmlHttp.send( null );
}


function set_avimg(){
    var formData = new FormData(document.forms.avimgs);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "image");
    xmlHttp.send(formData);
    var _void = xmlHttp.responseText
    document.getElementById('chk-form-user').checked = true
    refresh_user_form()
}


function open_avimg_form(){
    AvimgForm.innerHTML = ""
    document.getElementById('chk-form-avimg').checked = true
    var xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", 'image', false )
    xmlHttp.send( null )
    AvimgForm.innerHTML = xmlHttp.responseText

}


function open_item_page(index,type){
    ItemForm.innerHTML = ''
    document.getElementById('chk-form-item').checked = true
    document.getElementById('lbl-form-item').style.backgroundImage = "url(static/"+type+'.svg)'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'shop/'+index, false );
    xmlHttp.send( null );
    ItemForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText);

}


function buy_item(button,index){
    button.disabled = true;
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.open( "POST", 'shop/'+index, false );
    xmlHttp.send( null );
    ItemBuyForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText);

    button.disabled = false;

}


document.onkeydown = function(event) {
    if (event.keyCode == 9 || event.keyCode == 112 || event.keyCode == 114 ) {  //tab pressed
        event.preventDefault(); // stops its action
    }
}