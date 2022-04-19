import Web3 from 'web3';

// if (window.ethereum) {
//   window.web3 = new Web3(ethereum);
//   try {
//     ethereum.enable();
//   } catch (error) {
//     console.log('Access denied');
//   }
// } else if (window.web3) {
//   window.web3 = new Web3(web3.currentProvider);
// } else {
//   console.log(
//     'Non-Ethereum browser detected. You should consider trying MetaMask!'
//   );
// }

const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');

export default web3;
