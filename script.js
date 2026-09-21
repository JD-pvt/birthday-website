let highestZ = 20;


/* =========================================
   PAPER CLASS
   ========================================= */

class Paper {

  constructor(paper, startingRotation) {

    this.paper = paper;

    this.holding = false;

    this.startX = 0;
    this.startY = 0;

    this.currentX = 0;
    this.currentY = 0;

    this.startPaperX = 0;
    this.startPaperY = 0;

    this.rotation = startingRotation;


    /*
       Set initial position
    */

    this.paper.style.setProperty(
      "--x",
      "0px"
    );

    this.paper.style.setProperty(
      "--y",
      "0px"
    );


    /*
       Set initial rotation
    */

    this.paper.style.setProperty(
      "--rotation",
      `${this.rotation}deg`
    );


    this.init();
  }


  /* =======================================
     INITIALIZE
     ======================================= */

  init() {

    /*
       Works with:

       PC mouse
       Phone touch
       Tablet touch
    */

    this.paper.addEventListener(
      "pointerdown",
      (e) => this.startDrag(e)
    );


    window.addEventListener(
      "pointermove",
      (e) => this.drag(e)
    );


    window.addEventListener(
      "pointerup",
      () => this.stopDrag()
    );


    window.addEventListener(
      "pointercancel",
      () => this.stopDrag()
    );


    /*
       Prevent right-click menu
    */

    this.paper.addEventListener(
      "contextmenu",
      (e) => e.preventDefault()
    );
  }


  /* =======================================
     START DRAGGING
     ======================================= */

  startDrag(e) {

    e.preventDefault();

    this.holding = true;


    /*
       Bring paper to front
    */

    this.paper.style.zIndex = highestZ;

    highestZ++;


    /*
       Remember where pointer started
    */

    this.startX = e.clientX;

    this.startY = e.clientY;


    /*
       Remember current paper position
    */

    this.startPaperX = this.currentX;

    this.startPaperY = this.currentY;


    /*
       Capture pointer

       This makes dragging work properly
       even if the pointer moves outside
       the paper.
    */

    if (this.paper.setPointerCapture) {

      try {

        this.paper.setPointerCapture(
          e.pointerId
        );

      } catch (error) {

        // Ignore pointer capture errors

      }
    }
  }


  /* =======================================
     DRAGGING
     ======================================= */

  drag(e) {

    if (!this.holding) {
      return;
    }


    /*
       Calculate movement
    */

    const movementX =
      e.clientX - this.startX;

    const movementY =
      e.clientY - this.startY;


    /*
       New position
    */

    this.currentX =
      this.startPaperX + movementX;

    this.currentY =
      this.startPaperY + movementY;


    /*
       Apply position
    */

    this.paper.style.setProperty(
      "--x",
      `${this.currentX}px`
    );

    this.paper.style.setProperty(
      "--y",
      `${this.currentY}px`
    );
  }


  /* =======================================
     STOP DRAGGING
     ======================================= */

  stopDrag() {

    if (!this.holding) {
      return;
    }

    this.holding = false;
  }
}


/* =========================================
   CREATE PAPERS
   ========================================= */

const papers =
  Array.from(
    document.querySelectorAll(".paper")
  );


/*
   Rotation values.

   Each paper starts slightly rotated,
   but ALL remain stacked.
*/

const rotations = [

  -8,  // heart
  -7,  // paper9
   6,  // paper8
  -4,  // paper10
   2,  // paper0
  -6,  // paper1
   5,  // paper2
  -3,  // paper3
   7,  // paper4
  -5,  // paper5
   4,  // paper6
  -2   // paper7
];


/* =========================================
   INITIAL Z-INDEX
   ========================================= */

/*
   HTML order:

   heart
   paper9
   paper8
   paper10
   paper0
   paper1
   paper2
   paper3
   paper4
   paper5
   paper6
   paper7

   Therefore paper7 becomes the top paper.
*/

papers.forEach((paper, index) => {

  paper.style.zIndex = index + 1;


  new Paper(
    paper,
    rotations[index] || 0
  );

});
