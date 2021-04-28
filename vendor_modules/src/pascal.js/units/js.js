// CRT library implemented using VT100 escape sequences
// http://ascii-table.com/ansi-escape-sequences-vt-100.php

"use strict";

function JS (st) {

  function init() {
    var ir = [];
    ir.push(['declare void @emscripten_run_script(i8*)']);
    ir.push('');
    return ir;
  }

  function stop(ast, cparams) {
    return [];
  }

  function JS (ast, cparams) {
    var ir = [],
        cparam = cparams[0],
        str = st.new_name('%str');
    ir.push('  ; JS start');
    ir.push('  ' + str + ' = getelementptr inbounds ' + cparam.itype + ' ' + cparam.istack + ', i32 0, i32 0');
    ir.push('  call void (i8*)* @emscripten_run_script(i8* ' + str + ')');
    ir.push('  ; JS finish');
    return ir;
  }

  function SETINTERVAL(ast, cparams) {
    var ir = [],
        pptr = cparams[0],
        interval = cparams[1],
        pdecl = st.lookup(pptr.id),
        pdstr, pditype, pdlen,
        pstr = st.new_name('@proc_string'),
        str = st.new_name('%str');
    // TODO: check that interval is INTEGER literal 
    ir.push('  ; SETINTERVAL start');
    pdstr = "setInterval(Module.cwrap(\'" + pdecl.name + "\', \'void\', []), " + interval.val + ")\\00";
    pdlen = pdstr.length-2; // for the escaped null terminator
    pditype = '[' + pdlen + ' x i8]'
    ir.push([pstr + ' = private constant ' + pditype + ' c"' + pdstr + '"']);
    ir.push('  ' + str + ' = getelementptr inbounds ' + pditype + '* ' + pstr + ', i32 0, i32 0');
    ir.push('  call void (i8*)* @emscripten_run_script(i8* ' + str + ')');
    ir.push('  ; SETINTERVAL finish');
    return ir;
  }

  function pins(nm, efn, fps, rtyp) {
      st.unit_pinsert(nm, efn, fps, rtyp);
  }

  pins('JS', JS,
       [{type:{node:'type',name:'STRING'}}]);
  pins('SETINTERVAL', SETINTERVAL,
       [{type:{node:'type',name:'POINTER'}},
        {type:{node:'type',name:'INTEGER'}}]);

  return {init: init, stop: stop};
};

if (typeof module !== 'undefined') {
    exports.JS = JS;
} else {
    JS;
}
