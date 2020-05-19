

  
  let scrollX = 0;
  let scrollY = 0;
  
  // this flage is true when the user is dragging the mouse
  let isDown = false;
  
  // these vars will hold the starting mouse position
  let startX;
  let startY;
  
  
  function rectangle(e) {
    let canvas = e.target;
    let ctx = canvas.getContext("2d");
    
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    
    let canvasOffset = {
      left: canvas.offsetLeft,
      top: canvas.offsetTop,
      
    };
    
    // let offsetX = canvas.offsetLeft;
    const offsetX = ()=>(canvas.getBoundingClientRect().x);
    
    // const offsetY = ()=>(canvas.getBoundingClientRect().y < 0)? canvas.getBoundingClientRect().y : (canvas.getBoundingClientRect().y*-1);
    const offsetY = ()=>(canvas.getBoundingClientRect().top*-1);

  
  return({
    drawRectangle:(ctx, x, y, w, h) => {
      ctx.fillRect(x, y, w, h);
    },
    clearRectangle:(ctx, x, y, cw, ch)=>{
      ctx.clearRect(x, y, cw, ch);
    },
    handleMouseDown:(e) => {
      e.preventDefault();
      e.stopPropagation();
      // save the starting x/y of the rectangle
      startX = parseInt(e.clientX - offsetX());
      startY = parseInt(e.clientY + offsetY());
      
      // set a flag indicating the drag has begun
      isDown = true;
    },
    
    handleMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();
    
      // the drag is over, clear the dragging flag
      isDown = false;
    },
    
    handleMouseOut(e) {
      e.preventDefault();
      e.stopPropagation();
    
      // the drag is over, clear the dragging flag
      isDown = false;
    },
    
    handleMouseMove(e) {
      
      e.preventDefault();
      e.stopPropagation();
    
      // if we're not dragging, just return
      if (!isDown) {
          return;
      }
    
      // get the current mouse position
      let mouseX = parseInt(e.clientX - offsetX());
      let mouseY = parseInt(e.clientY + offsetY());
    
      // Put your mousemove stuff here
    
      // clear the canvas
      this.clearRectangle(ctx,0, 0, canvas.width, canvas.height);
    
      // calculate the rectangle width/height based
      // on starting vs current mouse position
      let width = mouseX - startX;
      let height = mouseY - startY;
    
      // draw a new rect from the start position 
      // to the current mouse position
      this.drawRectangle(ctx, startX, startY, width, height)
      
    
    }

  })

}


export default rectangle;