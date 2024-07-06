

function refresh_shop_form(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        ShopForm.innerHTML = xmlHttp.responseText;
    }
    xmlHttp.open( "GET", 'shop', true );
    xmlHttp.send( null );

}

function open_item_page(index,type){
    ItemForm.innerHTML = ''
    document.getElementById('chk-form-item').checked = true
    document.getElementById('lbl-form-item').style.backgroundImage = "url(static/"+type+'.svg)'
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        ItemForm.innerHTML = xmlHttp.responseText;
    }
    xmlHttp.open( "GET", 'shop/'+index, true );
    xmlHttp.send( null );

}