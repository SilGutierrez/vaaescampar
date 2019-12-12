var provider = new firebase.auth.GoogleAuthProvider();


var listaPartidos=[
    {
        "mes":"Septiembre",
        "turno":"matutino",
        "fecha":"01/09",
        "equipos":"U1 vs U4",
        "locacion":"AJ Katzenmaier",
        "horario":"9:30 am",
        "Id":"1s"
    },
    
    {
        "mes":"Septiembre",
        "turno":"vespertino",
        "fecha":"01/09",
        "equipos":"U3 vs U2",
        "locacion":"Greenbay",
        "horario":"13:00 pm",
        "Id":"2s"
    },
    
    {
        "mes":"Septiembre",
        "turno":"matutino",
        "fecha":"08/09",
        "equipos":"U5 vs U6",
        "locacion":"Howard A Yeager",
        "horario":"9:30 am", 
        "Id":"3s"
    },
    
    {
        "mes":"Septiembre",
        "turno":"vespertino",
        "fecha":"08/09",
        "equipos":"U6 vs U1",
        "locacion":"Howard A Yeager",
        "horario":"13:00 pm", 
        "Id":"4s"
    },
    
    {
        "mes":"Septiembre",
        "turno":"matutino",
        "fecha":"15/09",
        "equipos":"U2 vs U4",
        "locacion":"North",
        "horario":"9:30 am", 
        "Id":"5s"

    },
    
    {
        "mes":"Septiembre",
        "turno":"vespertino",
        "fecha":"15/09",
        "equipos":"U3 vs U5",
        "locacion":"AJ Katzenmaier",
        "horario":"13:00 pm",
        "Id":"6s"
    },
    
    {
        "mes":"Septiembre",
        "turno":"matutino",
        "fecha":"22/09",
        "equipos":"U1 vs U3",
        "locacion":"South",
        "horario":"9:30 am", 
        "Id":"7s"
    },
    
    {
        "mes":"Septiembre",
        "turno":"vespertino",
        "fecha":"22/09",
        "equipos":"U2 vs U6",
        "locacion":"Howard A Yeager",
        "horario":"13:00 pm",
        "Id":"8s"
    },
    
    {
         "mes":"Septiembre",
        "turno":"matutino",
        "fecha":"29/09",
        "equipos":"U5 vs U5",
        "locacion":"Greenbay",
        "horario":"9:30 am",
        "Id":"9s"
        
    },
    
    {
         "mes":"Octubre",
        "turno":"matutino",
        "fecha":"06/10",
        "equipos":"U2 vs U5",
        "locacion":"Marjorie P Hart",
        "horario":"9:30 am", 
        "Id":"1o"
    },
    
    {
        "mes":"Octubre",
        "turno":"vespertino",
        "fecha":"06/10",
        "equipos":"U1 vs U6",
        "locacion":"South",
        "horario":"1:00 pm",      
        "Id":"2o"
    },
    
    {
        "mes":"Octubre",
        "turno":"matutino",
        "fecha":"13/10",
        "equipos":"U3 vs U4",
        "locacion":"Howard A Yeager",
        "horario":"9:30 am",
        "Id":"3o"
    },
    
    {
         "mes":"Octubre",
        "turno":"vespertino",
        "fecha":"13/10",
        "equipos":"U5 vs U1",
        "locacion":"Greenbay",
        "horario":"1:00 pm",
        "Id":"5o"
    },
    
     {
         "mes":"Octubre",
         "turno":"matutino",
        "fecha":"20/10",
        "equipos":"U6 vs U3",
        "locacion":"North",
        "horario":"9:30 am", 
         "Id":"6o"
    },
    
    {
        "mes":"Octubre",
        "turno":"vespertino",
        "fecha":"20/10",
        "equipos":"U2 vs U4",
        "locacion":"Marjorie P Hart",
        "horario":"1:00 pm", 
        "Id":"7o"
    },
    
    {
        "mes":"Octubre",
        "turno":"matutino",
        "fecha":"27/10",
        "equipos":"U3 vs U1",
        "locacion":"AJ Katzenmaier",
        "horario":"9:30 am",
        "Id":"8o"
    },
    
    {
         "mes":"Octubre",
        "turno":"vespertino",
        "fecha":"27/10",
        "equipos":"U5 vs U6",
        "locacion":"Howard A Yeager",
        "horario":"1:00 pm",
        "Id":"9o"
        
    }

];

function changePage(props){
    let id = props.id.split("_")[1];
    let actualPage = document.getElementsByClassName("show_page")[0].id;
    document.getElementById(actualPage).classList.remove("show_page");
    document.getElementById(actualPage).classList.add("hidden_page");
    document.getElementById(id).classList.remove("hidden_page");
    document.getElementById(id).classList.add("show_page");
}


