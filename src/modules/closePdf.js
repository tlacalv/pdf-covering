
const closePdf = (container) => {
  let canvases = container.children;
  let loop = canvases.length;
  for(let i = 0; i < loop; i++){
    container.removeChild(canvases[0]);
  }
  canvases= null;
}

export default closePdf;
