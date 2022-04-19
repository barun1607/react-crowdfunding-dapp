import web3 from './web3';
import { PROJECT_ABI } from './secrets';

const projectInstance = address => {
  const instance = new web3.eth.Contract(PROJECT_ABI, address);
  return instance;
};

export default projectInstance;
