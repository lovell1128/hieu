function test9(){
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    var test10 ="";
    for(var i = 0 ;i < arrprod.length;i++){
        test10+= arrprod[i].idprod+','+arrprod[i].nameprod+','+arrprod[i].priceprod+','+arrprod[i].quantity;
    }
    document.getElementById('test10').innerHTML=test10;
}

function showprodadmin(a){
        a = parseInt(a);
	var arrprod = JSON.parse(localStorage.getItem('prod'));
        if(arrprod.length === 0 ){
            document.getElementById('contentadmin').innerHTML = '<ul>không có sp nào</ul>';
            
        }
        else{
	var tr="";
        var tmp = (arrprod.length-1)/6 + 1;
        var s="";
        for(var j = 1 ;j <= parseInt(tmp);j++){
            s += '<li onclick="showprodadmin('+ j +');">'+ j +'</li>';
        }
        
        for(var i = (a-1)*6 ; i < a*6 && i < arrprod.length;i++){
		tr+=' <td> <button onclick="setprodadmin('+i+',1);">...</button>'+arrprod[i].idprod+'</td> <td> <button onclick="setprodadmin('+i+',2);">...</button> '+arrprod[i].nameprod+'</td> <td> <button onclick="setprodadmin('+i+',3);">...</button> '+ arrprod[i].priceprod +' </td> <td> <button onclick="setprodadmin('+i+',4);">...</button> '+ arrprod[i].quantity+'  </td> <td><button onclick="deleteprod(\''+arrprod[i].idprod+'\');">xóa</button> <image src="'+arrprod[i].img+'" height= "70px" width= "60px"> <input type="file" id="myFile'+i+'"placeholder="img" /><button onclick="uploadimg('+i+')">up</button></td> ';
                tr ='<tr>'+ tr +'</tr>';
            }
	document.getElementById('contentadmin').innerHTML= '<table id="contentadminbox1"> <tr> <th>Mã</th> <th>Tên</th> <th>Giá</th> <th>SL</th> </tr> '+tr +' </table> <ul>'+s+'</ul>';
        
        }
}

function uploadimg(a){
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    x = document.getElementById('myFile'+a+'');
    var y =x.value;
    for(var i = y.length; i>0; i--){
        if(y[i] === "\\"){
            y=y.slice(i+1);
            break;
        }
    }
    arrprod[a].img = 'image/'+y;
    alert("completed");
    localStorage.setItem('prod',JSON.stringify(arrprod));
    showprodadmin((a-1)/6+1);
}

function checkid(s){
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    for(var i = 0 ;i <arrprod.length;i++ ){
        if(arrprod[i].idprod === s)
            return 1; 
    }
    return 0;
}

function setprodadmin(i,a){
    // i la vi tri san pham trong mang
    // a thu tu thuoc tinh
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('idprod').value = arrprod[i].idprod;
    document.getElementById('nameprod').value = arrprod[i].nameprod;
    document.getElementById('priceprod').value = arrprod[i].priceprod;
    document.getElementById('quantityprod').value = arrprod[i].quantity;
    
    inputprod(2);
    
    if(a === 1){
        document.getElementById('idprod').focus();
    }
    else if( a === 2){
        document.getElementById('nameprod').focus();
    }
    else if( a === 3){
        document.getElementById('priceprod').focus();
    }
    else{
        document.getElementById('quantityprod').focus();
    }
        
}

function checkquantity(a){
    if(a >= 0)
        return 1;
    return 0;
}

function setprod(){
    arrprod = JSON.parse(localStorage.getItem('prod'));
    var a,b,c,d,i;
   
    a = document.getElementById('idprod').value;
    b = document.getElementById('nameprod').value;
    c = parseFloat(document.getElementById('priceprod').value);
    d = parseInt(document.getElementById('quantityprod').value);
    for(i = 0;i<arrprod.length;i++){
        if( arrprod[i].idprod === a || arrprod[i].nameprod === b){
            alert("hợp lệ");
            break;
        }
    }
    if(a === "")
        alert("hãy nhập mã sp");
    else if(b === "")
        alert("hãy nhập tên sp");
    else if(c === "")
        alert("hãy nhập giá sp");
    else if(d === "")
        alert("hãy nhập số lượng");
    else if(checkquantity(d) === 0)
        alert("số lượng ko hợp lệ");
    else if(checkquantity(c) === 0)
        alert("giá ko hợp lệ");
    else if(i >= arrprod.length)
        alert("không hơp lệ");
    else{
        
        arrprod[i].idprod = a;
        arrprod[i].nameprod = b;
        arrprod[i].priceprod = c;
        arrprod[i].quantity = d;
	localStorage.setItem('prod',JSON.stringify(arrprod));
        alert("sửa thành công");
    }
    showprodadmin((i-1)/6+1);
}

