function parse_set_common_data_return_content(resp){
    var sepIndex = resp.indexOf('$')
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
    xmlHttp.open( "GET", 'user', false );
    xmlHttp.send( null );
    XPscreen.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText)

}
function refresh_shop_form(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'shop', false );
    xmlHttp.send( null );
    ShopForm.innerHTML = parse_set_common_data_return_content(xmlHttp.responseText);

}

function set_avimg(){
    var formData = new FormData(document.forms.avimgs);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "image");
    xmlHttp.send(formData);
    xmlHttp.responseText
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