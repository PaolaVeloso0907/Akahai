// aqui ele executa as informações validadas pelo CONTROLLERS e manda para o BD rodar, 
// depois devolve a resposta para o CONTROLLER, q vai até a ROUTES que exibe para o USER por fim.
var database = require("../database/config");

function salvarResultado(idUsuario, pontuacao, q1, q2, q3, q4, q5) {
    console.log("ACESSEI O MODEL SALVAR RESULTADO");

    var instrucaoSql1 = `
        INSERT INTO resultado (acertouQ1, acertouQ2, acertouQ3, acertouQ4, acertouQ5)
        VALUES (${q1}, ${q2}, ${q3}, ${q4}, ${q5});
    `;
    console.log("Executando Passo 1 (Respostas): \n" + instrucaoSql1);

    return database.executar(instrucaoSql1).then(function(resultadoInsercao) {
        
        var idResultadoGerado = resultadoInsercao.insertId;

        var instrucaoSql2 = `
            INSERT INTO quiz (pontuacaoTotal, dataTentativa, fkUsuario, fkResultado)
            VALUES (${pontuacao}, NOW(), ${idUsuario}, ${idResultadoGerado});
        `;
        console.log("Executando Passo 2 (Quiz final): \n" + instrucaoSql2);
        
        return database.executar(instrucaoSql2);
    });
}

function buscarDadosDashboard() {
    console.log("ACESSEI O MODEL BUSCAR DADOS DASHBOARD");

    // O nosso JOIN matador atualizado com os nomes corretos do seu script
    var instrucaoSql = `
        SELECT
            usuario.perfil,
            SUM(r.acertouQ1) as total_q1,
            SUM(r.acertouQ2) as total_q2,
            SUM(r.acertouQ3) as total_q3,
            SUM(r.acertouQ4) as total_q4,
            SUM(r.acertouQ5) as total_q5
        FROM quiz
        JOIN usuario ON quiz.fkUsuario = usuario.idUsuario
        JOIN resultado ON quiz.fkResultado = resultado.idResultado
        GROUP BY usuario.perfil;
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarResultado,
    buscarDadosDashboard
};