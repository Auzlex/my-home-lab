<script>
(function() {
  var modal = document.getElementById('image-modal');
  var img = document.getElementById('architecture-image');
  var modalImg = document.getElementById('modal-image');
  var span = document.getElementsByClassName('close')[0];

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

  // Panning (drag)
  modalImg.onmousedown = function(event) {
    event.preventDefault();
    panning = true;
    start = { x: event.clientX - pointX, y: event.clientY - pointY };
  };

  window.addEventListener('mouseup', function() {
    panning = false;
  });

  modalImg.onmousemove = function(event) {
    if (!panning) return;
    event.preventDefault();
    pointX = (event.clientX - start.x);
    pointY = (event.clientY - start.y);
    setTransform();
  };

  // Touch support: single-finger pan, two-finger pinch (basic)
  var touchState = { lastDist: null, lastCenter: null };

  function distance(a, b) {
    var dx = a.clientX - b.clientX;
    var dy = a.clientY - b.clientY;
    return Math.sqrt(dx*dx + dy*dy);
  }

  function centerPoint(a, b) {
    return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
  }

  modalImg.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      // pan start
      var t = e.touches[0];
      panning = true;
      start = { x: t.clientX - pointX, y: t.clientY - pointY };
    } else if (e.touches.length === 2) {
      // pinch start
      touchState.lastDist = distance(e.touches[0], e.touches[1]);
      touchState.lastCenter = centerPoint(e.touches[0], e.touches[1]);
    }
  }, { passive: false });

  modalImg.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (e.touches.length === 1 && panning) {
      var t = e.touches[0];
      pointX = (t.clientX - start.x);
      pointY = (t.clientY - start.y);
      setTransform();
    } else if (e.touches.length === 2) {
      var dist = distance(e.touches[0], e.touches[1]);
      var center = centerPoint(e.touches[0], e.touches[1]);
      if (touchState.lastDist) {
        var factor = dist / touchState.lastDist;
        var newScale = Math.max(0.5, Math.min(5, scale * factor));
        scale = newScale;
        // keep current translation; transform-origin center will handle the rest
        setTransform();
      }
      touchState.lastDist = dist;
      touchState.lastCenter = center;
    }
  }, { passive: false });

  modalImg.addEventListener('touchend', function(e) {
    if (e.touches.length === 0) {
      panning = false;
      touchState.lastDist = null;
    }
  });

})();
</script>