const UserCrud = artifacts.require("UserCrud");

module.exports = function (deployer) {
  deployer.deploy(UserCrud);
};
