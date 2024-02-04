import sh from 'shelljs';
import pc from 'picocolors';

import DeployAngularApp from './frameworks/angular.js';

export default function deploy(params) {
  const deployRunner = getDeployStrategyFactory(params.framework, {
    ...params,
    sh,
  });
  deployRunner.init();
  deployRunner.prepareFilesToDeploy();
  deployRunner.publish();
  deployRunner.cleanup();

  console.log(pc.green(`Deployment success!`));
  console.log(
    pc.blue(
      `https://${deployRunner.username}.github.io/${deployRunner.projectName}`
    )
  );

  function getDeployStrategyFactory(framework, params) {
    switch (framework) {
      case 'angular':
        return new DeployAngularApp(params);
      default:
        return new DeployAngularApp(params);
    }
  }
}
