'use strict';

// had enabled by egg
// exports.static = true;
module.exports = {
    mysql: {
        enabled: true,
        package: 'egg-mysql'
    },
    cors: {
        enabled: true,
        package: 'egg-cors'
    }
}