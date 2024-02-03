#!/usr/bin/env node
const sh = require('shelljs');
const chalk = import('chalk');

if (!sh.which('git')) {
  sh.echo('Sorry, this script requires git');
  sh.exit(1);
}

let repos = sh.exec('git remote get-url origin').stdout.trim();
let reposArrPath = repos.split('/');
let length = reposArrPath.length;
let projectName = reposArrPath[length - 1].split('.')[0];

let dirtyUsername = reposArrPath[reposArrPath.length - 2].split(':');
let username = dirtyUsername[dirtyUsername.length - 1];
// Now for angular only
let buildFolder = `dist/${projectName}/browser/`;

if (!repos) {
  sh.echo('Remote url not found');
  sh.exit(1);
}

if (sh.exec('npm run ng build --prodaction').code !== 0) {
  sh.echo('Error: Build error');
  sh.exit(1);
}

sh.cd(buildFolder);

sh.sed('-i', `<base href="/">`, `<base href="">`, 'index.html');

if (sh.exec('cp ./index.html ./404.html').code !== 0) {
  sh.echo('Error: create 404.html failed');

  sh.exit(1);
}

if (sh.exec('git init').code !== 0) {
  sh.echo('Error: git init failed');
}

if (sh.exec('git remote add upstream "' + repos + '"').code !== 0) {
  sh.echo('Error: Git repos add remote failed');
}

if (sh.exec('git fetch upstream').code !== 0) {
  sh.echo('Error: Git repos add remote');
}

sh.exec('git push upstream --delete gh-pages');

if (sh.exec('git add -A .').code !== 0) {
  sh.echo('Error: Git add failed');
}

if (sh.exec('git commit -m "deploy project"').code !== 0) {
  sh.echo('Error: Git commit failed');
}

if (sh.exec('git push -q upstream HEAD:gh-pages').code !== 0) {
  sh.echo('Error: Git push failed');
}

sh.cd('../');

if (sh.exec('rm -R ./dist').code !== 0) {
  sh.echo('Error: remove dist failed');
}

console.log(chalk.green('Deployment success!'));
console.log(chalk.blue('https://' + username + '.github.io' + projectName));
