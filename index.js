(() => {
  if (window.videoSpeedBookmarkFlash) {
    window.videoSpeedBookmarkFlash("video-speed-bookmark already added");
    return;
  }

  window.videoSpeedBookmarkFlash = flash;

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
  let enteredSpeed = "";

  const modifiers = {
    Control: false,
    Alt: false
  };

  document.addEventListener("keydown", event => {
    const key = event.key;

    if (modifiers[key] !== undefined) {
      modifiers[key] = true;
      if (Object.values(modifiers).every(v => v)) {
        enteredSpeed = '';
        show('Enter speed');
      }
      return;
    }

    if (Object.values(modifiers).every(v => v)) {
      enteredSpeed += key;
      show(`${enteredSpeed}x`);
    }
  });

  document.addEventListener("keyup", event => {
    const key = event.key;
    
    if (modifiers[key] === undefined) {
      return;
    }

    if (!Object.values(modifiers).every(v => v)) {
      modifiers[key] = false;
      return;
    }

    modifiers[key] = false;

    if (!enteredSpeed) {
      hide();
      return;
    }

    const speed = parseFloat(enteredSpeed);
    enteredSpeed = "";

    if (isNaN(speed)) {
      flash("Invalid speed");
      return;
    }

    const video = document.querySelector("video");
    if (!video) {
      flash("No video found");
      return;
    }

    flash(`${speed}x`);
    video.playbackRate = speed;
  });

  function show(text) {
    if (timer) {
      clearTimeout(timer);
    }
    element.innerText = text;
    document.body.appendChild(element);
  }

  function hide() {
    element.remove();
  }

  function flash(text) {
    show(text);
    timer = setTimeout(hide, 2000);
  }

  flash("video-speed-bookmark added");
})();
