(() => {
  if (window.videoSpeedInit) {
    return;
  }

  window.videoSpeedInit = true;

  const element = document.createElement("div");

  Object.assign(element.style, {
    backgroundColor: "#CCC",
    color: "#000",
    position: "fixed",
    top: "0px",
    right: "0px",
    padding: "8px 12px",
    borderBottomLeftRadius: "5px",
    fontFamily: "Helvetica",
    fontSize: "16px",
    fontWeight: "normal"
  });

  let timer;

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

      show(newSpeed);
      document.querySelector("video").playbackRate = newSpeed;
    }

    dotActive = false;
  });

  function show(speed) {
    if (timer) {
      clearTimeout(timer);
    }
    element.innerText = `${speed}x`;
    document.body.appendChild(element);

    timer = setTimeout(() => {
      document.body.removeChild(element);
    }, 2000);
  }
})();
