
var llvmDis = function(bitcode) {
  var Module = {
    arguments: ['llvm.bc'],
    preRun: function() {
      FS.createDataFile('/', 'llvm.bc', bitcode, true, false);
    }
  };

