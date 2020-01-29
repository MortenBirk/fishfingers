# What is this

Fishfingers is a very simple (and early stage) documentation generator. It generates a simple and readable documentation from source code comments (currently a very limited subset of [JSDoc](https://github.com/jsdoc/jsdoc))

It supports writing of very simple example files, which will be run directly in the browser, kind of like [Styleguidist](https://github.com/styleguidist/react-styleguidist) but for none ui libraries.

# Installation and setup

First install fishfingers

`npm install --save-dev fishfingers`

Create a fishfingers folder with the 2 config files

```
fishfingers/
  config.js
  imported.js
```

## config.js
The config file defines where the source files are found, and where the documentation should be generated
```js
module.exports = {
  title: 'Some title',
  src: 'sourceCodeFolder/',
  output: 'documentationFolder/'
}
```

## imported.js
This file should basically import everyhing that you are importing in the examples. This is a crude hack for now, and should probably not be needed in later versions. Every import must be relative to the `root` alias, which points to the root of your project.

For instance the file could look like the following.
```js
import { x, y, z } from 'root/someFolder/someFile'
import something from 'root/anotherFile'
```

# Writing documentation
In your source code document elements with block comments.

```js
   /**
    * Functions and class methods can be documented with a description, parameters and return values
    * @param {number} b 
    * @returns {number} The number plus 5
    */
   function someFunc(b) {
    return b + 5
   }
```

```js
 /**
  * Objects can be documented with property types
  */
 const someObject = {
   /** 
    * @type {number}
    * This is the property a 
    * */
   a: 5,
   /** This is the property d */
   d: () => 'lol'
 }
```

## Examples
Examples can be added through markdown files. It is recomended to create examples in separate `.md` files next to the source code being documented

An example is just a markdown file (which currently only uses markdown for editor highlighting). The structure however has to be very strict.

Every example must start with a @id tag which is basically the name of the element to be documented. A title and description should also be added. Finally the example is added. Notice that imports are actually ignored, and must be provided in the `imported.js` config file.

Here is an example of how `someFile.md` could be documented with examples.

```
@id something
@title A good example
@desc This is a very good example
```js
import { something } from './someFile'
const x = something(10)
console.log('This is x ' + x)
```


# Example Gotchas

## This is not real MarkDown
MarkDown files are used since they allow for nice code highlighting in editors, however we currently do not parse actual markdown, and do have very specific requirements for the structure.

## Example id
It is required with an id before every example, not just before a bunch of examples.

*This can be fixed quite fast if needed*

## Imports

Multi line imports or requires will break examples

*This can be fixed quite fast*

Imports and requires are visible in all example files, but will simply be ignored in the actual code.

Instead users can provide the actual imports in the config file, such that the code can run using the imported variables.

This is done to make implementation much easier, since we can look at raw strings, and ignore any advanced parsing.

For now this is not a big problem, since only the library being documented should be imported in simple examples.

*This requires some work to fix, since we have to do proper parsing of the example code*

## No user provided webpack config
There is currently no support for custom webpack configs. Hence examples have to follow the standard of the babel configuration chosen by this project. This also means that examples should probably import previously transpiled library distributions.