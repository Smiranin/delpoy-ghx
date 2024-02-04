import sh from 'shelljs';
import pc from 'picocolors';
import AngularAppDeploy from './frameworks/angular.js';
import CustomDeploy from './frameworks/custom.js';

/**
 * Deploy the project based on the specified parameters.
 * @param {Object} params - Deployment parameters.
 * @param {string} params.framework - Deployment framework ('angular' or 'custom').
 * @param {string|null} params.path - Path to deploy (null if not specified).
 */
export default function deploy(params) {
  // Get the deployment strategy based on the specified framework.
  const deployRunner = getDeployStrategyFactory(params.framework, {
    ...params,
    sh,
  });

  try {
    // Initialize the deployment process.
    deployRunner.init();
    console.log(pc.blue(`Initialized the deployment process.`));

    // Prepare files for deployment.
    deployRunner.prepareFilesToDeploy();
    console.log(pc.blue(`Prepared files for deploymen.`));

    // Publish the deployment.
    deployRunner.publish();
    console.log(pc.blue(`Published files to gh-pages.`));

    // Cleanup after deployment.
    deployRunner.cleanup();
    console.log(pc.blue(`Cleanup files after deployment.`));

    // Display success message in green.
    console.log(pc.green(`Deployment success!`));

    // Display the deployed project URL in blue.
    console.log(
      pc.green(
        `https://${deployRunner.username}.github.io/${deployRunner.projectName}`
      )
    );
  } catch (error) {
    console.log(pc.red(error.message));
  }

  /**
   * Get the deployment strategy based on the specified framework.
   * @param {string} framework - Deployment framework ('angular' or 'custom').
   * @param {Object} params - Additional parameters for the deployment strategy.
   * @returns {Object} - Instance of the deployment strategy.
   */
  function getDeployStrategyFactory(framework, params) {
    switch (framework) {
      case 'angular':
        return new AngularAppDeploy(params);
      case 'custom':
        return new CustomDeploy(params);
      default:
        // Default to Angular deployment if the framework is not recognized.
        return new AngularAppDeploy(params);
    }
  }
}
