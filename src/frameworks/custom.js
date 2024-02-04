import BaseDeploy from './base.js';

/**
 * Class for deploying custom projects, extending the BaseDeploy class.
 */
export default class CustomDeploy extends BaseDeploy {
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
}
