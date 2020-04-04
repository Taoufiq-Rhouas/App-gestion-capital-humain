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
    var nom = $("#in_nameEmployer").val();
    var Prenom = $("#in_prenoEmployer").val();
    var Age = $("#in_AgeEmployer").val();
    var salaire = $("#in_Salaire").val();
    var departement = localStorage.getItem("NameDepart");
    var Matricule = 'MA'+valueId;
    // console.log('if');
    
    if( nom != "" && departement != "" && salaire != ""){
         $.ajax({
            url:'/AddNewEmployer',
            type:'post',
            data:{Matricule,nom,Prenom,Age,salaire,departement},
            success:function(response){
                if(response.request){
                    alert('kaaaayn ');
                    getTableEmployer();
                } 
            },
            error:function(){
                alert('waalyi1 A sat');
            }
        });
    }else{
        alert('waayli2 A sat');
    }
}



////////////////////////////////////////////


function AddToTableEmployer(data){
    var conturid =1;
    var nameDepartement = '';
    $("#touEmployer").html(nameDepartement);
    $.each(data, function (key, value) {
        if(value.departement== gv){
            nameDepartement +='<tr class="1">';
            nameDepartement +='<th scope="row">' + value.Matricule + '</th>';
            nameDepartement +='<th scope="row">' + value.nom + '</th>';
            nameDepartement +='<th scope="row" class="2"> <input type="button" onclick="biyenliya(this.id)" id="event_afficher'+ conturid +'" value="tous autres détails"></th>';
            nameDepartement +='</tr>';

            nameDepartement +='<tr>';
            nameDepartement +='<th scope="row" colspan="3">';
            nameDepartement +='<div class="ban" id="event_afficher'+conturid+'_div"style="display: none;">'
            nameDepartement +='<div><p>Matricule : ' + value.Matricule + '</p></div>';
            nameDepartement +='<div><p>Nom : ' + value.nom + ' </p></div>';
            nameDepartement +='<div><p>Prenom : ' + value.Prenom + ':</p></div>';
            nameDepartement +='<div><p>Age : ' + value.Age + '</p></div>';
            nameDepartement +='<div><p>salaire : ' + value.salaire + '</p></div>';
            nameDepartement +='<div>Departement : ' + value.departement + '</p></div>';
            nameDepartement +='</div>';
            nameDepartement +='</th>';
            nameDepartement +='</tr>';
            conturid ++;
        }
    });
    $("#touEmployer").append(nameDepartement);
}
function biyenliya(d){
    var id_div = '#'+d+'_div';
    $(id_div).slideToggle(1000);  
}