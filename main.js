var sound =document.createElement("audio");
sound.src = "quack.mp3";
//le bout de code barbare pour récup le contenu du fichier JSON
var requestURL = "https://groutch.github.io/Diaporama/photosGoodGuys.JSON";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'text';
request.send();
request.onload = function() {
    var jsondata2 = request.response;
    console.log("jsondata2: \n"+jsondata2);
    var json = JSON.parse(jsondata2);
    console.log("json: \n"+json);
        var idxphoto=0;
    displayImg();
    //changement des images par les fleches du clavier
    $(document).on("keydown", function(event){
        console.log(event.key);
        if (event.key == "ArrowRight")
        {
            forward();
        }
        if (event.key == "ArrowLeft")
        {
            backward();
        }
        if (event.key == "ArrowDown"){
            sound.play();
        }
    });
    //changement des images par les boutons sous les images
    $(".btnext").on("click",forward);
    $(".btprev").on("click",backward);
    //changement des images avec le temps
    var intervalID = window.setInterval(forward, 1500);

    //les differentes fonctions utilisées(avant arriere et affichage)
    function forward(){
        if (idxphoto < Number(json.images.length)-1) {
                idxphoto++;
            }else{
                idxphoto=0;
            }
            displayImg();
    }
    function backward(){
        if(idxphoto>0){
                idxphoto--;
            }else{
                idxphoto = Number(json.images.length)-1;
            }
            displayImg();
    }
    function displayImg(){
        $(".img-fluid").attr("src",json.images[idxphoto].imgsrc);
        $("#description").html(json.images[idxphoto].secretIdentity);
        $("#title").html(json.images[idxphoto].name);
    }
};


