const allLoans = [];

const insertLoan = function(req, res, next){
    console.log(req.body)
    const {summary, installments} = req.body;

    allLoans.push({summary, installments});
    return res.status(200).json('Dados salvos com sucesso!')
}

const getLoans = (req, res, next) => {
    console.log(allLoans)
    return res.status(200).json(allLoans);
}

module.exports = {
    insertLoan,
    getLoans
};