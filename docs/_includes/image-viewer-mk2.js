<script>
(function() {
  var modal = document.getElementById('image-modal-mk2');
  var img = document.getElementById('architecture-image-mk2');
  var modalImg = document.getElementById('modal-image-mk2');
  var span = modal.getElementsByClassName('close')[0];

  var scale = 1;
  var panning = false;
  var pointX = 0;
  var pointY = 0;
  var start = { x: 0, y: 0 };

  function setTransform() {
    modalImg.style.transform = 'translate(' + pointX + 'px, ' + pointY + 'px) scale(' + scale + ')';
  }

  function resetZoom() {
    scale = 1;
    pointX = 0;
    pointY = 0;
    setTransform();
  }

  img.onclick = function(){
    modal.style.display = 'block';
    modalImg.src = this.src;
    resetZoom();
  };

  span.onclick = function() {
    modal.style.display = 'none';
    resetZoom();
  };

  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      resetZoom();
    }
  };

  // Wheel: zoom relative to image center (no pointer-based offset)
  modalImg.onwheel = function(event) {
    event.preventDefault();
    var delta = -event.deltaY; // positive when scrolling up
    var factor = delta > 0 ? 1.2 : 1 / 1.2;
    var newScale = Math.max(0.5, Math.min(5, scale * factor));
    scale = newScale;
    // transform-origin is center, so no need to compute complex offsets
    setTransform();
  };

  // Panning: mouse drag
  modalImg.onmousedown = function(event) {
    event.preventDefault();
    start = { x: event.clientX - pointX, y: event.clientY - pointY };
    panning = true;
  };

  document.onmousemove = function(event) {
    if (!panning) return;
    pointX = event.clientX - start.x;
    pointY = event.clientY - start.y;
    setTransform();
  };

  document.onmouseup = function() { panning = false; };
})();
</script>
