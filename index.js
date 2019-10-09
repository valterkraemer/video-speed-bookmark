(() => {
  if (window.videoSpeedInit) {
    return;
  }

  window.videoSpeedInit = true;

  let speed = 0;
  let dotActive = false;

  document.addEventListener("keydown", event => {
    if (event.key === ".") {
      dotActive = true;
      return;
    }

    let digit = parseInt(event.key);
    if (digit || digit === 0) {
      let newSpeed = digit;
      if (dotActive) {
        newSpeed = speed + 0.1 * newSpeed;
        speed = 0;
      } else {
        speed = newSpeed;
      }

      document.querySelector("video").playbackRate = newSpeed;
    }

    dotActive = false;
  });
})();
