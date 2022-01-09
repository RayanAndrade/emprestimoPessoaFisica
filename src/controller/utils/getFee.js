const getFee = function(value, fee){

    const percentFee = fee / 100;

    return (value * percentFee);
}

module.exports = getFee;