$(document).ready(() => {
  let countQ = 0;
  let countW = 0;
  let countE = 0;
  let countR = 0;
  let keyPressed = null;

  const channelName = $("#channel-name");
  const videoName = $("#video-name");
  const videoDescription = $("#video-description");
  const infoModal = new bootstrap.Modal(document.getElementById("info-modal"));
  const finishTransmision = new bootstrap.Modal(document.getElementById("finish-modal"));

  // Mostrar modal al cargar la ventana
  infoModal.show();

  // Recuperar estado inicial
  setState();

  // Evento de teclado
  window.onkeydown = (event) => (keyPressed = event.key);

  // Evento de scroll optimizado para manejar likes, dislikes, suscriptores y vistas
  window.onwheel = (event) => {
    const direction = Math.sign(event.deltaY) < 0;
    const counters = { countQ, countW, countE, countR };

    // Control de suscriptores (Q) y vistas (R)
    if (keyPressed === 'q') {
      counters.countQ = updateCounter(counters.countQ, direction, 6);
    } else if (keyPressed === 'r') {
      counters.countR = updateCounter(counters.countR, direction, 132);
    }

    // Control de likes y dislikes (W y E)
    handleDislikesAndLikes(counters, keyPressed, direction);

    // Update global counters
    countQ = counters.countQ;
    countW = counters.countW;
    countE = counters.countE;
    countR = counters.countR;

    // Actualizar la vista
    updateViewContent(counters);
  };

  // Botones de acción
  $(".btn-info").click(() => infoModal.show());
  $(".btn-finish").click(() => finishTransmision.show());

  // Modal de información
  $("#btn-accept").click(() => {
    if (
      channelName.val().trim().length !== 0 &&
      videoName.val().trim().length !== 0 &&
      videoDescription.val().trim().length !== 0
    ) {
      infoModal.hide();
      saveState(channelName.val(), videoName.val(), videoDescription.val());
    }
  });
});
