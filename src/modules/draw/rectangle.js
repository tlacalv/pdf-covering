
  // this flage is true when the user is dragging the mouse
  let isDown = false;
  
  // these vars will hold the starting mouse position
  let startX;
  let startY;
  
  let width, height;
  
  
  function rectangle(e={}) {
    let canvas = e.target;
    let ctx = canvas.getContext("2d");
    
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    
    

    const offsetX = ()=>(canvas.getBoundingClientRect().x);
    const offsetY = ()=>(canvas.getBoundingClientRect().top*-1);

  
  return({
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
      return {
        context: ctx,
        startX,
        startY,
        width,
        height
      }
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
      clearRectangle(ctx,0, 0, canvas.width, canvas.height);
    
      // calculate the rectangle width/height based
      // on starting vs current mouse position
      width = mouseX - startX;
      height = mouseY - startY;
    
      // draw a new rect from the start position 
      // to the current mouse position
      drawRectangle(ctx, startX, startY, width, height)
      
    
    }

  })

}

const drawRectangle = (ctx, x, y, w, h) => {
  ctx.fillRect(x, y, w, h);
}
const clearRectangle = (ctx, x, y, cw, ch)=>{
  ctx.clearRect(x, y, cw, ch);
}
export {
  rectangle,
  drawRectangle,
  clearRectangle,
};