const loanController = require('./controller/loanController');
const validator = require('./controller/validator');
const loanDb = require('./controller/db/loan');

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        //Modelo de resposta
        res.status(200).json("API rodando com sucesso!");
    });

    app.get(
        '/getSimulation/:cpf/:uf/:birthdate/:loanValue/:monthValueToPay',
        validator.minLoanValue,
        validator.minInstallmentValue,
        loanController.getSimulation
    );
    
    app.post('/saveLoan', loanDb.insertLoan);
    app.get('/getLoans', loanDb.getLoans)
}
