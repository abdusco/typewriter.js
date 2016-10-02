/**
 * Created by Abdus on 2.10.2016.
 */
"use strict";

/**
 * Created by Abdus on 2.10.2016.
 */
(function (global) {
    "use strict";

    function typewriter(typeables, options) {

        function extend(from, to) {
            Object.keys(from).forEach(function (k) {
                if (!k in to) return;
                to[k] = from[k];
            });
            return to;
        }

        function typeLetters(el, word, delay) {
            return new Promise(function (resolve, reject) {
                var i = 0;
                var max = word.length - 1;

                var id = setInterval(function () {
                    var rafid = requestAnimationFrame(function () {
                        el.innerHTML += word[i++];
                        cancelAnimationFrame(rafid);
                    });
                    if (i >= max) {
                        clearInterval(id);
                        resolve(el);
                    }
                }, delay);
            });
        }

        function deleteLetters(el, delay) {
            return new Promise(function (resolve, reject) {
                var content = el.innerHTML;
                // start from the last letter
                var nextLength = content.length - 1;

                var id = setInterval(function () {
                    var rafId = requestAnimationFrame(function () {
                        el.innerHTML = content.substring(0, nextLength--);
                        cancelAnimationFrame(rafId);
                    });
                    if (nextLength < 0) {
                        clearInterval(id);
                        resolve(el);
                    }
                }, delay);
            });
        }

        function advanceWord(typee) {
            var id = setTimeout(function () {
                    // get next word
                    typee.current = (typee.current + 1) % typee.words.length;
                    var next = typee.words[typee.current];

                    // animate
                    deleteLetters(typee, options.delay).then(function (el) {
                        return typeLetters(typee, next, options.delay);
                    }).then(function () {
                        clearTimeout(id);
                        // wait before typing the next word
                        setTimeout(advanceWord(typee), options.waitBefore);
                    });
                },
                // wait before deleting the word
                options.waitAfter);
        }

        function typeWords(typee, wait) {
            typee.words = typee.dataset[options.data].split(options.delimiter);
            if (!typee.words.length) return;

            typee.current = -1;
            // wait before initializing sequence
            setTimeout(function () {
                advanceWord(typee);
            }, options.waitFirst);
        }

        function init() {
            // ensure we have element array
            if (!typeables.toString() !== "[object NodeList]") {
                if (typeof typeables === 'string') {
                    typeables = document.querySelectorAll(typeables);
                }
                // check if single element is passed
                else if (typeables.toString() === "[object HTMLBodyElement]") {
                    typeables = [typeables];
                } else {
                    throw new Error('Please provide a valid selector or element');
                }
            }

            var DEFAULTS = {
                data: 'typewriter', // data attribute to source the words
                delimiter: ',', // separator between the words
                waitFirst: 3000, // delay before starting effect
                waitBefore: 100, // delay before typing the next word
                waitAfter: 1000, // delay after typing the word
                delay: 100 // delay between keystrokes
            };
            options = extend(options || {}, DEFAULTS);

            [].slice.call(typeables).forEach(function (typee) {
                return typeWords(typee, options.waitAfter);
            });
        }

        init();
    }

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return typewriter;
        });
    }
    // CommonJS and Node.js module support.
    else if (typeof exports !== 'undefined') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = typewriter;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.typewriter = typewriter;
    } else {
        global.typewriter = typewriter;
    }
})(this);