const loanController = require('./controller/loanController');

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        //Modelo de resposta
        res.status(200).json("API rodando com sucesso!");
    });

    app.get('/getStateFee', loanController.getStateFee)
}