function deleteprod(s){
	arrprod = JSON.parse(localStorage.getItem('prod'));
        var i;
	for( i=0;i < arrprod.length;i++){
            if(arrprod[i].idprod === s){
                if(confirm("bạn có chắc xóa này ")){
                    arrprod.splice(i, 1);
                    break;
                }
            }
        }
	localStorage.setItem('prod',JSON.stringify(arrprod));
        showprodadmin((i-1)/6+1);
        
}

function createnewprod()
{
    arrprod = JSON.parse(localStorage.getItem('prod'));
    var newprod,a,b,c,d;
    a = document.getElementById('idprod').value;
    b = document.getElementById('nameprod').value;
    c = document.getElementById('priceprod').value;
    d = document.getElementById('quantityprod').value;
    if(a === "")
        alert("hãy nhập mã sp");
    else if(b === "")
        alert("hãy nhập tên sp");
    else if(c === "")
        alert("hãy nhập giá sp");
    else if(d === "")
        alert("hãy nhập số lượng");
    else if(checkid(a) === 1)
        alert("trùng mã ");
    else if(checkquantity(d) === 0)
        alert("số lượng ko hợp lệ");
    else{
	newprod = {idprod: a, nameprod: b, priceprod: parseFloat(c), quantity: d, img: 'image/000.png'};
        arrprod.push(newprod);
	localStorage.setItem('prod',JSON.stringify(arrprod));
        alert("nhập thành công");
    }
    showprodadmin((arrprod.length-1)/6+1);
}

function cradmin(){
    arruser = JSON.parse(localStorage.getItem('user'));
    if(arruser.length === 0){
    var newuser = {fullname: 'admin', username: 'admin', password: 'admin'};
    arruser.push(newuser);
    localStorage.setItem('user',JSON.stringify(arruser));
    }
}

function showuser(a){
    a = parseInt(a);
    cradmin();
    var arruser = JSON.parse(localStorage.getItem('user'));
	var tmp = (arruser.length-1)/10 + 1;
        var s="";
        for(var j = 1 ;j <= parseInt(tmp);j++){
            s += '<li onclick="showuser('+ j +');">'+ j +'</li>';
        }
        var tr="";
	for(var i = (a-1)*10 ; i < a*10 && i < arruser.length;i++){
		tr+='<td>'+arruser[i].fullname+'</td> <td>'+arruser[i].username+'</td> <td>'+ arruser[i].password +'</td> <td><button onclick="deleteuser(\''+arruser[i].username+'\');">xóa tai khoan '+ arruser[i].username +'</button></td>';	
                tr = '<tr>'+ tr +'</tr>';
        }
    document.getElementById('contentadmin').innerHTML='<table id="contentadminbox1"> <tr> <th>NAME</th> <th>ACCOUNT</th> <th>PASSWORD</th> </tr>'+ tr +' </table> <ul>'+s+'</ul>';

}

function deleteuser(s){
	arruser = JSON.parse(localStorage.getItem('user'));
	for(var i=1;i < arruser.length;i++){
            if(arruser[i].username === s){
                if(confirm("bạn có chắc xóa này ")){
                    arruser.splice(i, 1);
                    break;
                }
            }
        }
	localStorage.setItem('user',JSON.stringify(arruser));
        showuser((i-1)/10+1);
        
}

