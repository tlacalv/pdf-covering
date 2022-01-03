<?php 
  $id = $_GET['id_oficio'];
  $table = $_GET['table'];
  echo '<input type="text" style="display:none;" id="id_oficio" value="'. $id .'">';
  echo '<input type="text" style="display:none;" id="db_table" value="'. $table .'">';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PDF editor</title>
</head>
<body>
  <div class="controls">
    <div class="cont">
      <input type="file" id="uploaded-file" accept="application/pdf">
      <label class="select-file" id="select-file" for="uploaded-file">Selecciona un pdf</label>
      <button class="clear disabled" id="clear-state" disabled>limpiar</button>
      <button class="clear disabled" id="clear" disabled>Cerrar</button>
      <button class="clear disabled" id="save" disabled>Guardar</button>
    </div>
  </div>
  <div class="container" id="container"></div>
</body>
</html>