const getStateFee = () => {
    const stateFeeConfig = {
        'MG': 1,
        'SP': 0.8,
        'RJ': 0.9,
        'ES': 1.11,
    };

    return stateFeeConfig;
};

module.exports = getStateFee;