function crnewuser(){
    var newuser,a,b,c;
    a = document.getElementById('idname').value;
    b = document.getElementById('iduser').value;
    c = document.getElementById('idpass').value;
    d = document.getElementById('idpass1').value;
    if(a === "")
        alert("hãy nhập tên");
    else if(b === "")
        alert("hãy nhập tên đăng nhập");
    else if(c === "")
        alert("hãy nhập mật khẩu");
    else if(d !== c)
        alert("mật khẩu không trùng khớp");
    else if(checkuser(b) === 1)
        alert("tk đã tồn tại");
    else if(c.length < 6)
        alert("mật khẩu ít nhất 6 chữ số");
    else{
	arruser = JSON.parse(localStorage.getItem('user'));
	newuser = {fullname: a, username: b, password: c};
	arruser.push(newuser);
	localStorage.setItem('user',JSON.stringify(arruser));
        alert("đăng kí thành công");
    }
    //showuser((arruser.length-1)/6+1);
}

function checkuser(a){
    var arruser = JSON.parse(localStorage.getItem('user'));
    for(var i = 0;i < arruser.length ;i++){
        if(a === arruser[i].username)
            return 1;
    }
    return 0;
}



var flag1=0,flag2=0;flag3=0,flag4=0;
function checkflag(){
    if(flag1 === 1 ){
        document.getElementById("Prodadmin").setAttribute("style","animation-name: ani4; animation-duration: 1s; top: 245px; ");
        flag1 = 0;
    }
    else if(flag2 === 1 ){
        document.getElementById("Accadmin").setAttribute("style","animation-name: ani4; animation-duration: 1s; top: 245px; ");
        flag2 = 0;
    }
    else if(flag3 === 1 ){
        document.getElementById("Billadmin").setAttribute("style","animation-name: ani4; animation-duration: 1s; top: 245px; ");
        flag3 = 0;
    }
    else if(flag4 === 1){
        document.getElementById("Reportadmin").setAttribute("style","animation-name: ani4; animation-duration: 1s; top: 245px; ");
        flag4 = 0;
    }
}

function showcontentadmin(a){
    if(a === 1){
        checkflag();
        document.getElementById("Prodadmin").setAttribute("style","animation-name: ani3; animation-duration: 1s; top: 208px; ");
        flag1 = 1;
        showprodadmin(1);
    }
    else if(a === 2){
        checkflag();
        document.getElementById("Accadmin").setAttribute("style","animation-name: ani3; animation-duration: 1s; top: 208px; ");
        flag2 = 1;
        showuser(1);
    }
    else if(a === 3){
        checkflag();
        document.getElementById("Billadmin").setAttribute("style","animation-name: ani3; animation-duration: 1s; top: 208px; ");
        flag3 = 1;
        showbilladmin(1);
    }
    else {
        checkflag();
        document.getElementById("Reportadmin").setAttribute("style","animation-name: ani3; animation-duration: 1s; top: 208px; ");
        flag4 = 1;
        turnoverper_month();
    } 
}
var flaginput = 0;
function inputprod(a){
    if(a === 1){
        document.getElementById("inputadmin").setAttribute("style","animation-name: ani5; animation-duration: 1s; top: 120px; right: 30px;");
        flaginput = 1;
        document.getElementById("inprod").setAttribute("style","display: inline-table;");
        document.getElementById("setprod").setAttribute("style","display: none;");
    }
    else if(a === 2){
        document.getElementById("inputadmin").setAttribute("style","animation-name: ani5; animation-duration: 1s; top: 120px; right: 30px;");
        flaginput = 2;
        document.getElementById("inprod").setAttribute("style","display: none;");
        document.getElementById("setprod").setAttribute("style","display: inline-table;");
    }
    else if(a === 2 && flaginput === 1){
        flaginput = 2;
        document.getElementById("inprod").setAttribute("style","display: none;");
        document.getElementById("setprod").setAttribute("style","display: inline-table;");
    }
    else if(a === 1 && flaginput === 2 ){
        flaginput = 1;
        document.getElementById("inprod").setAttribute("style","display: inline-table;");
        document.getElementById("setprod").setAttribute("style","display: none;");
    }
    else{
        document.getElementById("inputadmin").setAttribute("style","animation-name: ani6; animation-duration: 1s; top: 250px; right: 600px;");
        flaginput = 0;
    }
}

