import instance from '../contracts/crowdfundingInstance';
import projectInstance from '../contracts/projectInstance';
import web3 from '../contracts/web3';

export const getAccount = async () => {
  const accInp = await web3.eth.getAccounts();
  return accInp[0];
};

export const createProject = async (title, desc, duration, amount) => {
  const account = await getAccount();
  const res = await instance.methods
    .startProject(
      title,
      desc,
      duration,
      // web3.utils.toWei(amount, 'ether')
      amount
    )
    .send({ from: account });
  const info = res.events.ProjectStarted.returnValues;
  info.isLoading = false;
  info.currentAmount = 0;
  info.currentState = 0;
  info.contract = projectInstance(info.contractAddress);
  return info;
};

export const getProjects = () => {
  let projectList = [];

  instance.methods
    .returnAllProjects()
    .call()
    // .then(res => console.log(res));
    .then(projects => {
      projects.forEach(projectAddress => {
        const inst = projectInstance(projectAddress);
        inst.methods
          .getDetails()
          .call()
          .then(projectData => {
            const info = projectData;
            info.isLoading = false;
            info.contract = inst;
            projectList.push(info);
          });
      });
    });

  return projectList;
};
