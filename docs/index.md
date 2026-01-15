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

img.onclick = function(){
  modal.style.display = 'block';
  modalImg.src = this.src;
}

span.onclick = function() {
  modal.style.display = 'none';
}

modal.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
</script>

In the image above you can see a diagram or layout of the software and systems I have mapped out to the best of my ability to show how each device and service is communicating with each other.

## Documentation Pages

- [CASPER - Central Gitea Server](casper.md)
- [LORIC - Orchestration Node](loric.md)
- [AUREL - Execution Node](aurel.md)
