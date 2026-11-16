var Oficina = require("./modelos.js");

const lista_oficinas = {};
let contadorId = 1;

class OficinaMemoria {
  async cria(titulo, responsavel, descricao, carga_horaria) {
    const id = contadorId++;
    const oficina = new Oficina(id, titulo, responsavel, descricao, parseInt(carga_horaria), true);
    lista_oficinas[id] = oficina;
    return oficina;
  }

  async consulta(id) {
    if (lista_oficinas[id]) return lista_oficinas[id];
    else throw new Error(`Oficina com o ID ${id} não existe`);
  }

  async atualiza(id, titulo, responsavel, descricao, carga_horaria) {
    if (lista_oficinas[id]) {
      const oficina = lista_oficinas[id];
      oficina.titulo = titulo;
      oficina.responsavel = responsavel;
      oficina.descricao = descricao;
      oficina.carga_horaria = parseInt(carga_horaria);
      return oficina;
    }
    throw new Error(`Oficina com o ID ${id} não existe`);
  }

  async alternaSituacao(id) {
    if (lista_oficinas[id]) {
      const oficina = lista_oficinas[id];
      oficina.inscricoesAbertas = !oficina.inscricoesAbertas;
      return oficina;
    }
    throw new Error(`Oficina com o ID ${id} não existe`);
  }

  async deleta(id) {
    if (lista_oficinas[id]) {
      delete lista_oficinas[id];
    } else {
      throw new Error(`Oficina com o ID ${id} não existe`);
    }
  }

  async lista() {
    return Object.values(lista_oficinas);
  }

  async pesquisaPorTitulo(termo) {
    const todas = Object.values(lista_oficinas);
    if (!termo) return [];
    return todas.filter(o => o.titulo.toLowerCase().includes(termo.toLowerCase()));
  }

  async indicadores() {
    const oficinas = Object.values(lista_oficinas);
    const total = oficinas.length;
    const abertas = oficinas.filter(o => o.inscricoesAbertas).length;
    const encerradas = total - abertas;
    const cargaHorariaAbertas = oficinas
      .filter(o => o.inscricoesAbertas)
      .reduce((soma, o) => soma + o.carga_horaria, 0);

    return { total, abertas, encerradas, cargaHorariaAbertas };
  }
}

var repositorio = new OficinaMemoria();
module.exports = repositorio;