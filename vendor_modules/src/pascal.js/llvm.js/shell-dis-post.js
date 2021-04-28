
  var outputFile = FS.root.contents['llvm.ll'];
  if (outputFile) {
    return intArrayToString(FS.root.contents['llvm.ll'].contents);
  } else {
    throw 'unknown error';
  }
};

