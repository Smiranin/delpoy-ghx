import BaseDeploy from './base.js';

export default class DeployAngularApp extends BaseDeploy {
  constructor(params) {
    super(params);
  }

  init() {
    super.init();
    this.buildFolder = `dist/${this.projectName}/browser/`;
  }

  prepareFilesToDeploy() {
    if (this.sh.exec('npm run ng build --prodaction').code !== 0) {
      this.sh.echo('Error: Build error');
      this.sh.exit(1);
    }

    this.sh.cd(this.buildFolder);

    this.sh.sed('-i', `<base href="/">`, `<base href="">`, 'index.html');

    if (this.sh.exec('cp ./index.html ./404.html').code !== 0) {
      this.sh.echo('Error: create 404.html failed');
      this.sh.exit(1);
    }
  }
}
