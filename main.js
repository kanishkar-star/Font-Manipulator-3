noseX = 0;
noseY = 0;

leftWrist = 0;
rightWrist = 0;
difference = 0;

var bg;
function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 490);
    canvas.position(700, 200);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotpose);

    bg = color(0, 0, 0);
    // change background every 3 seconds
    // 9
    setInterval(randomBackground, 1000);
}

function modelLoaded(){
    console.log("Posenet Is Initialised");
}

function gotpose(results){
    if(results.length > 0){
        console.log(results);
        
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;

        leftWrist = results[0].pose.leftWrist.x;
        rightWrist = results[0].pose.rightWrist.x;
        difference = leftWrist - rightWrist;
    }
}

function draw(){
    background('#cccccc');
    document.getElementById("font-size-display").innerHTML = "Text size = " + floor(difference) + "pixels and " + "text color = " + bg;
    document.getElementById("font-size-display").style.color = bg;
    fill(bg);
    textSize(difference);
    text('Kani', noseX, noseY);
}

function randomBackground() {
    bg = color(random(255), random(255), random(255));
  }