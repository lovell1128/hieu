

var usernameative ="hiu";
var numbill= 0;
var accountactive = 0;
//

function crnewuser(){
    var newuser,a,b,c;
    a = document.getElementById('user-name').value;
    b = document.getElementById('user-account1').value;
    c = document.getElementById('user-password1').value;
    d = document.getElementById('user-password-check').value;
    if(a === "")
        alert("hãy nhập tên");
    else if(b === "")
        alert("hãy nhập tên đăng nhập");
    else if(c === "")
        alert("hãy nhập mật khẩu");
    else if(d !== c)
        alert("mật khẩu không trùng khớp");
    else if(checkuser(b) === 1)
        alert("tài khoản đã tồn tại");
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

function login(){
    var a,b,i;
    a=document.getElementById('user-account').value;
    b=document.getElementById('user-password').value;
    arruser = JSON.parse(localStorage.getItem('user'));
    if(a === "" )
        alert("hãy nhập tên đang nhập");
    else if(b === "") 
        alert("hãy nhập mk");
    else if(a ==='admin' && b==='admin'){
        
        checkactive(1);
        activemodalbox();
    }
    
    else
    for( i = 0; i < arruser.length ;i++ ){
        if( arruser[i].username === a  && arruser[i].password === b){
            alert("Loged in");
           
            accountactive = 1;
            activemodalbox();
            
            usernameative = arruser[i].username;
            document.getElementById('header2').innerHTML = '<div id="logout" class="History" onclick="showhisbill(\''+arruser[i].username+'\');openhis();">Lịch sử</div>';
            document.getElementById('header1').innerHTML = ' <div id="logout"onclick="checkactive(0); checkactive(0);">đăng xuất</div>';
            break;
        }
    }
    if(i === arruser.length )
        alert("sai tài khoản hoặc mật khẩu mời kiểm tra lại");
}

function checkactive(a){
    if(a === 0 && accountactive === 1){
        var tmp = document.getElementById('logout');
        tmp.parentNode.removeChild(tmp);
        accountactive = 0;
    }
    else if(a === 1 &&  accountactive === 0) {
        document.getElementById('header1').innerHTML += '<a  href="admin.html" id="gotoadmin" style="text-decoration: none;">admin</a><a id="logout" onclick="checkactive(2);">đăng xuất</a>';
        accountactive = 1;
    }
    else{
        document.getElementById('header1').removeChild(document.getElementById('logout') );
        document.getElementById('header1').removeChild(document.getElementById('gotoadmin'));
        accountactive = 0;
    }
}

function showhisbill(a){
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    var s="";
    var tmp1,tmp2;
    
    var count = 1;
    for(var i = 0 ;i < arrbill.length;i++){
        if(arrbill[i].namebill === a){
        if(arrbill[i].flagcheck === 1){
            tmp2 = 'chưa xử lí';
            tmp1 = 'đã xử lí';
        }
        else{
            tmp1 = 'chưa xử lí';
            tmp2 = 'đã xử lí';
        }
        s+='<tr> <th>'+count+'</th><th>'+arrbill[i].total+'</th> <th>'+arrbill[i].addr+'</th><th>'+arrbill[i].phone+'</th><th>'+arrbill[i].datebill+'</th><th>'+tmp1+'</th> </tr>';
        count++;
        }
    
    }
    document.getElementById('showcontentbillhome').innerHTML = '<thead><tr> <th>SST</th> <th>Tổng</th> <th>Đ/c</th> <th>SDT</th> <th>Ngày</th> <th>   </th></tr> </thead><tbody id="myCart">'+ s +'</tbody> </table> '; 
}

function showprodhome(a){
  a = parseInt(a);
  var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
  var tr="";
    var tmp = (arrprod.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="showprodhome('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (a-1)*8 ; i < a*8 && i < arrprod.length;i++){
        
        //tmp1 = arrprod[i].idprod;
        //var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprod[i].img +'" onclick="opendetailprod(\''+arrprod[i].idprod+'\')"/> </div> <dl> <dt class="ProductName" >'+ arrprod[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprod[i].priceprod +'</dt> <dt><input type="number" id="'+arrprod[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprod[i].nameprod+'\',\''+arrprod[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
    var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option>chọn loại</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="0" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="0"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="1000000" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="1000000"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1+tr +' <ul>'+s+'</ul>';
  
  }
  
  function typeprod(a){
      if(a === 'A')
          return 'Bánh mì';
      else if(a === 'B')
          return 'Bánh bông lan';
      else if( a === 'C')
          return 'Bánh ngọt';
      else if( a === 'D' )
          return 'Bánh mặn'; 
      else 
          return 'bánh ko xác định';
  }

  
  function showdetailbill(){
      
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    numbill = arrbill.length;
    var arrdetailbill = JSON.parse(localStorage.getItem('detailbilltest'));
    var tr = "";
    for(var i =0;i<arrdetailbill.length; i++){
        if(arrdetailbill[i].idbill === numbill)
          tr+='<tr> <th>'+arrdetailbill[i].nameprod+'</th><th>'+arrdetailbill[i].priceprod+'</th><th>'+arrdetailbill[i].quantityprod+'</th><th>'+arrdetailbill[i].total+'</th> <th><button onclick="deletebill(\''+arrdetailbill[i].nameprod+'\')">xóa</button></th></tr>';
    }
    
    document.getElementById("myCart").innerHTML = tr ;
}
  
  function addtoCart(a,b){
   if(accountactive === 0)
       alert("Bạn chưa đăng nhập");
   else{
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    numbill = arrbill.length;
    var newdetailbill,c,d,e;
    c = document.getElementById(a).value;
    if(c<=0) 
        alert("sô lượnng ko hợp lệ");
    //alert(c);
        var arrdetailbill = JSON.parse(localStorage.getItem('detailbilltest'));
        b = parseFloat(b);
        c = parseFloat(c);
        newdetailbill ={idbill: numbill,nameprod: a, priceprod: b, quantityprod: c, total: b*c};
        
        if(c>0){
  
	arrdetailbill.push(newdetailbill);
        localStorage.setItem('detailbilltest',JSON.stringify(arrdetailbill));
        alert("đặt thành công");
    
    showdetailbill();
    document.getElementById('totalallprod').innerHTML = 'Tổng tiền :     '+totalbill(numbill);
   }
   
   }
  }
  
  function deletebill(s){
    arrbill = JSON.parse(localStorage.getItem('detailbilltest'));
	for(var i=0;i < arrbill.length;i++){
            if(arrbill[i].nameprod === s){
                if(confirm("bạn có chắc xóa này ")){
                    arrbill.splice(i, 1);
                    break;
                }
            }
        }
	localStorage.setItem('detailbilltest',JSON.stringify(arrbill));
        showdetailbill();
        document.getElementById('totalallprod').innerHTML = 'Tổng tiền :     '+totalbill(numbill);
  
}

function totalbill(a){
    var arrdetailbill = JSON.parse(localStorage.getItem('detailbilltest'));
    var sum=0;
    for(var i = 0 ;i <arrdetailbill.length; i++){
        if( arrdetailbill[i].idbill === a)
            sum += arrdetailbill[i].total;
    }
    
    return sum;
    
}

function datebill(){
    var today = new Date();
    var date = parseInt(today.getDate())+'/'+parseInt(today.getMonth()+1)+'/'+parseInt(today.getFullYear());
    return date ;
}

function createbill(){
    if(accountactive === 0)
       alert("bạn cần đăng nhập");
    else{
    var arrbill = JSON.parse(localStorage.getItem('test1'));
    numbill = arrbill.length;
    var a,b;
    a = document.getElementById("address").value;
    b = document.getElementById("phone").value;
    if(a === "")
        alert("nhập địa chỉ");
    else if(b === "")
        alert("nhập sdt");
    else if(b.length < 10 || b.length > 10 || b.charAt(0) !== '0')
        alert("sđt không hợp lệ");
    else{
        newbill = {idbill: numbill,namebill: usernameative, total: totalbill(numbill),addr: a,phone: b, datebill: datebill(), flagcheck: 0};
        arrbill.push(newbill);
        localStorage.setItem('test1',JSON.stringify(arrbill));
        alert("thanh toán thành công xin hãy chờ shop xử lí đơn hàng");
        
        showdetailbill();
    }
    }
}
 function openhis(){
        document.getElementById("history").style.display = "flex";
        }
 function closehis(){
        document.getElementById("history").style.display = "none";
        }
 function opendetailprod(a){
        document.getElementById("detailprod").style.display = "flex";
        inputdetailprod(a);
        }
 function closedetailprod(){
        document.getElementById("detailprod").style.display = "none";
        }
        
        var flagcheckmodal = 0;
function activemodalbox(){
    if(flagcheckmodal === 0){
        document.getElementById('boxmodal').setAttribute("style","display: flex;");
        flagcheckmodal = 1;
    }
    else{
        document.getElementById('boxmodal').setAttribute("style","display: none;");
        flagcheckmodal = 0;
    }
}


function searchbytype1(a){
    var arrprodbytype =[];
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    
    for(var i = 0; i < arrprod.length ; i++){
        if(arrprod[i].idprod.charAt(0) === 'A'){
            var newprodtype = arrprod[i];
            arrprodbytype.push(newprodtype);
        }
    }
    
    
    a = parseInt(a);
    
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
    var tr="";
    var tmp = (arrprodbytype.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="searchbytype1('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (a-1)*8 ; i < a*8 && i < arrprodbytype.length;i++){
        
        tmp1 = arrprodbytype[i].idprod;
        var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container"  > <img src="'+ arrprodbytype[i].img +'" onclick="opendetailprod(\''+arrprodbytype[i].idprod+'\')"/> </div> <dl> <dt class="ProductID"> Loại Bánh: '+ tmp2 +'</dt> <dt class="ProductName" >'+ arrprodbytype[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprodbytype[i].priceprod +'</dt> <dt><input type="number" id="'+arrprodbytype[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprodbytype[i].nameprod+'\',\''+arrprodbytype[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
        var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option>chọn loại</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="0" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="0"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="1000000" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="1000000"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1 + tr +' <ul>'+s+'</ul>';
  
}
function searchbytype2(a){
    var arrprodbytype =[];
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    
    for(var i = 0; i < arrprod.length ; i++){
        if(arrprod[i].idprod.charAt(0) === 'B'){
            var newprodtype = arrprod[i];
            arrprodbytype.push(newprodtype);
        }
    }
    
    
    a = parseInt(a);
    
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
    var tr="";
    var tmp = (arrprodbytype.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="searchbytype2('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (a-1)*8 ; i < a*8 && i < arrprodbytype.length;i++){
        
        tmp1 = arrprodbytype[i].idprod;
        var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprodbytype[i].img +'" onclick="opendetailprod(\''+arrprodbytype[i].idprod+'\')"/> </div> <dl> <dt class="ProductID"> Loại Bánh: '+ tmp2 +'</dt> <dt class="ProductName" >'+ arrprodbytype[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprodbytype[i].priceprod +'</dt> <dt><input type="number" id="'+arrprodbytype[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprodbytype[i].nameprod+'\',\''+arrprodbytype[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
        var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option>chọn loại</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="0" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="0"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="1000000" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="1000000"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1 + tr +' <ul>'+s+'</ul>';
  
}
function searchbytype3(a){
    var arrprodbytype =[];
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    
    for(var i = 0; i < arrprod.length ; i++){
        if(arrprod[i].idprod.charAt(0) === 'C'){
            var newprodtype = arrprod[i];
            arrprodbytype.push(newprodtype);
        }
    }
    
    
    a = parseInt(a);
    
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
    var tr="";
    var tmp = (arrprodbytype.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="searchbytype3('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (a-1)*8 ; i < a*8 && i < arrprodbytype.length;i++){
        
        tmp1 = arrprodbytype[i].idprod;
        var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprodbytype[i].img +'" onclick="opendetailprod(\''+arrprodbytype[i].idprod+'\')"/> </div> <dl> <dt class="ProductID"> Loại Bánh: '+ tmp2 +'</dt> <dt class="ProductName" >'+ arrprodbytype[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprodbytype[i].priceprod +'</dt> <dt><input type="number" id="'+arrprodbytype[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprodbytype[i].nameprod+'\',\''+arrprodbytype[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
        var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option>chọn loại</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="0" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="0"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="1000000" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="1000000"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1 + tr +' <ul>'+s+'</ul>';
  
}
function searchbytype4(a){
    var arrprodbytype =[];
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    
    for(var i = 0; i < arrprod.length ; i++){
        if(arrprod[i].idprod.charAt(0) === 'D'){
            var newprodtype = arrprod[i];
            arrprodbytype.push(newprodtype);
        }
    }
    
    
    a = parseInt(a);
    
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
    var tr="";
    var tmp = (arrprodbytype.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="searchbytype4('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (a-1)*8 ; i < a*8 && i < arrprodbytype.length;i++){
        
        tmp1 = arrprodbytype[i].idprod;
        var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprodbytype[i].img +'" onclick="opendetailprod(\''+arrprodbytype[i].idprod+'\'); "/> </div> <dl> <dt class="ProductID"> Loại Bánh: '+ tmp2 +'</dt> <dt class="ProductName" >'+ arrprodbytype[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprodbytype[i].priceprod +'</dt> <dt><input type="number" id="'+arrprodbytype[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprodbytype[i].nameprod+'\',\''+arrprodbytype[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
        var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option>chọn loại</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="0" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="0"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="1000000" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="1000000"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1 + tr +' <ul>'+s+'</ul>';
  
}

function inputdetailprod(a){
  
  var arrprod = JSON.parse(localStorage.getItem('prod'));
  
  var tr='<div class=" close-detailprod "onclick="closedetailprod();"> <i class="ti-close">  </i> </div> <div class="title-detailprod"><h3 style="">Chi tiết sản phẩm</h3></div> ';
    
    for(var i = 0 ; i < arrprod.length;i++){
        if(arrprod[i].idprod === a){
            tmp1 = arrprod[i].idprod;
            var tmp2 = typeprod(tmp1.charAt(0));
            tr+='<div> <image src="'+ arrprod[i].img +'" class="imgprod"/> </div> <h3>số lượng còn : '+arrprod[i].quantity+'</h3> <h2>Loại : '+tmp2+'</h2> <h2>Tên bánh : '+arrprod[i].nameprod+'</h2> <h2>Giá bánh : '+arrprod[i].priceprod+'</h2> <div class="detailprod-box1"><button>-</button><input type="text" value="0"/><button>+</button></div> <button class= "addcartdetailprod" onclick="addtoCart(\''+arrprod[i].nameprod+'\',\''+arrprod[i].priceprod+'\')">đặt hàng</button>';
        }
       
           
        }
  document.getElementById('detailprod-box').innerHTML= tr ;
  
}
findprodflag=0;
function finprod(){
    
    if(findprodflag === 0){
        document.getElementById("search-box").setAttribute("style","animation-name: ani1; animation-duration: 1s; right: 10px;");
        findprodflag = 1;
    }
    else{
        document.getElementById("search-box").setAttribute("style","animation-name: ani2; animation-duration: 1s; right: -265px;");
        findprodflag =0;
    }
}

function findbyname(a){
   
    var arrprodbytype =[];
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    var b = document.getElementById('search-box1').value;
    for(var i = 0; i < arrprod.length ; i++){
        if(arrprod[i].nameprod.search(b) !== -1){
            var newprodtype = arrprod[i];
            arrprodbytype.push(newprodtype);
        }
    }
    
    a = parseInt(a);
    
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
    var tr="";
    var tmp = (arrprodbytype.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="findbyname('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (a-1)*8 ; i < a*8 && i < arrprodbytype.length;i++){
        
        tmp1 = arrprodbytype[i].idprod;
        var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprodbytype[i].img +'" onclick="opendetailprod(\''+arrprodbytype[i].idprod+'\'); "/> </div> <dl> <dt class="ProductID"> Loại Bánh: '+ tmp2 +'</dt> <dt class="ProductName" >'+ arrprodbytype[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprodbytype[i].priceprod +'</dt> <dt><input type="number" id="'+arrprodbytype[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprodbytype[i].nameprod+'\',\''+arrprodbytype[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
    if(arrprodbytype.length === 0)
        tr = '<h2 style="text-align: center;">không có sản phẩm</h2>';
         var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option>chọn loại</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="0" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="0"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="1000000" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="1000000"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1 + tr +' <ul>'+s+'</ul>';
  
}



function search_extreme(num){
    var arrprodbytype =[];
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    var a = document.getElementById('boxsearchname').value;
    var b = document.getElementById('boxsearchtype').value;
    var c = document.getElementById('boxsearchprice-low').value;
    var d = document.getElementById('boxsearchprice-high').value;
    c = parseFloat(c);
    d = parseFloat(d);
    
    for(var i = 0; i < arrprod.length ; i++){
        if(arrprod[i].nameprod.search(a) !== -1){
            if(arrprod[i].idprod.search(b) !==-1){
                
                if(arrprod[i].priceprod >= c && arrprod[i].priceprod <= d){
                    var newprodtype = arrprod[i];
                    arrprodbytype.push(newprodtype);
                }
            }
        }
    }
    
    num = parseInt(num);
    
    var arrprod = JSON.parse(localStorage.getItem('prod'));
    document.getElementById('contentprod').innerHTML= ' <div id="Product"></div>';
    var tr="";
    var tmp = (arrprodbytype.length-1)/8 + 1;
    var s="";
    for(var j = 1 ;j <= parseInt(tmp);j++){
        s += '<li onclick="search_extreme('+ j +');">'+ j +'</li>';
    }
    var tmp1;
    for(var i = (num-1)*8 ; i < num*8 && i < arrprodbytype.length;i++){
        
        tmp1 = arrprodbytype[i].idprod;
        var tmp2 = typeprod(tmp1.charAt(0));
        tr+='<div class="productbox"> <div class="img-container" > <img src="'+ arrprodbytype[i].img +'" onclick="opendetailprod(\''+arrprodbytype[i].idprod+'\'); "/> </div> <dl> <dt class="ProductID"> Loại Bánh: '+ tmp2 +'</dt> <dt class="ProductName" >'+ arrprodbytype[i].nameprod +' </dt> <dt class="ProductPrice" >Giá : '+ arrprodbytype[i].priceprod +'</dt> <dt><input type="number" id="'+arrprodbytype[i].nameprod+'" value="0"/><button onclick="addtoCart(\''+arrprodbytype[i].nameprod+'\',\''+arrprodbytype[i].priceprod+'\')">đặt hàng</button></dt> </dl> </div>';
           
        }
    if(arrprodbytype.length === 0)
        tr = '<h2 style="text-align: center;">không có sản phẩm</h2>';
          var s1 = '<div id="boxsearch"><div><input id="boxsearchname" type="text" placeholder="tìm theo tên" onchange="search_extreme(1);" value="'+a+'"> <select id="boxsearchtype" onchange="search_extreme(1);"> <option value="0">lựa chọn</option> <option value="A">bánh mì</option><option value="B">bánh bông lan</option> <option value="C">bánh ngọt</option> <option value="D">bánh mặn</option></select><label >Giá (thấp): <input id="boxsearchprice-low" type="range" min="0" max="1000000" value="'+c+'" onchange="search_extreme(1);"> <input id="boxsearchprice-lowshow" type="text" disabled="" value="'+c+'"></label><label >Giá (cao): <input id="boxsearchprice-high" type="range"  min="0" max="1000000" value="'+d+'" onchange="search_extreme(1);"><input id="boxsearchprice-highshow" type="text" disabled="" value="'+d+'"></label></div></div>';    
  document.getElementById('Product').innerHTML= s1 + tr +' <ul>'+s+'</ul>';
  
}