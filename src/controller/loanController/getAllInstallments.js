const utils = require('../utils');
const moment = require('moment');

const getAllInstallments = (req, res, next) => {

    const allInstallments = [];
    const {loanValue, monthValueToPay, uf} = req.params;
    
    const stateFeeDictionary = utils.getStateFee();
    const feeTax = stateFeeDictionary[uf];
    const now = moment().format('DD/MM/YYYY');

    const inicialData = {
        balanceDue: ( Number(loanValue) ),
        monthValueToPay: ( Number(monthValueToPay) ),
        now,
        feeTax
    }

    let oneInstallment = getInstallment(inicialData);
    allInstallments.push(oneInstallment);
    
    while(allInstallments[allInstallments.length - 1].installmentValue == monthValueToPay){
        
        let lastInstallment = allInstallments[allInstallments.length - 1];

        let {newBalanceDue, installmentValue, deadline} = lastInstallment;

        let data = {
            balanceDue: ( newBalanceDue -  installmentValue),
            monthValueToPay: ( Number(monthValueToPay) ),
            now: deadline,
            feeTax
        }

        oneInstallment = getInstallment(data);
        allInstallments.push(oneInstallment);

    }

    return res.status(200).json(allInstallments);
};

function getInstallment({balanceDue, monthValueToPay, feeTax, now}){

    const fee = utils.getFee(balanceDue, feeTax);
    const newBalanceDue = (balanceDue + fee);
    const installmentValue = (newBalanceDue - monthValueToPay) > monthValueToPay ? monthValueToPay : newBalanceDue;
    const deadline = moment(now, 'DD/MM/YYYY').add(1, 'month').format('DD/MM/YYYY');

    const installment = {
        balanceDue,
        fee,
        newBalanceDue,
        installmentValue,
        deadline
    };

    return installment;
}

module.exports = getAllInstallments;