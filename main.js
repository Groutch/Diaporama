    var sound =document.createElement("audio");
    sound.src = "quack.mp3";
    var jsondata= `
    {
        "images": [
        {
            "name": "Green Ranger",
            "imgsrc": "./images/greenranger.jpg",
            "secretIdentity": "Tommy Oliver"
        },
        {
            "name": "Yellow Ranger",
            "imgsrc": "./images/yellowranger.jpg",
            "secretIdentity": "Trini Kwan"
        },
        {
            "name": "Pink Ranger",
            "imgsrc": "./images/pinkranger.jpg",
            "secretIdentity": "Kimberly Hart"
        },
        {
            "name": "Red Ranger",
            "imgsrc": "./images/redranger.png",
            "secretIdentity": "Jason Lee Scott"
        },
        {
            "name": "Black Ranger",
            "imgsrc": "./images/blackranger.png",
            "secretIdentity": "Zackary Taylor"
        },
        {
            "name": "Blue Ranger",
            "imgsrc": "./images/blueranger.jpg",
            "secretIdentity": "William Cranston"
        }
    ]
}`;

var requestURL = "https://groutch.github.io/Diaporama/photos.JSON";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var machintruc = request.response;
  console.log(machintruc);
}

var json=JSON.parse(jsondata)

$(document).ready(function () {
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
});


