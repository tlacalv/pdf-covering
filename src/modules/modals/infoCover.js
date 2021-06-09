import Swal from "sweetalert2";

// let rect = new rectangle();
const info = (pages, messages) => {
  Swal.fire({
    title: "Informacion",
    text: "Cualquier cambio sin guardar se perdera",
    icon: "info",
    html: `<b>Paginas: </b> ${pages}
          <br>
          <b>Motivos: </b> ${messages}
    `,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Ok",
  });
};

export { info };
