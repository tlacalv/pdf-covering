const renderPage = (page, canvas) => {
  let width = 900;
  let scale = 1.3;
  let viewport = page.getViewport({ scale: 1 })
  scale = width / viewport.width;

  let scaledViewpoer = page.getViewport({ scale })

  
  let context = canvas.getContext('2d');
  canvas.height = scaledViewpoer.height
  canvas.width = scaledViewpoer.width

  let renderContext = {
    canvasContext : context,
      viewport: scaledViewpoer
  };

  page.render(renderContext);
}
export default renderPage;
