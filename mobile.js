let highestZ = 1;

class Paper {
  holdingPaper = false;

  prevX = 0;
  prevY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  rotation = Math.random() * 30 - 15;

  init(paper) {

    // Start dragging
    paper.addEventListener("pointerdown", (e) => {
      e.preventDefault();

      this.holdingPaper = true;

      // Bring paper to front
      paper.style.zIndex = highestZ;
      highestZ++;

      // Remember starting position
      this.prevX = e.clientX;
      this.prevY = e.clientY;

      // Keep receiving pointer events even if pointer
      // moves outside the paper
      paper.setPointerCapture(e.pointerId);
    });


    // Dragging
    paper.addEventListener("pointermove", (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault();

      const moveX = e.clientX - this.prevX;
      const moveY = e.clientY - this.prevY;

      this.currentPaperX += moveX;
      this.currentPaperY += moveY;

      this.prevX = e.clientX;
      this.prevY = e.clientY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });


    // Stop dragging
    paper.addEventListener("pointerup", (e) => {
      this.holdingPaper = false;

      if (paper.hasPointerCapture(e.pointerId)) {
        paper.releasePointerCapture(e.pointerId);
      }
    });


    // If the browser cancels the pointer
    paper.addEventListener("pointercancel", () => {
      this.holdingPaper = false;
    });
  }
}


const papers = document.querySelectorAll(".paper");

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
