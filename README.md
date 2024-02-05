# Deploy-GHX

Deploy-GHX is a streamlined and powerful tool designed for effortlessly deploying web applications to GitHub Pages. Whether you have a static site or a single-page application, Deploy-GHX simplifies the deployment process, making it quick and hassle-free.

## Features

- **Effortless Deployment:** Deploy your app to GitHub Pages with a single command.

- **Flexible Configuration:** Customize deployment options to fit your project's needs.

## Installation

Install Deploy-GHX locally using npm:

```bash

npm  install  deploy-ghx  -D

```

## Usage

**By default, this command assumes that you have an Angular application. It will build the Angular project, update the necessary files for deployment, and deploy it to GitHub Pages.**

##### Package.json Command:

Add the following command to your `package.json` file:

```
"scripts": {
  "deploy-ghx": "node_modules/.bin/deploy-ghx"
}
```

With this setup, run the deployment command using:

```
    npm run deploy-ghx
```

Alternatively, you can use the direct command:

```
    node node_modules/.bin/deploy-ghx
```

### Custom App Deployment

You can publish any application by specifying the path to your dist folder as an argument.

```
node node_modules/.bin/deploy-ghx path/to/app
```

Replace `path/to/dist` with the actual path to your dist folder, allowing you to deploy a custom app to GitHub Pages.

### Custom Deployment Logic

If the standard deployment logic does not meet your requirements, you have the option to fork this repository and add the desired logic.

Follow these steps to create a custom deployment class for a specific framework:

1. Fork this repository.

2. Create a new class in the `src/frameworks/` directory, adding the logic for your specific framework, similar to how it's done for Angular.

3. Customize the deployment process according to the requirements of your framework.

4. Use the new deployment class in your deployment scripts or configurations.

This approach allows you to extend Deploy-GHX with custom deployment logic tailored to the specific needs of your application or framework.

## License

This project is licensed under the MIT License.
