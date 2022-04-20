img = "";
status = "";
object = [];
song = " ";

function preload(){
song = loadSound("ringing_old_phone.mp3");
}

function setup(){
canvas = createCanvas(380 , 380);
canvas.center();
video = createCapture(VIDEO);
video.size(380 , 380);
video.hide();
objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error , results) {
    if (error) {
        console.log("Error!");
    } else {
        console.log(results);
        object = results;
    }
}

function draw(){
image(video , 0 , 0 , 380 , 380);

if (status != "") {
r = random(255);
g = random(255);
b = random(255);


    objectDetector.detect(video , gotResult);
    for (i = 0; i < object.length; i++) {
        fill(r , g , b)
        percent = floor(object[i].confidence*100);
        text(object[i].label + " " + percent + "%" , object[i].x-10, object[i].y-10);
        noFill();
        stroke(r , g , b);
        rect(object[i].x , object[i].y , object[i].width , object[i].height);
        document.getElementById("status").innerHTML = "Status = Object detected";
if (object[i].label=="person") {
    document.getElementById("baby_found").innerHTML = "Baby found";
    song.stop();
} else {
    document.getElementById("baby_found").innerHTML = "Baby not found";
    song.play(); 
}
if (object[i].length = 0) {
    document.getElementById("baby_found").innerHTML = "Baby not found";
    song.play();
}
        }
}
}