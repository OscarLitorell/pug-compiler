# pug-compiler

pug-compiler is used to simplify the creation of static web pages. It compiles websites written in pug to html, with all the features of pug such as templates and mixins.

## Installation
To install pug-compiler globally, enter `npm install -g` in the terminal from the pug-compiler directory.

## Usage
The most basic way to use pug-compiler is to simply enter `pug-compiler` into the terminal from the root directory of your pug file structure.

You can also select your root directory manually by entering `pug-compiler path/to/root/directory`.

### pug-config
When running the program, pug-compiler will automatically look for a file named `pug-config.json` in the root directory. This file can contain options for the compilation process, such as what files to ignore. When there is no `pug-config.json` file present, the default settings will be used:
```json
{
    "patterns": ["**/*.pug"],
    "ignore": ["templates/*"],
    "root": "./",
    "out": "./html",
    "empty": false
}
```
Options:
* `patterns` - What files to compile. An array of globs.
* `ignore` - What files to ignore. An array of globs. The default value of `templates/*` allows you to put things like template files and mixins in the `templates` folder, where they will not be compiled but still available for use in other pug files.
* `root` - The root directory where the pug files are. It is also the root for your pug files when referring to other pug templates and mixins.
* `out` - Where to put the compiled html files.
* `empty` - Whether or not to empty the out directory before compiling the pug files.

It is also possible to manually select your pug-config by entering `pug-config path/to/your/config.json`. The root directory will be the same directory as the config file.

## Examples

File structure:
```
project
├──pug-config.json
└──pug-files
   ├──index.pug
   └──templates
      └──layout.pug
```
### Files
#### pug-config.json
```json
{
    "root": "pug-files",
    "out": "html-files"
}
```

#### pug-files/index.pug
```pug
extends /templates/layout

block title
    title A title for the page

block content
    h1 hello world
```

#### pug-files/templates/layout.pug
```pug
<!DOCTYPE html>
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        block title
    body
        block content
```

### After compilation
File structure:
```
project
├──pug-config.json
├──pug-files
│  ├──index.pug
│  └──templates
│     └──layout.pug
└──html-files
   └──index.html
```
#### html-files/index.html
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>A title for the page</title>
    </head>
    <body>
        <h1>hello world</h1>
    </body>
</html>
```