var accountactive = 0, useractive= null;
function login(){
    var a,b,i;
    a=document.getElementById('user').value;
    b=document.getElementById('pass').value;
    arruser = JSON.parse(localStorage.getItem('user'));
    if(a === "" )
        alert("hãy nhập tên đang nhập");
    else if(b === "") 
        alert("hãy nhập mk");
    else if(a ==='admin' && b==='admin'){
        checkactive(1);
    }
    else
    for( i = 0; i < arruser.length ;i++ ){
        if( arruser[i].username === a  && arruser[i].password === b){
            alert("Loged in");
            accountactive = 1;
            useractive = arruser[i].username;
            document.getElementById('headerbox3').innerHTML += ' <div id="logout"onclick="checkactive(0);">đăng xuất</div>';
            break;
        }
    }
    if(i === arruser.length )
        alert("sai tk hoặc mk mời kiểm tra lại");
}

function checkactive(a){
    if(a === 0 && accountactive === 1){
        var tmp = document.getElementById('logout');
        tmp.parentNode.removeChild(tmp);
        accountactive = 0;
    }
    else if(a === 1 &&  accountactive === 0) {
        document.getElementById('headerbox3').innerHTML += '<div id="gotoadmin" ><a href="admin.html" style="text-decoration: none;">admin</a></div> <div id="logout" onclick="checkactive(2);">đăng xuất</div>';
        accountactive = 1;
    }
    else{
        document.getElementById('headerbox3').removeChild(document.getElementById('logout') );
        document.getElementById('headerbox3').removeChild(document.getElementById('gotoadmin'));
       
    }
}

function shopping(){
    if( accountactive === 1){
        alert("đã đăng nhập");
    }
    else
    {
        alert("bạn chưa đăng nhập");
    }
}

function billadmin(){
    
}
/*
function showprodhome(a){
    a = parseInt(a);
	var arrprod = JSON.parse(localStorage.getItem('prod'));
        document.getElementById('contentprod').innerHTML= '<h2> PRODUCT </h2> <div id="Product"></div>';
	var tr="";
        var tmp = (arrprod.length-1)/8 + 1;
        var s="";
        for(var j = 1 ;j <= parseInt(tmp);j++){
            s += '<li onclick="showprodhome('+ j +');">'+ j +'</li>';
        }
        
        for(var i = (a-1)*8 ; i < a*8 && i < arrprod.length;i++){
		tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprod[i].img +'"/> </div> <dl> <dt> Mã Sản Phẩm: '+ arrprod[i].idprod +'</dt> <dt>'+ arrprod[i].nameprod +' </dt> <dt>Giá : '+ arrprod[i].priceprod +'</dt> <dt><button>-</button><input type="text" id="prodcount" value="0"/><button>+</button> <button onclick="">đặt hàng</button></dt> </dl> </div>';
               
            }
	document.getElementById('Product').innerHTML= tr +' <ul>'+s+'</ul>';
    
}*/

function showbill(){
    var arrbill = JSON.parse(localStorage.getItem('bill'));
    var s="";
    for(var i = 0;i < arrbill.length;i++){
        s+='<ul> <li>'+arrbill[i].idprodbill+'</li><li>'+arrbill[i].nameprodbill+'</li> <li>'+arrbill[i].priceprodbill+'</li><li>'+arrbill[i].quantitybill+'</li><li>'+arrbill[i].total+'</li> <button onclick="deletebill(\''+arrbill[i].idprodbill+'\');">bỏ sản phẩm '+ arrbill[i].idprodbill +'</button> </ul>';
    }
    document.getElementById('contentshopping').innerHTML = s;
}


