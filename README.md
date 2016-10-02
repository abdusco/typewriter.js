# typewriter.js

+ Pure vanilla JS, no external dependencies
+ Less than 2KB minified, less than 1KB minified & gzipped
+ Utilizes ES6 Promises, and requestAnimationFrame for greater performance (you may need to provide polyfill)

## Demo

[Here](https://rawgit.com/abdusco/typewriter.js/master/demo/index.html)

## Usage
``` js
// selector can be a:
//     selector string: ".my-class" or "[data-typewriter]" etc.
//     single or multiple element 

typewriter(<"selector"|Node|NodeList> [, options]);
```

### HTML
``` html
<body>
...
<p>Lorem ipsum dolor sit amet <span class="js-typewriter" data-words="Lorem|ipsum|dolor|quis|sunt">watch me</span> suscipit voluptate.
...
<script src="typewriter.js"></script>
</body>
```
### JS
``` js
typewriter('.js-typewriter');
```

## Default options
``` js
{
    data: 'typewriter', // data attribute to source the words
    delimiter: ',', // separator between the words
    waitFirst: 3000, // delay before starting effect
    waitBefore: 100, // delay before typing the next word
    waitAfter: 1000, // delay after typing the word 
    delay: 100 // delay between keystrokes
}
```