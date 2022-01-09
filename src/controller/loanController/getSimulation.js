const utils = require('../utils');
const getAllInstallments = require('./getAllInstallments');

const getSimulation = function(req, res, next){

    const {loanValue, uf, monthValueToPay} = req.params;

    const stateFeeDictionary = utils.getStateFee();
    const feeTax = stateFeeDictionary[uf];

    const installments = getAllInstallments({...req.params, feeTax});
    const totalMonths = installments.length;
    let totalPayment = 0;
    installments.forEach(installment => {
        totalPayment += installment.installmentValue;
    })
    const totalFeePayed = totalPayment - loanValue;

    const summary = [{
        loanValue,
        feeTax,
        monthValueToPay,
        totalMonths,
        totalFeePayed,
        totalPayment
    }];

    return res.status(200).json({
        summary,
        installments
    })

}

module.exports = getSimulation;