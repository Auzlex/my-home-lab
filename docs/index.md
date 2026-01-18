# My Home Lab Documentation

This project documents a my multi-node CI/CD or general home lab using:

- Gitea
- Docker
- Raspberry Pi
- Pi Hole
- ARM + x86 computers

The goal is to understand and develop skills for real-world CI/CD infrastructure upon re-used electronic waste or old hardware around me. And Improve my documentation skills for projects that expand in scope beyond what my memory can retain.

## Architecture Diagram

<div class="image-container">
  <img id="architecture-image" src="resources/myhomelab.png" alt="Home Lab Architecture" style="max-width: 100%; cursor: pointer;">
</div>

<div id="image-modal" class="modal">
  <span class="close">&times;</span>
  <img class="modal-content" id="modal-image">
</div>

<style>
.image-container { text-align: center; }

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0; top: 0;
  width: 100%; height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.9);
}

.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  cursor: grab;
  transform-origin: center center; /* <-- zoom around image center */
  transition: transform 0.02s linear; /* smooth-ish during scale updates */
}

.modal-content:active { cursor: grabbing; }

.close {
  position: absolute;
  top: 15px; right: 35px;
  color: #f1f1f1; font-size: 40px; font-weight: bold;
  transition: 0.3s; cursor: pointer;
}
.close:hover, .close:focus { color: #bbb; }
</style>

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

In the diagram above, you can see a simple architecture/setup of various computer devices that I setup on my network. In this example you can see the devices **ENLIL**, **CASPER**, **LORIC**, **AUREL** and **LABRYS**.

This is my MK-1 "home-lab" a simple manual orchestration setup. to understand the fundamentals in what goes into these automated systems.

I have a runner node with an optional worker node which can be sent tasks via shell in ssh. Currently LORIC handles all jobs dispatched by casper via gitea workflows and will offload its building and docker related activities to AUREL. All gitea workflow jobs are handled by 2 seperate computers.

My next goals is to expand the workers and determine where certain offloaded tasks should be determined and handled. I will also look into the use of kubernetes with slightly more powerful devices.

## Notes

- The setup above will need to have their static ips migrated to a much lower ipv4 range, this is so I can tell the router to avoid assigning any future devices on the network to be accidentally assigned to one of these critical ips. There are many ways to go about this so for the moment it will be on my **TODO**.

## Documentation Pages

- [CASPER - Gitea Server & Network Attached Storage](casper.md)
- [LORIC - Orchestrator Node](loric.md)
- [AUREL - Worker Node](aurel.md)
- [ENLIL - Local DNS Resolver](enlil.md)
- [Maintenance Log](maintenance-log.md)
