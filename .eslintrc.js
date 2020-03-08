module.exports = {
    "extends": [
        "eslint:recommended",
    ],
    "env": {
        "es6": true,
        // your environment, node and/or browser:    
        "node": true,
        "browser": true
    },
    "parser": "babel-eslint",
    "globals": {
        "p5": "readonly",
        "P$": "writable"
    }
};
