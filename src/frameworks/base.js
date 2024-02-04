export default class BaseDeploy {
  constructor(params) {
    this.sh = params.sh;
  }

  init() {
    if (!this.sh.which('git')) {
      this.sh.echo('Sorry, this script requires git');
      this.sh.exit(1);
    }

    this.repos = this.sh.exec('git remote get-url origin').stdout.trim();
    let reposArrPath = this.repos.split('/');
    let length = reposArrPath.length;
    this.projectName = reposArrPath[length - 1].split('.')[0];

    let dirtyUsername = reposArrPath[reposArrPath.length - 2].split(':');
    this.username = dirtyUsername[dirtyUsername.length - 1];

    if (!this.repos) {
      this.sh.echo('Remote url not found');
      this.sh.exit(1);
    }
  }

  publish() {
    // On this step we already inside dist folder
    if (this.sh.exec('git init').code !== 0) {
      this.sh.echo('Error: git init failed');
    }

    if (this.sh.exec(`git remote add upstream "this.repos"`).code !== 0) {
      this.sh.echo('Error: Git repos add remote failed');
    }

    if (this.sh.exec('git fetch upstream').code !== 0) {
      this.sh.echo('Error: Git repos add remote');
    }

    this.sh.exec('git push upstream --delete gh-pages');

    if (this.sh.exec('git add -A .').code !== 0) {
      this.sh.echo('Error: Git add failed');
    }

    if (this.sh.exec('git commit -m "deploy project"').code !== 0) {
      this.sh.echo('Error: Git commit failed');
    }

    if (this.sh.exec('git push -q upstream HEAD:gh-pages').code !== 0) {
      this.sh.echo('Error: Git push failed');
    }
  }

  cleanup() {
    this.sh.cd('../');

    if (this.sh.exec('rm -R ./dist').code !== 0) {
      this.sh.echo('Error: remove dist failed');
    }
  }
}
