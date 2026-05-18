// Aqui ele pega do HTML as requisições e manda para o CONTROLLER
var express = require("express");
var router = express.Router();

// Rota para salvar as respostas quando o usuário finaliza o quiz
router.post("/salvarResultado", function (req, res) {
    console.log("route quiz salvarResultado");
    usuarioController.salvarResultado(req, res);
});

// Rota para buscar os dados mastigados e desenhar o Chart.js
router.get("/buscarDadosDashboard", function (req, res) {
    console.log("route dashboard buscarDados");
    usuarioController.buscarDadosDashboard(req, res);
});

module.exports = router;