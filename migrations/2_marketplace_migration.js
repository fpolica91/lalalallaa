const TangibleMarketPlace = artifacts.require("TangibleMarketPlace");

module.exports = async (deployer) => {
 await  deployer.deploy(TangibleMarketPlace);
};
