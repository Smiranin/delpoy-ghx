import deploy from '../src/deploy.js';

console.log('Heeellooo!');
/**
 * Default configuration for deployment.
 * @typedef {Object} DefaultConfig
 * @property {string} framework - Default framework ('angular' or 'custom').
 * @property {string|null} path - Default path (null if not specified).
 */
const DEFAULT_CONFIG = {
  framework: 'angular',
  path: null,
};

// Initialize the configuration object.
let config = {};

// Now support only first argumant as a path to the project folder
const projectPath = process.argv[2];

// Check if user pass the projectPath
if (projectPath) {
  // Update the configuration with a custom framework and the provided path.
  config = {
    framework: 'custom',
    path: projectPath,
  };
}

/**
 * Deploy the project with the specified configuration.
 * @param {Object} config - Configuration for deployment.
 * @param {string} config.framework - Deployment framework ('angular' or 'custom').
 * @param {string|null} config.path - Path to deploy (null if not specified).
 */
function startDeploy(config) {
  // Start the deployment using the 'deploy' function with the merged configuration.
  deploy({ ...DEFAULT_CONFIG, ...config });
  // Spread the default configuration and the custom configuration, then pass it to the 'deploy' function.
}

// Start the deployment with the generated configuration.
startDeploy(config);
