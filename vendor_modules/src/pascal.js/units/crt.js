// CRT library implemented using VT100 escape sequences
// http://ascii-table.com/ansi-escape-sequences-vt-100.php

"use strict";

function CRT (st) {
  var kbd = require("./kbd.js");

  function init() {
    var ir = [],
        call = st.new_name("%call");

    ir.push(['declare i32 @usleep(i32)']);
    ir.push(['@.vt100.movevh = private constant [9 x i8] c"\\1B[%d;%dH\\00"']);
    ir.push(['@.vt100.clearscreen = private constant [5 x i8] c"\\1B[2J\\00"']);
    ir.push(['']);
    ir.push(['; kbd.c start']);
    ir.push([kbd.llvm_ir.join("\n")]);
    ir.push(['; kbd.c finish']);
    ir.push(['']);

    ir.push('  ' + call + ' = call %struct.termios* @termios_raw()');
    return ir;
  }

  function stop(ast, cparams) {
    return [];
  }

  function CRTINIT(ast, cparams) {
    // no-op
    return ir;
  }

  function CRTEXIT(ast, cparams) {
    // no-op
    return [];
  }

  function CLRSCR (ast, cparams) {
    var ir = [],
        str = st.new_name('%str'),
        call = st.new_name('%call');
    ir.push('  ; CLRSCR start');
    ir.push('  ' + str + ' = getelementptr inbounds [5 x i8]* @.vt100.clearscreen, i32 0, i32 0');
    ir.push('  ' + call + ' = call i32 (i8*, ...)* @printf(i8* ' + str + ')');
    ir.push('  ; CLRSCR finish');
    return ir;
  }

  function DELAY (ast, cparams) {
    var ir = [], clen = cparams.length,
        param = cparams[0],
        ms = st.new_name("%ms"),
        call = st.new_name("%call");
    if (clen !== 1) {
      throw new Error("Delay only accepts one argument (" + clen + " given)");
    }
    ir.push('  ; DELAY start');
    ir.push('  ' + ms + ' = mul ' + param.itype + ' 1000, ' + param.ilocal);
    ir.push('  ' + call + ' = call i32 @usleep(i32 ' + ms + ')');
    ir.push('  ; DELAY finish');
    return ir;
  }

  function GOTOXY (ast, cparams) {
    var ir = [],
        clen = cparams.length, x, y,
        str = st.new_name('%str'),
        call = st.new_name('%call');
    if (clen !== 2) {
      throw new Error("GOTOXY accepts exactly 2 arguments (" + clen + " given)");
    }
    x = cparams[0];
    y = cparams[1];
    // TODO: check that crtinit has been called first
    ir.push('  ; GOTOXY start');
    ir.push('  ' + str + ' = getelementptr inbounds [9 x i8]* @.vt100.movevh, i32 0, i32 0');
    ir.push('  ' + call + ' = call i32 (i8*, ...)* @printf(i8* ' + str +
            ', i32 ' + y.ilocal + ', i32 ' + x.ilocal + ')');
    ir.push('  ; GOTOXY finish');
    return ir;
  }

  function KEYPRESSED(ast, cparams) {
    var ir = [],
        call = st.new_name('%call'),
        res = st.new_name('%res');

    ir.push('  ; KEYPRESSED start');
    ir.push('  ' + call + ' = call i32 @kbd_pending()');
    ir.push('  ' + res + ' = icmp sgt i32 ' + call + ', 0');
    ast.type = {node:'type',name:'BOOLEAN'};
    ast.itype = "i1";
    ast.ilocal = res;
    ir.push('  ; KEYPRESSED finish');
    return ir;
  }

  function READKEY(ast, cparams) {
    var ir = [],
        call = st.new_name('%call'),
        res = st.new_name('%res');

    ir.push('  ; READKEY start');
    ir.push('  ' + call + ' = call i32 @readkey()');
    ir.push('  ' + res + ' = trunc i32 ' + call + ' to i8');
    ast.type = {node:'type',name:'INTEGER',origname:'CHARACTER'};
    ast.itype = "i8";
    ast.ilocal = res;
    ir.push('  ; READKEY finish');
    return ir;
  }

  function SOUND(ast, cparams) {
    return [];
  }
  
  function NOSOUND(ast, cparams) {
    return [];
  }

  // Symbol table initialization
  var settings = st.lookup('_settings_');

  // use scanf that works with raw termios mode
  settings.scanf_name = 'raw_scanf';
  settings.scanf_var_args = false;
  st.insert('_settings_', settings);

  function pins(nm, efn, fps, rtyp) {
      st.unit_pinsert(nm, efn, fps, rtyp);
  }

  pins('CRTINIT', CRTINIT,
       []);
  pins('CRTEXIT', CRTEXIT,
       []);
  pins('CLRSCR',CLRSCR,
       []);
  pins('DELAY',DELAY,
       [{type:{node:'type',name:'INTEGER'}}]);
  pins('GOTOXY',GOTOXY,
       [{type:{node:'type',name:'INTEGER'}},
        {type:{node:'type',name:'INTEGER'}}]);
  pins('KEYPRESSED', KEYPRESSED,
       [],
       {node:'type',name:'BOOLEAN'});
  pins('READKEY', READKEY,
       [],
       {node:'type',name:'CHARACTER'});
  pins('SOUND', SOUND,
       [{node:'type',name:'INTEGER'}]);
  pins('NOSOUND', NOSOUND,
       []);

  return {init: init, stop: stop};
};

exports.CRT = CRT;
