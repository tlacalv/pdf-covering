const renderPage = async (page, canvas) => {
  let width = 1000;
  let scale;
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

  await page.render(renderContext)
  page.cleanup()
}
export default renderPage;
