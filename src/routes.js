const loanController = require('./controller/loanController');
const validator = require('./controller/validator');

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        //Modelo de resposta
        res.status(200).json("API rodando com sucesso!");
    });

    app.get(
        '/getSimulation/:cpf/:uf/:birthdate/:loanValue/:monthValueToPay',
        validator.minLoanValue,
        validator.minInstallmentValue,
        loanController.getSimulation)
}
