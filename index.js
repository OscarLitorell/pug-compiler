#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const pug = require("pug")
const glob = require("glob")
const minimatch = require("minimatch")


class PugConfig {
    patterns = ["**/*.pug"]
    ignore = ["templates/*"]
    root = "./"
    out = "./html"
    empty = false
}


function main() {
    let fp = process.argv[2] || "./"

    if (!fs.existsSync(fp)) {
        return 0
    }

    let dirPath = path.dirname(fp)
    process.chdir(dirPath)

    let config

    if (fs.lstatSync(fp).isDirectory()) {
        // A directory has been specified.
        if (fs.existsSync("pug-config.json")) {
            // A pug-config.json file exists at the specified directory.
            let jsonText = fs.readFileSync("pug-config.json", "utf-8")
            config = JSON.parse(jsonText)
        } else {
            // Use the default pug config in the directory.
            config = {}
        }
    } else {
        // Use the specified pug config.
        let jsonText = fs.readFileSync(fp, "utf-8")
        config = JSON.parse(jsonText)
    }

    config = Object.assign(new PugConfig, config)

    let root = process.cwd()

    process.chdir(config.root)

    let filesArray = config.patterns.map(pattern => glob.sync(pattern)).flat()
    filesArray = filesArray.filter(file => !config.ignore.reduce((ignored, pattern) => ignored || minimatch(file, pattern), false))
    let fileSet = new Set(filesArray)


    let htmlFiles = {}

    fileSet.forEach(pugFile => {
        let htmlFile = path.join(path.dirname(pugFile), path.basename(pugFile, ".pug") + ".html")
        htmlFiles[htmlFile] = pug.renderFile(pugFile, { basedir: "./" })
    })

    process.chdir(root)
    if (!fs.existsSync(config.out)) fs.mkdirSync(config.out)

    process.chdir(config.out)

    Object.keys(htmlFiles).forEach(file => {
        let dir = path.dirname(file)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir)
        fs.writeFileSync(file, htmlFiles[file])
    })
}

main()