$('#login').click(function(){
    firebase.auth()
    .signInWithPopup(provider)
    .then(function(result){
        console.log(result.user);
        guardaDatos(result.user)
        $('#login').hide();
        $('#home').append("<img src='"+result.user.photoURL+"'/>");    
    });
});


  function guardaDatos(user){
      var usuario={
          uid:user.uid,
          nombre:user.displayName,
          email:user.email,
          foto:user.photoURL   
      }
      
      firebase.database().ref("SilvanaMobile/" + user.uid).
      set(usuario)
  }

    firebase.database().ref("SilvanaMobile").
     on("child_added", function(s){
        var user= s.val();
        $('#home').append ("<imag src='"+user.foto +"' />"); 
    })
    
    
function uploadChat(props){
    let newKey = app.database().ref(`forum/${props.matchId}/`).push().key;
    let update = {};
    update[`forum/${props.matchId}/${newKey}`] = {
      //uid, email, userName, photoURL
        post : props.commentary,
        matchId : props.matchId
    };
    app.database().ref().update(update);
}


var partido = listaPartidos;

        console.log(partido)
        function cargar_fixture() {

            let meses = [];

            let select = document.getElementById("mes");

            for (let i = 0; i < partido.length; i++) {
                if (!meses.includes(partido[i].mes)) {
                    meses.push(partido[i].mes)
                }
            }
            console.log(partidos);

            console.log(meses);

            select.innerHTML =
                `<option value ="todos">todos</option> ${meses.map (mes =>`<option value= "${mes}"> ${mes}</option>`).join("")} `

        }

        function tabla_general() {

            let futbol = document.getElementById("mes").value;


            document.getElementById("partidosAcordion").innerHTML = ""

            for (var i = 0; i < partido.length; i++) {
                
                chatpartidos(partido[i].Id);

                let html = '';
                                

                    if (futbol == "todos") {

                        html = `
                        <div class='card' id='card-${partido[i].Id}'>
                            <div class="card-body">
                                <h5 class="card-title">
                                  ${partido[i].equipos}
                                </h5>
                                <ul>
                                <li>${partido[i].fecha}</li>   
                                <li>${partido[i].horario}</li>
                                <li>${partido[i].locacion}</li>
                                </ul>
                                <p id="chat">Chat<input type="text"></p>
                                <button name="button" onclick="getPartido(this)" id="button-${partido[i].Id}">enviar</button>
                                <div id="commentaries-${partido[i].Id}"></div>
                            </div>
                          </div>
                        `;
                                                
                        document.getElementById("partidosAcordion").innerHTML += html;
                     
                        //Aca comparamos el valor
                    } else if (futbol == partido[i].mes) {

                        
                        html = `
                        <div class='card' id='card-${partido[i].Id}'>
                            <div class="card-body">
                                <h5 class="card-title">
                                  ${partido[i].equipos}
                                </h5>
                                <ul>
                                <li>${partido[i].fecha}</li>   
                                <li>${partido[i].horario}</li>
                                <li>${partido[i].locacion}</li>
                                </ul>
                                <p id="chat">Chat<input type="text"></p>
                                <button name="button" onclick="getPartido(this)" id="button-${partido[i].Id}">enviar</button>
                                <div id="commentaries-${partido[i].Id}"></div>
                        </div>
                          </div>
                        `;
                                              
                        document.getElementById("partidosAcordion").innerHTML += html;
                        
                        console.log("None");

                    }
            }

        }

tabla_general()

cargar_fixture()

var database = firebase.database();

 function chatpartidos(payload){
     let startCountRef = database.ref(`/forum/${payload}`);
     startCountRef.on('value', function (snapshot) {
        let result = snapshot.val();
         if(result!=null){
            let ourObject = Object.keys(result).map(function(key) {
              return [Number(key), result[key]];
            });
              ourObject.forEach(element => {
                let idMatch = 'commentaries-'+element[1].matchId;
                document.getElementById(idMatch).innerHTML = '';
             })
             ourObject.forEach(element => {
                 let idMatch = 'commentaries-'+element[1].matchId;
                 console.log(idMatch);
                 let commentariesTab = document.getElementById(idMatch);
                 let breakLine = document.createElement("br");
                 let span = document.createElement("span");
                 span.innerHTML = element[1].post;
                 commentariesTab.appendChild(span);
                 commentariesTab.appendChild(breakLine);
             })
         }else{
             console.log("Vacio");
         }
     })
 
 }
 function datoschat(payload){
     console.log(payload);
     let newKey = database.ref(`forum/${payload.matchId}/`).push().key
        let update = {}
        update[`forum/${payload.matchId}/${newKey}`] = {
          //uid: state.user.uid,
          //userName: state.user.displayName,
          //email: state.user.email,
          post: payload.commentary,
          matchId: payload.matchId,
        }
        //console.log(JSON.stringify(update));
        database.ref().update(update)
}

function getPartido(data){
    let id = data.id.split("-")[1];
    let inputValue = document.getElementById(`card-${id}`).childNodes[1].childNodes[5].childNodes[1].value;
    if(inputValue!=''){
        let payload = {
            matchId : id,
            commentary : inputValue
        }
        datoschat(payload);
        chatpartidos(id);
    }else{
        console.log("Ingrese un comentario");
    }
}

