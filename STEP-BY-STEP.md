# Step by step

This guide describes all the steps necessary to recreate the state of the project.

* Check installed versions of NodeJS and npm

```
$ node -v
v12.13.1
```
```
$ npm -v
6.12.1
```

* Install latest version of Angular CLI

```
$ npm install -g @angular/cli
+ @angular/cli@10.0.1
```

* Initialize project

```
ng new amphibian7 --service-worker
```

* Enable PWA support

```
ng add @angular/pwa
```

* Enable Material support

```
ng add @angular/material
```

* Add submodule for Material design icons

```
git submodule add git@github.com:florianschwanz/material-design-icons.git src/assets/material-design-icons
```

* Enable Electron support

```
npm install --save-dev electron
npm install --save-dev electron-builder
npm install --save-dev electron-packager
npm install --save-dev @types/node
```

* Enable Cordova support

```
npm install --save-dev cordova
```
