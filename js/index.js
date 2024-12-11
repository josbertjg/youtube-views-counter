$(document).ready(()=>{
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

  // Mostrando el modal a penas carga la ventana
  infoModal.show()

  // Si existen valores en el local storage, entonces se setea en los inputs
  setState();
  
  // Eventos de la ventana
  window.onkeydown = (event) => keyPressed = event.key;
  
  window.onwheel = (event) => {
    const direction = Math.sign(event.deltaY) < 0

    if(keyPressed == 'q') countQ = updateCounter(countQ,direction,6)
    if(keyPressed == 'w') countW = updateCounter(countW,direction,12)
    if(keyPressed == 'e') countE = updateCounter(countE,direction,12)
    if(keyPressed == 'r') countR = updateCounter(countR,direction,132)

    updateViewContent({countQ, countW, countE, countR})
  }

  // Eventos de botones de accion
  $(".btn-info").click(()=>infoModal.show())
  $(".btn-finish").click(()=>finishTransmision.show())

  // Eventos del modal
  $("#btn-accept").click(()=>{
    if(channelName.val().trim().length != 0 && videoName.val().trim().length != 0 && videoDescription.val().trim().length != 0){
      infoModal.hide();
      saveState(channelName.val(),videoName.val(),videoDescription.val())
    }
  })
})
