/**
 * Created by hospogh on 6/25/17.
 */
'use strict';
function guid4() {
    return Math.random().toString(16).substr(2, 4);
}
exports.createGUID = function () {
    return guid4() + guid4() + '-' + guid4() + '-' + guid4() + '-' + guid4() + '-' + guid4() + guid4() + guid4();
};
