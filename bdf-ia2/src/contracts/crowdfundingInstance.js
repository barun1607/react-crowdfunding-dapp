import web3 from './web3';
import { WALLET_ADDRESS, CROWDFUNDING_ABI } from './secrets';

const instance = new web3.eth.Contract(CROWDFUNDING_ABI, WALLET_ADDRESS);

export default instance;
