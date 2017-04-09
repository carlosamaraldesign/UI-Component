var myVideo = document.getElementById("video");

function controlToggle() {
    if (myVideo.paused) {
        myVideo.play();
        document.querySelector(".container").classList.add("hidecontainer");
    } else {
        myVideo.pause();
        document.querySelector(".container").classList.remove("hidecontainer");
      }
}

function controlActive() {
 document.getElementById("controlVideo").classList.toggle("pauseActive");

}

function playVideo() {
  if (myVideo.paused) {
      myVideo.play();
      document.querySelector(".container").classList.add("hidecontainer");
      document.getElementById("controlVideo").classList.toggle("pauseActive");
  } else {
      myVideo.pause();
      document.querySelector(".container").classList.remove("hidecontainer");
    }
}

function playerSeekTo(seconds) {
  myVideo.currentTime = seconds;
}

function calculateVideoFrame(lastangle) {
  var percentage = (lastangle/360) * 100;;
  var seconds = (percentage / 100) * myVideo.duration;
  playerSeekTo(seconds);
  playVideo();
  controlActive();
  intervalrunning = true;
}

function rotation(wrapper, xcor, ycor, knob) {
  var x = xcor - wrapper.offset().left - wrapper.width()/2;
  var y = -1*(ycor - wrapper.offset().top - wrapper.height()/2);

  var theta = Math.atan2(y,x)*(180/Math.PI);
  var deg = 180 - theta;

  var css = 'rotate(' + deg + 'deg)';
  knob.css({
    'transform' : css,
    '-webkit-transform': css
  });
  $('body').on('mouseup', function(event) {
    calculateVideoFrame(deg);
    $('body').unbind('mousemove');
    $('body').unbind('mouseup');
  });
}

document.querySelector('#knob').addEventListener('mousedown', function() {
    myVideo.pause();
    intervalrunning = false;
    $('body').on("mousemove", function(event) {
        rotation($('.container'), event.pageX,event.pageY, $('.knob'));
    })
})


document.getElementById("muteVideo"). addEventListener("click", function (){
    $('video').prop('muted', !$('video').prop('muted'));
  })


document.getElementById('muteVideo').onclick = function() {
        this.classList.toggle('muteActive');
    }
