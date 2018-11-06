pragma solidity ^0.4.20;

contract InkToken {
    uint256 public totalSupply;
    string public name;
    string public symbol;

    mapping (address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Burn(address indexed from, uint256 value);

    event Mint(address indexed addr, uint256 value);

    function InkToken(uint256 initialSupply) public {
        balanceOf[msg.sender] = initialSupply;
        name = "inglenook";
        symbol = "INK";
        totalSupply = initialSupply;
    }

    function _transfer(address _from, address _to, uint256 _value) internal {
        require(_to != 0x0);
        require(balanceOf[_from] >= _value);
        require(balanceOf[_to] + _value >= balanceOf[_to]); // Check for overflows
        uint previousSum = balanceOf[_from] + balanceOf[_to];
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(_from, _to, _value);
        assert(balanceOf[_from] + balanceOf[_to] == previousSum);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        _transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        _transfer(_from, _to, _value);
        return true;
    }

    function burn(uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        totalSupply -= _value;
        emit Burn(msg.sender, _value);
        return true;
    }

    function mint(address _addr, uint256 _value) public returns (bool success) {
        balanceOf[_addr] += _value;
        totalSupply += _value;
        emit Mint(_addr, _value);
        return true;
    }
}
