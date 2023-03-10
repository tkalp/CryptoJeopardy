# Crypto Jeopardy

## Decentralized Dilemmas: A Blockchain Jeopardy Challenge
The practice of securing communication by transforming plaintext into unreadable ciphertext, and vice versa, using mathematical algorithms and secret keys...What is Cryptography?

## Introduction
So… Let’s talk about the exciting world of Cryptography, demystify the belief of its complexity, build on fundamental knowledge and challenge you to learn more about the fundamental, objectives, uses, methods and even humor regarding cryptography.  How about we make a game of it and test your knowledge as you attempt to gain the highest score, in a game of Jeopardy. Each round will have category specific questions in the form of statements and answers required in the form of questions. Are you up for the challenge? What if we make it even more interesting and specialize the game to see how much you know about blockchains? 

## Blockchain Of Trust

So why did we select blockchain as the specialty topic for our Jeopardy game? Blockchain technology is a revolutionary new way of storing and transferring data that is quickly gaining traction in a wide range of industries. At its core, blockchain combines cryptographic techniques and a decentralized architecture to provide three key features: confidentiality, integrity, and availability (CIA Triad). 

Confidentiality is maintained through the use of public-key cryptography. Each participant in the blockchain network has a unique pair of keys, one public and one private. The public key is used to encrypt data, while the private key is used to decrypt it. This ensures that only authorized parties can access the information stored on the blockchain.

Integrity is maintained by using a hash function to create a unique digital fingerprint of each block in the chain. This fingerprint, or hash, is based on the data contained in the block and the hash of the previous block in the chain. This creates a tamper-evident chain that ensures that the data stored on the blockchain is valid and has not been altered. Additionally, a consensus mechanism is used to ensure that only valid transactions are added to the blockchain.

Finally, availability is provided by the decentralized nature of the blockchain. The public ledger is spread across multiple nodes in the network, ensuring that the network can continue to function and the data remains accessible even if one node goes offline. This also ensures that there is no single point of failure in the system, making it highly resilient and redundant.

For our project, we not only want to test out the knowledge of these foundations but also integrate some of the most interesting use cases for Blockchains and the type of material that will be found in the game

1. Decentralization: The distributed nature of blockchain technology, where transactions are recorded across multiple nodes on a network, consequently eliminating the need for a central authority or intermediary.

2. Consensus algorithms: The mechanisms by which the network reaches agreement on the state of the blockchain. Common examples include: Proof of Work, Proof of Stake, Proof of Authority

3. Smart Contracts: Self-executing contracts with the terms of the agreement directly written into lines of code and stored within blocks on the network.

4. Distributed Ledger Technology: A digital record-keeping system where multiple copies of a ledger are spread across a network of peers.

5. Cryptography: This is crypto jeopardy, isn't it?

6. Tokenization: The process of creating a digital token, typically on a blockchain, that can represent a variety of assets. Most commonly known as the "NFTs" or as we like to call them "digital monkeys"

7. Privacy and Anonymity: Techniques that protect the identity and transactional data of individuals and organizations using the cryptographic techniques used in blockchain networks

.....and many more, we don't want to spoil the whole game for you.

## Jeopardy Style
To further elaborate, a programmable game was selected as research showed it is a promising teaching approach that aids in fostering student learning, as well has shown to be an effective learning tool. The main focus is to share in-depth knowledge with users through a point based incentive structure ideally aiding in the retention of information that may or may not aid in correctly answering further complex questions. The game audience and users are assumed to be students or scholars but can be enjoyed by anyone with an interest or base knowledge of Cryptography. 

Originally, there was no theme to convey the overall importance of Cryptography. The game had a multitude of random categories varying in topics all under the subject of cryptography. There was no shortage of research materials, but focus was lost, the game felt disorganized, and questions felt to be more complex. So a version theme was added, becoming the driver to questions, correlating categories sand overall giving the game a more focused feel. Now, with theme fundamental categories are present in addition to themed categorizes correlated to blockchain.

## Merkle Trees  
In addition, we have also added a Merkle Tree as a means of validation to the game and demonstrating a crucial component of blockchains. A Merkle Tree is a type of data structure that is used to validate the integrity of data in a distributed system. It works by taking a set of data, such as the clues and answers to the questions in a jeopardy game, and creating a hash of each piece of data. These hashes are then combined in pairs to create a new set of hashes, and this process is repeated until a single hash, called the root hash, is generated. We have chosen the SHA256 hashing algorithm to continuously hash these values. Now we can use this root hash as a fingerprint of the entire set of data, and any changes to the data can be detected by comparing the root hash to a previously recorded value. Not only this, but we can validate that answers are correct to clue by checking the proof against the Merkle Tree.

By implementing a Merkle Tree within our jeopardy game, it provides a way to ensure the integrity of the answers data and prevent malicious actors from tampering with it. This means that players can have confidence that the game is fair and that all players are playing on a level playing field.

## How to Run
This project was developed using the Next.js Framework which mainly uses React for the UI and JavaScript for the backend. If you would like to clone this app and test it on your local machine. You can do so by doing the following

1. First, install <a href="https://nodejs.org/en/" target="_blank">Node.js</a>
2. Clone this repository, ensure that you are either logged into the UCBS github account or add your personal account as a collaborator to this project
3. Open terminal, navigate to the project folder that you have cloned.
4. Run the command `npm install --legacy-peer-deps` to install all modules and dependencies
5. Run the command `npm run dev` to start the web server on `localhost: 3000`
6. Go to your web browser and visit `localhost: 3000`


But again...the game is not finished yet, so you may see some creepy crawly bugs!

You can also play the beta version of the game <a href="https://crypto-jeopardy.vercel.app/">here</a>
