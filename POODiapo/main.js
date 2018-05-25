var sound =document.createElement("audio");
sound.src = "quack.mp3";
//Création de la classe Diaporama
function Diaporama(jsonpath, idElementImg, timer){
    this.jsonpath=jsonpath;
    this.idElementImg=idElementImg;
    this.timer=timer;
    var that=this;
    this.createDiapers = function(){
        var request = new XMLHttpRequest();
        request.open('GET', this.jsonpath);
        request.responseType = 'text';
        request.send();
        request.onload = function() {
            var jsondata2 = request.response;
            //console.log("jsondata2: \n"+jsondata2);
            var json = JSON.parse(jsondata2);
            //console.log("json: \n"+json);
            var idxphoto=0;
            var intervalID = window.setInterval(forward, that.timer);
            function forward(){
                if (idxphoto < Number(json.images.length)-1) {
                    idxphoto++;
                }else{
                    idxphoto=0;
                }
                displayImg();
            }
            function displayImg(){
                $("#"+that.idElementImg).attr("src",json.images[idxphoto].imgsrc);
                console.log("la c'est le display : "+that.idElementImg);
            }
        }
    }
};

var diapo1 = new Diaporama("https://groutch.github.io/Diaporama/photosGoodGuys.JSON","img1",1500);
var diapo2 = new Diaporama("https://groutch.github.io/Diaporama/photosBadGuys.JSON","img2",2000);
var diapo3 = new Diaporama("https://groutch.github.io/Diaporama/photosZord.JSON","img3",2500);

diapo1.createDiapers();
diapo2.createDiapers();
diapo3.createDiapers();




