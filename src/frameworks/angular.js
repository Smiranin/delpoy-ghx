import BaseDeploy from './base.js';

/**
 * Class for deploying Angular applications, extending the BaseDeploy class.
 */
export default class AngularAppDeploy extends BaseDeploy {
  /**
   * Constructor for the CustomDeploy class.
   * @param {Object} params - Deployment parameters.
   * @param {Object} params.sh - ShellJS object for executing shell commands.
   * @param {string|null} params.path - Path to deploy (null if not specified).
   */
  constructor(params) {
    // Call the constructor of the parent class (BaseDeploy).
    super(params);
  }

  /**
   * Initialize the AngularAppDeploy instance.
   * Calls the init method of the parent class and sets the build folder path.
   */
  init() {
    // Call the init method of the parent class (BaseDeploy).
    super.init();
    // Set the build folder path specific to Angular projects.
    this.buildFolder = `dist/${this.projectName}/browser/`;
  }

  /**
   * Prepare files for deployment.
   * Builds the Angular application, adjusts base href in index.html, and creates a 404.html file.
   */
  prepareFilesToDeploy() {
    // Build the Angular application with the 'ng build --prodaction' command.
    if (this.sh.exec('npm run ng build --prodaction').code !== 0) {
      throw new Error('Error: Build error');
    }

    // Change the working directory to the build folder.
    this.sh.cd(this.buildFolder);

    // Replace the base href in index.html to support GitHub Pages.
    this.sh.sed('-i', `<base href="/">`, `<base href="">`, 'index.html');

    // Create a copy of index.html named 404.html.
    if (this.sh.exec('cp ./index.html ./404.html').code !== 0) {
      throw new Error('Error: create 404.html failed');
    }
  }
}
