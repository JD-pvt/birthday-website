let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseStartX = 0;
  mouseStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // -------------------
    // TOUCH EVENTS (MOBILE)
    // -------------------
    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseStartX = e.touches[0].clientX;
      this.mouseStartY = e.touches[0].clientY;
      this.prevTouchX = this.mouseStartX;
      this.prevTouchY = this.mouseStartY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;

      if (!this.rotating) {
        this.velX = touchX - this.prevTouchX;
        this.velY = touchY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      this.prevTouchX = touchX;
      this.prevTouchY = touchY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // -------------------
    // MOUSE EVENTS (DESKTOP)
    // -------------------
    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        this.prevTouchX = e.clientX;
        this.prevTouchY = e.clientY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.holdingPaper) return;

      if (!this.rotating) {
        this.velX = e.clientX - this.prevTouchX;
        this.velY = e.clientY - this.prevTouchY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      this.prevTouchX = e.clientX;
      this.prevTouchY = e.clientY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
