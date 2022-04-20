import web3 from './web3';
import { CONTRACT_ADDRESS, CROWDFUNDING_ABI } from './secrets';

const instance = new web3.eth.Contract(CROWDFUNDING_ABI, CONTRACT_ADDRESS);

export default instance;
