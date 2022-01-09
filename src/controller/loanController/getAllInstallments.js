const utils = require('../utils');
const dayjs = require('dayjs');
dayjs.locale('br');

const getAllInstallments = (req, res, next) => {

    const {loanValue, monthValueToPay, uf} = req.params;
    
    const stateFeeDictionary = utils.getStateFee();
    const feeTax = stateFeeDictionary[uf];
    const now = dayjs().format('DD/MM/YYYY');

    const inicialData = {
        balanceDue: ( Number(loanValue) ),
        monthValueToPay: ( Number(monthValueToPay) ),
        now,
        feeTax
    }

    const test = getInstallment(inicialData);

    

    return res.status(200).json(test);
};

function getInstallment({balanceDue, monthValueToPay, feeTax, now}){

    const fee = utils.getFee(balanceDue, feeTax);
    const newBalanceDue = (balanceDue + fee);
    const installmentValue = (newBalanceDue - monthValueToPay) > monthValueToPay ? monthValueToPay : newBalanceDue;
    const deadline = dayjs(now).add(1, 'month').format('DD/MM/YYYY');

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