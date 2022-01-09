const minInstallmentValue = function(req, res, next){
    const {loanValue, monthValueToPay} = req.params;

    const onePercentInstallment = (Number(loanValue) / 100);
    const installment = Number(monthValueToPay);

    if(onePercentInstallment > installment){
        res.status(400).json({
            MSG: `Valor da parcela paga mensalmente (R$${monthValueToPay}) deve ser maior que 1% do valor do empréstimo (R$${loanValue})`
        });
    }else{
        next();
    }
}

module.exports = minInstallmentValue;