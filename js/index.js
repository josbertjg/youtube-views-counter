$(document).ready(()=>{
  let countQ = 0;
  let countW = 0;
  let countE = 0;
  let countR = 0;
  let keyPressed = null;
  const infoModal = new bootstrap.Modal(document.getElementById("info-modal"));
  infoModal.show()
  
  // Eventos de la ventana
  window.onkeydown = (event) => keyPressed = event.key;
  
  window.onwheel = (event) => {
    infoModal.hide()
    const direction = Math.sign(event.deltaY) < 0

    if(keyPressed == 'q') countQ = updateCounter(countQ,direction,6)
    if(keyPressed == 'w') countW = updateCounter(countW,direction,12)
    if(keyPressed == 'e') countE = updateCounter(countE,direction,12)
    if(keyPressed == 'r') countR = updateCounter(countR,direction,132)

    updateViewContent({countQ, countW, countE, countR})
  }

  // Eventos de botones de accion
  $(".btn-info").click(()=>infoModal.show())
})
