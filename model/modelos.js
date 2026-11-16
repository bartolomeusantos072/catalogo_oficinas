class Oficina {
  constructor(id, titulo, responsavel, descricao, carga_horaria, inscricoesAbertas = true) {
    this._id = id;
    this._titulo = titulo;
    this._responsavel = responsavel;
    this._descricao = descricao;
    this._carga_horaria = carga_horaria;
    this._inscricoesAbertas = inscricoesAbertas; // true para abertas, false para encerradas
  }

  get id() { return this._id; }
  get titulo() { return this._titulo; }
  get responsavel() { return this._responsavel; }
  get descricao() { return this._descricao; }
  get carga_horaria() { return this._carga_horaria; }
  get inscricoesAbertas() { return this._inscricoesAbertas; }

  set titulo(val) { this._titulo = val; }
  set responsavel(val) { this._responsavel = val; }
  set descricao(val) { this._descricao = val; }
  set carga_horaria(val) { this._carga_horaria = val; }
  set inscricoesAbertas(val) { this._inscricoesAbertas = val; }
}

module.exports = Oficina;