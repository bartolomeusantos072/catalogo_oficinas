const oficinasRepo = require('../model/oficinaMemoria.js');

exports.home = async function(req, res) {
  const lista = await oficinasRepo.lista();
  const indicadores = await oficinasRepo.indicadores();
  res.render('index', {
    titulo_pagina: 'Catálogo de Oficinas',
    ativaInicio: true,
    oficinas: lista,
    indicadores,
    temOficinas: lista.length > 0,
    mostraAbertasApenas: false
  });
};

exports.inscricoesAbertas = async function(req, res) {
  const todas = await oficinasRepo.lista();
  const lista = todas.filter(o => o.inscricoesAbertas);
  const indicadores = await oficinasRepo.indicadores();
  res.render('index', {
    titulo_pagina: 'Oficinas com Inscrições Abertas',
    ativaInicio: true,
    oficinas: lista,
    indicadores,
    temOficinas: todas.length > 0,
    temAbertas: lista.length > 0,
    mostraAbertasApenas: true
  });
};

exports.sobre = function(req, res) {
  res.render('sobre', {
    titulo_pagina: 'Sobre o Catálogo',
    ativaSobre: true
  });
};

exports.cria_get = function(req, res) {
  res.render('criaOficina', {
    titulo_pagina: 'Nova Oficina',
    ativaNova: true
  });
};

exports.cria_post = async function(req, res) {
  const { titulo, responsavel, descricao, carga_horaria } = req.body;
  await oficinasRepo.cria(titulo, responsavel, descricao, carga_horaria);
  res.redirect('/oficinas');
};

exports.consulta = async function(req, res) {
  try {
    const id = req.params.id;
    const oficina = await oficinasRepo.consulta(id);
    res.render('consultaOficina', {
      titulo_pagina: 'Consulta de Oficina',
      oficina
    });
  } catch (error) {
    res.redirect('/oficinas');
  }
};

exports.altera_get = async function(req, res) {
  try {
    const id = req.params.id;
    const oficina = await oficinasRepo.consulta(id);
    res.render('alteraOficina', {
      titulo_pagina: 'Editar Oficina',
      oficina
    });
  } catch (error) {
    res.redirect('/oficinas');
  }
};

exports.altera_post = async function(req, res) {
  const id = req.params.id;
  const { titulo, responsavel, descricao, carga_horaria } = req.body;
  await oficinasRepo.atualiza(id, titulo, responsavel, descricao, carga_horaria);
  res.redirect('/oficinas/consulta/' + id);
};

exports.alterna = async function(req, res) {
  const id = req.params.id;
  await oficinasRepo.alternaSituacao(id);
  res.redirect('/oficinas');
};

exports.deleta = async function(req, res) {
  const id = req.params.id;
  await oficinasRepo.deleta(id);
  res.redirect('/oficinas');
};

exports.pesquisa_get = function(req, res) {
  res.render('pesquisaOficina', {
    titulo_pagina: 'Pesquisa de Oficinas',
    ativaPesquisa: true,
    pesquisado: false
  });
};

exports.pesquisa_post = async function(req, res) {
  const termo = req.body.termo || '';
  const resultado = await oficinasRepo.pesquisaPorTitulo(termo);
  res.render('pesquisaOficina', {
    titulo_pagina: 'Pesquisa de Oficinas',
    ativaPesquisa: true,
    pesquisado: true,
    termo,
    resultado,
    temResultado: resultado.length > 0
  });
};