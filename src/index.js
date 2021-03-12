import "./styles.css";
var Tcliche; //tamanho do cliche
var dpc; //diametro do porta cliche
var ec; //espessura do cliche
var edf; //espessura dupla face

function validateForm() {
  var x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

const calcularDI = function (dpc, ec, edf) {
  var di; //deformação da imagem
  var dip1;
  var dip2;
  dip1 = dpc + 2 * (ec + edf);
  dip2 = dpc + 2 * (edf + 0.12);
  di = dip1 / dip2;
  return di;
};

function calcularRedux(di) {
  var redux; //porcentagem de redução
  redux = (di - 1) * 100;
  return redux;
}
function calcularCliche(Tcliche, redux) {
  var Rcliche; //tamanho reduzido do cliche
  var equiCliche;
  equiCliche = (Tcliche * redux) / 100;
  Rcliche = Tcliche - equiCliche;
  return Rcliche;
}

const validarDecimal = (numero) => {
  let comPonto = numero.replaceAll(",", ".");
  const resultado = Number(comPonto);

  if (Number.isNaN(resultado)) {
    throw new Error("Número inválido");
  }

  return resultado;
};

const validarForm = (dados) => {
  let {
    tamanho,
    diametro,
    espessuraCliche,
    espessuraDuplaFace
  } = Object.fromEntries(dados);

  tamanho = validarDecimal(tamanho);
  diametro = validarDecimal(diametro);
  espessuraCliche = validarDecimal(espessuraCliche);
  espessuraDuplaFace = validarDecimal(espessuraDuplaFace);

  return {
    tamanho,
    diametro,
    espessuraCliche,
    espessuraDuplaFace
  };
};

const form = document.getElementById("formCalculo");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    const data = new FormData(e.target);

    let {
      tamanho,
      diametro,
      espessuraCliche,
      espessuraDuplaFace
    } = validarForm(data);

    const distorcaoImagem = calcularDI(
      diametro,
      espessuraCliche,
      espessuraDuplaFace
    );

    const reducao = calcularRedux(distorcaoImagem);

    const resultado = calcularCliche(tamanho, reducao);

    const texto = `Após uma redução de ${distorcaoImagem}% seu cliche terá de ter ${resultado} mm.`;

    document.getElementById("result").innerHTML = texto;
  } catch (e) {
    alert(e);
  }
});
