import { Flame, Zap, Shield, Repeat } from "lucide-react";

export const SAMPLES = [
    {
        name: "ERC20 Token",
        icon: Zap,
        solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
    mapping(address => uint256) public balances;
    uint256 public totalSupply;

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Balance too low");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}`
    },
    {
        name: "NFT Mint",
        icon: Flame,
        solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleNFT {
    uint256 private _currentId;
    mapping(uint256 => address) private _owners;

    function mint() public returns (uint256) {
        _currentId++;
        _owners[_currentId] = msg.sender;
        return _currentId;
    }
}`
    },
    {
        name: "Staking Pool",
        icon: Shield,
        solidity: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Staking {
    mapping(address => uint256) public staked;

    function stake() public payable {
        staked[msg.sender] += msg.value;
    }

    function withdraw() public {
        uint256 amount = staked[msg.sender];
        staked[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}`
    }
];
