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

  let xDown = false;
  let enteredSpeed = "";

  document.addEventListener("keydown", event => {
    if (event.key === "x") {
      xDown = true;
      return;
    }

    if (xDown) {
      enteredSpeed += event.key;
      show(`${enteredSpeed}x`);
    }
  });

  document.addEventListener("keyup", event => {
    if (event.key !== "x") {
      return;
    }

    xDown = false;

    if (!enteredSpeed) {
      return;
    }

    const speed = parseFloat(enteredSpeed);
    enteredSpeed = "";

    if (isNaN(speed)) {
      show("Invalid speed");
      return;
    }

    const video = document.querySelector("video");
    if (!video) {
      show("No video found");
      return;
    }

    show(`${speed}x`);
    video.playbackRate = speed;
  });

  function show(text) {
    if (timer) {
      clearTimeout(timer);
    }
    element.innerText = text;
    document.body.appendChild(element);

    timer = setTimeout(() => {
      document.body.removeChild(element);
    }, 2000);
  }
})();
