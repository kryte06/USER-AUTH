// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract userauth {
    struct UserDetails {
        string name;
        string email;
        string password;
        // Add more user details here
    }

    struct User {
        UserDetails details;
        string ipfsHash;
    }

    mapping(address => User) users;

    event UserRegistered(address indexed user, string ipfsHash);

    function registerUser(
        UserDetails memory details,
        string memory ipfsHash
    ) internal {
        require(
            bytes(users[msg.sender].ipfsHash).length == 0,
            "User is already registered"
        );
        users[msg.sender] = User(details, ipfsHash);
        emit UserRegistered(msg.sender, ipfsHash);
    }
}
