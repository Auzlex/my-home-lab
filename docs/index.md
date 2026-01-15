<link rel="icon" href="resources/favicon.ico">

# Home Lab CI/CD

This project documents a multi-node CI/CD lab using:

- Gitea
- Docker
- Raspberry Pi
- ARM + x86 separation

The goal is to mirror real-world CI infrastructure on low-cost hardware.

## Architecture Diagram

<div class="image-container">
  <img id="architecture-image" src="resources/myhomelab.png" alt="Home Lab Architecture" style="max-width: 100%; cursor: pointer;">
</div>

<div id="image-modal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="modal-image">
</div>

<style>
.image-container {
  text-align: center;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  cursor: grab;
  transform-origin: 0 0;
}

.modal-content:active {
  cursor: grabbing;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}
</style>

<script>
var modal = document.getElementById('image-modal');
var img = document.getElementById('architecture-image');
var modalImg = document.getElementById('modal-image');
var span = document.getElementsByClassName('close')[0];

var scale = 1;
var panning = false;
var pointX = 0;
var pointY = 0;
var start = { x: 0, y: 0 };

img.onclick = function(){
  modal.style.display = 'block';
  modalImg.src = this.src;
  resetZoom();
}

span.onclick = function() {
  modal.style.display = 'none';
  resetZoom();
}

modal.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    resetZoom();
  }
}

function resetZoom() {
  scale = 1;
  pointX = 0;
  pointY = 0;
  modalImg.style.transform = 'translate(0px, 0px) scale(1)';
}

modalImg.onwheel = function(event) {
  event.preventDefault();
  var xs = (event.clientX - pointX) / scale;
  var ys = (event.clientY - pointY) / scale;
  var delta = (event.wheelDelta ? event.wheelDelta : -event.deltaY);
  (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
  pointX = event.clientX - xs * scale;
  pointY = event.clientY - ys * scale;
  modalImg.style.transform = 'translate(' + pointX + 'px, ' + pointY + 'px) scale(' + scale + ')';
}

modalImg.onmousedown = function(event) {
  event.preventDefault();
  panning = true;
  start = { x: event.clientX - pointX, y: event.clientY - pointY };
}

modalImg.onmouseup = function() {
  panning = false;
}

modalImg.onmousemove = function(event) {
  event.preventDefault();
  if (!panning) return;
  pointX = (event.clientX - start.x);
  pointY = (event.clientY - start.y);
  modalImg.style.transform = 'translate(' + pointX + 'px, ' + pointY + 'px) scale(' + scale + ')';
}
</script>

In the image above you can see a diagram or layout of the software and systems I have mapped out to the best of my ability to show how each device and service is communicating with each other.

## Documentation Pages

- [CASPER - Central Gitea Server](casper.md)
- [LORIC - Orchestration Node](loric.md)
- [AUREL - Execution Node](aurel.md)
