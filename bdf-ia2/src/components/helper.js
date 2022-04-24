import instance from '../contracts/crowdfundingInstance';
import projectInstance from '../contracts/projectInstance';
import web3 from '../contracts/web3';

export const getAccount = async () => {
  const accInp = await web3.eth.getAccounts();
  return accInp[0];
};

export const createProject = async (title, desc, duration, amount) => {
  const account = await getAccount();
  const amountInWei = web3.utils.toWei(amount, 'ether');
  const res = await instance.methods
    .startProject(title, desc, duration, amountInWei)
    .send({ from: account });
  const info = res.events.ProjectStarted.returnValues;
  info.isLoading = false;
  info.currentAmount = 0;
  info.currentState = 0;
  info.contract = projectInstance(info.contractAddress);
  return info;
};

export const getProjects = async () => {
  const projectAddresses = await instance.methods.returnAllProjects().call();
  const instList = await projectAddresses.map(address => {
    const inst = projectInstance(address);
    return inst;
  });
  const dataList = await instList.map(async inst => {
    const data = await inst.methods.getDetails().call();
    return data;
  });
  const resp = Promise.all(dataList).then(values => {
    return values;
  });
  const resList = (await resp).map((res, i) => {
    res.contract = instList[i];
    return res;
  });
  return resList;
};

export const fundProject = async (contract, amount) => {
  if (amount <= 0) return;

  const amountInWei = web3.utils.toWei(amount, 'ether');
  const account = await getAccount();

  contract.methods.contribute().send({
    from: account,
    value: amountInWei,
  });
  // .then(res => {
  //   const newTotal = parseInt(
  //     res.events.FundingReceived.returnValues.currentTotal,
  //     10
  //   );
  // });
};

export const getRefund = async contract => {
  const account = await getAccount();
  contract.methods.getRefund().send({
    from: account,
  });
};
