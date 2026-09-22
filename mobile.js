let highestZ = 1;

class Paper {
  holdingPaper = false;

  touchStartX = 0;
  touchStartY = 0;

  prevTouchX = 0;
  prevTouchY = 0;

  currentPaperX = 0;
  currentPaperY = 0;

  rotation = Math.random() * 30 - 15;

  init(paper) {

    paper.addEventListener("touchstart", (e) => {
      if (this.holdingPaper) return;

      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ++;

      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;

      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    }, { passive: false });


    paper.addEventListener("touchmove", (e) => {
      if (!this.holdingPaper) return;

      e.preventDefault();

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      const moveX = touchX - this.prevTouchX;
      const moveY = touchY - this.prevTouchY;

      this.currentPaperX += moveX;
      this.currentPaperY += moveY;

      this.prevTouchX = touchX;
      this.prevTouchY = touchY;

      paper.style.transform =
        `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });


    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });

    paper.addEventListener("touchcancel", () => {
      this.holdingPaper = false;
    });
  }
}


const papers = document.querySelectorAll(".paper");

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
