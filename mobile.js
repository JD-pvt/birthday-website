let highestZ = 1;

class Paper {
  holdingPaper = false;

  pointerX = 0;
  pointerY = 0;

  prevPointerX = 0;
  prevPointerY = 0;

  velX = 0;
  velY = 0;

  rotation = Math.random() * 30 - 15;

  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {

    // -------------------------
    // POINTER DOWN
    // -------------------------
    paper.addEventListener("pointerdown", (e) => {

      if (this.holdingPaper) return;

      this.holdingPaper = true;

      // Bring paper to the front
      paper.style.zIndex = highestZ;
      highestZ++;

      // Store starting pointer position
      this.pointerX = e.clientX;
      this.pointerY = e.clientY;

      this.prevPointerX = e.clientX;
      this.prevPointerY = e.clientY;

      // Prevent scrolling / other browser gestures
      paper.setPointerCapture(e.pointerId);
    });


    // -------------------------
    // POINTER MOVE
    // -------------------------
    paper.addEventListener("pointermove", (e) => {

      if (!this.holdingPaper) return;

      // Calculate movement
      this.pointerX = e.clientX;
      this.pointerY = e.clientY;

      this.velX = this.pointerX - this.prevPointerX;
      this.velY = this.pointerY - this.prevPointerY;

      // Move paper
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      // Remember current position
      this.prevPointerX = this.pointerX;
      this.prevPointerY = this.pointerY;

      // Apply movement
      paper.style.transform =
        `translateX(${this.currentPaperX}px)
         translateY(${this.currentPaperY}px)
         rotateZ(${this.rotation}deg)`;
    });


    // -------------------------
    // POINTER UP
    // -------------------------
    paper.addEventListener("pointerup", (e) => {

      this.holdingPaper = false;

      if (paper.hasPointerCapture(e.pointerId)) {
        paper.releasePointerCapture(e.pointerId);
      }
    });


    // -------------------------
    // POINTER CANCEL
    // -------------------------
    paper.addEventListener("pointercancel", () => {
      this.holdingPaper = false;
    });
  }
}


// -------------------------
// INITIALIZE ALL PAPERS
// -------------------------

const papers = Array.from(
  document.querySelectorAll(".paper")
);

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
