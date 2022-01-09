const minLoanValue = function(req, res, next){
    const {loanValue} = req.params;
    const minValue = 50000;

    if(loanValue < minValue){
        res.status(400).json({
            MSG: `Valor do empréstimo deve ser maior que R$${minValue}`
        });
    }else{
        next();
    }
}

module.exports = minLoanValue;