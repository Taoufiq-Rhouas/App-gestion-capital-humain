$(document).ready(function () {
    if (localStorage.getItem("NameDepart") === null) {
        window.location.href = "login.html";
    }
    else{
        $("#namedepartemente").html(localStorage.getItem("NameDepart"));
        getData();
        getDatahsab();
        getTableEmployer();
        $("#SaveD").click(function(){
            getDatahsab();
        });
    }
});

var hsab = 0 ;
function getData(fetched){
    if(fetched===undefined){
    $.ajax({
        url: '/Company',
        type: 'get',
        success: function (response) {
            if (response.request) {
                AddToTable(response.data);
            }
        },
    });
}else{
    AddToTable(fetched.data);
}
}

function getDatahsab(fetched){
    if(fetched===undefined){
    $.ajax({
        url: '/Employer',
        type: 'get',
        success: function (response) {
            if (response.request) {
                GetInfiEmployer(response.data);  
            }
        },
    });
}else{
    GetInfiEmployer(fetched.data);
}
}

function getTableEmployer(fetched){
    if(fetched===undefined){
    $.ajax({
        url: '/Employer',
        type: 'get',
        success: function (response) {
            if (response.request) {
                AddToTableEmployer(response.data);  
            }
        },
    });
}else{
    AddToTableEmployer(response.data);
}
}

var gv = localStorage.getItem("NameDepart");

function AddToTable(data){
    
    // data correc
    var departement_Data = '';
    $("#resultat").html(departement_Data);
    $.each(data, function (key, value) {
        value.department.forEach(element => {
            if(element.name== gv){
                departement_Data +='<p class="card-text"> <strong>Department Boss : </strong><span id="">' + element.boss + '</span></p><hr>';
                departement_Data +='<p class="card-title"> <strong>Description for departement : </strong><span id="">' + element.description + '</span></p><hr>';   
            }
        });
    });
    $("#resultat").append(departement_Data);
}
var valueId;

function GetInfiEmployer(data){
    
    // data correc
    // var departement_Dataa = '';
    valueId=data.length + 1;
    // console.log('data : '+valueId);
    AddToDataEmployer();
}

function AddToDataEmployer(){
    var nameEmployer = $("#in_nameEmployer").val();
    var prenoEmployer = $("#in_prenoEmployer").val();
    var AgeEmployer = $("#in_AgeEmployer").val();
    var Salaire = $("#in_Salaire").val();
    var nameDepartement = localStorage.getItem("NameDepart");
    var IdEmployer = valueId;
    // console.log('if');
    
    if( nameEmployer != "" && nameDepartement != "" && Salaire != ""){
         $.ajax({
            url:'/AddNewEmployer',
            type:'post',
            data:{IdEmployer,nameEmployer,prenoEmployer,AgeEmployer,Salaire,nameDepartement},
            success:function(response){
                if(response.request){
                    alert('kaayn');
                    getTableEmployer();
                } 
            },
            error:function(){
                alert('waalyi1');
            }
        });
    }else{
        alert('waayli2');
    }
}



////////////////////////////////////////////


function AddToTableEmployer(data){
    
    // data correc
    var nameDepartement = '';
    $("#touEmployer").html(nameDepartement);
    $.each(data, function (key, value) {
        if(value.nameDepartement== gv){
            nameDepartement +='<tr>';
            nameDepartement +='<th scope="row">' + value.IdEmployer + '</th>';
            nameDepartement +='<th scope="row">' + value.nameEmployer + '</th>';
            nameDepartement +='<th scope="row">' + value.prenoEmployer + '</th>';
            nameDepartement +='<th scope="row">' + value.AgeEmployer + '</th>';
            nameDepartement +='<th scope="row">' + value.Salaire + '</th>';
            nameDepartement +='<th scope="row">' + value.nameDepartement + '</th>';
            nameDepartement +='<th scope="row"><input type="button" value="afficher detail"></th>';
            nameDepartement +='</tr>';                
        }
    });
    $("#touEmployer").append(nameDepartement);
}