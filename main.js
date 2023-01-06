img ="";
status = "";
objects = [];

function preload()
{

}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start_cam()
{
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function draw()
{
    image(video, 0, 0, 380, 380);

    if (status!="")
    {
        object_detector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Object detected";
            document.getElementById("number_objects").innerHTML = "Number of objects detected are " + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " +percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i]. width, objects[i].height);
        }
    }
    
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;

}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}

