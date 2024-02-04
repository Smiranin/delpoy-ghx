/**
 * Base class for deployment strategies.
 */
export default class BaseDeploy {
  /**
   * Constructor for the CustomDeploy class.
   * @param {Object} params - Deployment parameters.
   * @param {Object} params.sh - ShellJS object for executing shell commands.
   * @param {string|null} params.path - Path to deploy (null if not specified).
   */
  constructor(params) {
    // Initialize the ShellJS object for executing shell commands.
    this.sh = params.sh;
    // Set the build folder path specific to custom projects. options
    this.buildFolder = params.path;
  }

  /**
   * Initialize the deployment process.
   * Checks for the presence of 'git', extracts project details from the repository URL.
   * Exits the script if 'git' is not found or repository details cannot be determined.
   */
  init() {
    // Check if 'git' is installed.
    if (!this.sh.which('git')) {
      throw new Error('Sorry, this script requires git');
    }

    // Get the remote repository URL.
    this.repos = this.sh.exec('git remote get-url origin').stdout.trim();

    // Extract the project name from the repository URL.
    let reposArrPath = this.repos.split('/');
    let length = reposArrPath.length;
    this.projectName = reposArrPath[length - 1].split('.')[0];

    // Extract the username from the repository URL.
    let dirtyUsername = reposArrPath[reposArrPath.length - 2].split(':');
    this.username = dirtyUsername[dirtyUsername.length - 1];

    // Exit the script if the repository URL is not found.
    if (!this.repos) {
      throw new Error('Remote url not found');
    }
  }

  /**
   * Prepare files for deployment.
   * In base scenario we don't need it
   */
  prepareFilesToDeploy() {
    if (!this.sh.test('-d', this.buildFolder)) {
      throw new Error(
        `The folder ${this.buildFolder} does not exist or is not a directory.`
      );
    }
    // Change the working directory to the build folder.
    this.sh.cd(this.buildFolder);
  }

  /**
   * Publish the project.
   * Performs steps such as initializing a Git repository, adding a remote, pushing changes to 'gh-pages', etc.
   */
  publish() {
    // Initialize a new Git repository in the 'dist' folder.
    if (this.sh.exec('git init').code !== 0) {
      throw new Error('Error: git init failed');
    }

    // Add a remote repository named 'upstream'.
    if (this.sh.exec(`git remote add upstream "${this.repos}"`).code !== 0) {
      throw new Error('Error: Git repos add remote failed');
    }

    // Fetch changes from the remote repository.
    if (this.sh.exec('git fetch upstream').code !== 0) {
      throw new Error('Error: Git repos add remote');
    }

    // Delete the existing 'gh-pages' branch on the remote repository.
    this.sh.exec('git push upstream --delete gh-pages');

    // Add all files to the Git repository.
    if (this.sh.exec('git add -A .').code !== 0) {
      throw new Error('Error: Git add failed');
    }

    // Commit changes with a deployment message.
    if (this.sh.exec('git commit -m "deploy project"').code !== 0) {
      throw new Error('Error: Git commit failed');
    }

    // Push changes to the 'gh-pages' branch on the remote repository.
    if (this.sh.exec('git push -q upstream HEAD:gh-pages').code !== 0) {
      throw new Error('Error: Git push failed');
    }
  }

  /**
   * Cleanup after deployment.
   * Changes the working directory to the parent directory and removes the 'dist' folder.
   */
  cleanup() {
    // Remove leading and trailing slashes if they are
    const cleanBuildFolder = this.buildFolder.replace(/^\/+|\/+$/g, '');
    const deepSize = cleanBuildFolder.split('/').length;
    // 3 is length of this command "../"
    const commandLength = deepSize * 3;
    const upCommand = ''.padEnd(commandLength, '../');

    // Change the working directory to the parent directory.
    this.sh.cd(upCommand);

    // Remove the 'dist' folder.
    if (this.sh.exec('rm -R ./dist').code !== 0) {
      throw new Error('Error: remove dist failed');
    }
  }
}
