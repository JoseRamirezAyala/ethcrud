const { expectRevert } = require('@openzeppelin/test-helpers');
const UserCrud = artifacts.require('UserCrud.sol');

contract('UserCrud', accounts => {
  let userCrud;
  let expectedUser;

  before(async () => {
    userCrud = await UserCrud.new();
  });

  it('should have totalUsers 0 when deployed', async () => {
    const totalUsers = await userCrud.totalUsers;
    //should have 0 totalUsers...
  })
})

