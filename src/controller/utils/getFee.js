const getFee = function(value, fee){

    const percentFee = fee / 100;
    const calculatedFee = (value * percentFee);

    return Number(calculatedFee.toFixed(2));
}

module.exports = getFee;