function showbilladmin(a){
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    var s="";
    var tmp1,tmp2;
    
    var tmp = (arrbill.length-1)/10 + 1;
    var tr="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        tr += '<li onclick="showbilladmin('+ j +');">'+ j +'</li>';
    }
    
    for(var i = (a-1)*10 ; i < a*10 &&i < arrbill.length;i++){
        if(arrbill[i].flagcheck === 1){
            tmp2 = 'chưa xử lí';
            tmp1 = 'đã xử lí';
        }
        else{
            tmp1 = 'chưa xử lí';
            tmp2 = 'đã xử lí';
        }
        s+='<tr> <td>'+arrbill[i].namebill+'</td><td><button onclick="showdetailbilladmin('+arrbill[i].idbill+');">...</button>'+arrbill[i].total+'</td> <td>'+arrbill[i].addr+'</td><td>'+arrbill[i].phone+'</td><td>'+arrbill[i].datebill+' <select onchange="checkbill(this,'+i+');"/><option value="0">'+tmp1+'</option> <option value="1">'+tmp2+'</option></td> </tr>';
        
    }
    document.getElementById('contentadmin').innerHTML = '<table id="contentadminbox1"> <tr> <th>Bill</th> <th>Tổng</th> <th>Đ/c</th> <th>SĐT</th> <th>Ngày</th></tr> '+ s +' </table> <ul>'+tr+'</ul>';
}

function checkbill(obj,a){
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    var tmp = obj.value;
    
    if( tmp === '1' && arrbill[a].flagcheck === 0 ){
        arrbill[a].flagcheck = 1 ;
        alert("đã xử lí đơn");
    }
    else if(tmp === '1' && arrbill[a].flagcheck === 1){
        arrbill[a].flagcheck = 0 ;
        alert("đã hủy đơn đơn xử lí");
    }
        
    localStorage.setItem('test1',JSON.stringify(arrbill));
    showbilladmin((a-1)/10+1);
}

function showdetailbilladmin(a){
    var arrdetailbill = JSON.parse(localStorage.getItem('detailbilltest'));
    var tr = "";
    var count = 1;
    
    for(var i =0;i<arrdetailbill.length; i++){
        if(arrdetailbill[i].idbill === a){
            tr+= count+'\nTên sản phẩm : '+arrdetailbill[i].nameprod+'\nGiá : '+arrdetailbill[i].priceprod+'\nSố lượng : '+arrdetailbill[i].quantityprod+'\nThành tiền : '+arrdetailbill[i].total+'\n';
            count++;
        }
    }
    
    document.getElementById("showdetailbill").innerHTML = tr ;
    document.getElementById('detailbill').setAttribute("style","display: block;");
}

function closedetailbill(){
    document.getElementById('detailbill').setAttribute("style","display: none;");
}

function turnoverper_month(){
    var arrdetailbill = JSON.parse(localStorage.getItem('detailbilltest'));
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    var arrturnover = [];
    var tr= "",newtmp;
    
    for(var i=0;i < arrbill.length; i++){
        for(var j = 0 ;j < arrdetailbill.length; j++){
            if( arrdetailbill[j].idbill === arrbill[i].idbill && arrbill[i].flagcheck === 1){
               newtmp = {perdate: arrbill[i].datebill, quantityper: arrdetailbill[j].quantityprod, turnoverper: arrdetailbill[j].total};
               arrturnover.push(newtmp);
               //tr += '<tr><td>'+arrbill[i].datebill+'</td><td>'+arrdetailbill[j].quantityprod+'</td><td>'+arrdetailbill[j].total+'</td></tr>';
            }
        }
    }
    var tmp1= arrturnover[0].quantityper,tmp2 = arrturnover[0].turnoverper;
    for(var i =  0;i < arrturnover.length-1; i++){
       if(arrturnover[i+1].perdate !== arrturnover[i].perdate){
           tr += '<tr><td>'+arrturnover[i].perdate+'</td><td>'+tmp1+'</td><td>'+tmp2+'</td></tr>';
           tmp1 = 0;
           tmp2 = 0;
       }
           tmp1 += arrturnover[i+1].quantityper;
           tmp2 += arrturnover[i+1].turnoverper;
        
    }
    tr += '<tr><td>'+arrturnover[i].perdate+'</td><td>'+tmp1+'</td><td>'+tmp2+'</td></tr>';
           
    localStorage.setItem('turnoverperday',JSON.stringify(arrturnover)); 
    document.getElementById('contentadmin').innerHTML= '<table id="contentadminbox1"> <tr> <th>Ngày </th> <th>Số lượng đã bán</th> <th>tổng doanh thu</th></tr> '+tr +' </table> ';
        
}

