module.exports = function () { return require("../env/" + process.env.NODE_ENV + ".env"); };
/*
let extension: string = 'js';
if(process.env.NODE_ENV == 'development') {
  extension = 'ts';
}
module.exports = () => require(`../env/${ process.env.NODE_ENV }.env.${ extension }`);
*/ 
