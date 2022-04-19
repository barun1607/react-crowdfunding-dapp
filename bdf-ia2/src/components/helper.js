import instance from '../contracts/crowdfundingInstance';
import projectInstance from '../contracts/projectInstance';

export const getProjects = () => {
  let projectList = [];
  //   console.log(instance);
  instance.methods
    .returnAllProjects()
    .call()
    .then(projects => {
      projects.forEach(project => {
        const inst = projectInstance(project);
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
