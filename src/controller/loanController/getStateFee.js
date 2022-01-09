const getStateFee = (req, res, next) => {
    const stateFeeConfig = {
        'MG': 1,
        'SP': 0.8,
        'RJ': 0.9,
        'ES': 1.11,
    };

    return res.status(200).json(stateFeeConfig);
};

module.exports = getStateFee;
