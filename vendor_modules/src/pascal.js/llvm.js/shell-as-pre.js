
var llvmAs = function(assembly) {
  var errorMessage = '';

  var Module = {
    arguments: ['llvm.ll'],
    preRun: function() {
      FS.createDataFile('/', 'llvm.ll', intArrayFromString(assembly), true, false);
    },
    stderr: function(chr) {
      if (chr) errorMessage += String.fromCharCode(chr);
    }
  };

