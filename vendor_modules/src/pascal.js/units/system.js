// Basic builtin routines

"use strict";

function SYSTEM (st) {
  function init() {
    var ir = [];

    ir.push(['declare i32 @printf(i8*, ...)']);
    ir.push(['declare i32 @scanf(i8*, ...)']);
    ir.push(['declare double @drand48()']);
    ir.push(['declare i32 @lrand48()']);
    ir.push(['declare void @exit(i32) noreturn nounwind']);
    ir.push(['']);
    ir.push(['%struct._IO_FILE = type { i32, i8* }']);
    ir.push(['@stdout = external global %struct._IO_FILE*']);
    ir.push(['declare i32 @fflush(%struct._IO_FILE*)']);
    ir.push(['']);
    //ir.push(['@.newline = private constant [3 x i8] c"\\0D\\0A\\00"']);
    ir.push(['@.newline = private constant [2 x i8] c"\\0A\\00"']);
    ir.push(['@.str_format = private constant [3 x i8] c"%s\\00"']);
    ir.push(['@.chr_format = private constant [3 x i8] c"%c\\00"']);
    ir.push(['@.int_format = private constant [3 x i8] c"%d\\00"']);
    ir.push(['@.float_format = private constant [4 x i8] c"% E\\00"']);

    return ir;
  }

  function stop() {
      return [];
  }

  // 
  // I/O routines
  //
  function READ(ast, cparams) {
    var ir = [];
    ir.push('  ; READ start');
    for(var i=0; i < cparams.length; i++) {
      var param = cparams[i],
          settings = st.lookup('_settings_'),
          scanf_name = settings.scanf_name,
          scanf_var_args = settings.scanf_var_args,
          pre = st.new_name('READ'),
          str = '%' + pre + 'str',
          call = '%' + pre + 'call',
          cast = '%' + pre + 'cast',
          format = null,
          flen = 3;
      switch (param.type.name) {
        case 'INTEGER':
            if (param.type.origname === 'CHARACTER') {
                format = "@.chr_format";
            } else {
                format = "@.int_format";
            }
            break;
        case 'CHARACTER':
            format = "@.chr_format";
            break;
        default:
          throw new Error("Unknown READ type: " + param.type.name);
      }
      ir.push('  ' + str + ' = getelementptr inbounds [' + flen + ' x i8]* ' +
              format + ', i32 0, i32 0');
      if (scanf_var_args) {
        ir.push('  ' + call + ' = call i32 (i8*, ...)* @' + scanf_name +
                '(i8* ' + str + ', ' + param.itype + '* ' + param.istack + ')');
      } else {
          ir.push('  ' + cast + ' = bitcast ' + param.itype + '* ' + param.istack + ' to i8*');
          ir.push('  ' + call + ' = call i32 (i8*, i8*)* @' + scanf_name +
                  '(i8* ' + str + ', i8* ' + cast + ')');
      }
    }
    ir.push('  ; READ finish');
    return ir;
  }

  function READLN(ast, cparams) {
      return READ(ast, cparams);
  }

  function WRITE(ast, cparams) {
    var ir = [];
    ir.push('  ; WRITE start');
    for(var i=0; i < cparams.length; i++) {
      var param = cparams[i],
          pitype = param.itype,
          pilocal = param.ilocal,
          pre = st.new_name('WRITE'),
          str = '%' + pre + 'str',
          sout = '%' + pre + 'sout',
          call1 = '%' + pre + 'call1',
          call2 = '%' + pre + 'call2',
          format = null,
          flen = 3;
      switch (param.type.name) {
        case 'INTEGER':
            switch (param.type.origname) {
              case 'BOOLEAN':
              case 'ENUMERATION':
                var ctype = param.type,
                    offset = st.new_name('%offset'),
                    array_idx = st.new_name('%arrayidx'),
                    str_local = st.new_name('%' + param.id + "_str");
                format = "@.str_format"; 
                ir.push('  ' + offset + ' = zext ' + param.itype + ' ' + param.ilocal + ' to i32');
                ir.push('  ' + array_idx + ' = getelementptr ' + ctype.enum_type + '* ' + ctype.enum_var + ', i32 0, i32 ' + offset);
                ir.push('  ' + str_local + ' = load i8** ' + array_idx);
                pitype = 'i8*';
                pilocal = str_local;
                break;
              case 'CHARACTER':
                format = '@.chr_format';
                break;
              default:
                format = "@.int_format";
                break;
            }
            break;
        case 'STRING':    format = "@.str_format"; break;
        case 'CHARACTER': format = "@.chr_format"; break;
        case 'REAL':
          var conv = '%' + pre + 'conv';
          ir.push('  ' + conv +
                  ' = fpext float ' + param.ilocal + ' to double');
          format = "@.float_format";
          flen = 4;
          pitype = "double";
          pilocal = conv;
          break;
        default:
          throw new Error("Unknown WRITE type: " + param.type.name);
      }
      ir.push('  ' + str + ' = getelementptr inbounds [' + flen + ' x i8]* ' +
              format + ', i32 0, i32 0');
      ir.push('  ' + call1 + ' = call i32 (i8*, ...)* @printf(i8* ' + str +
              ', ' + pitype + ' ' + pilocal + ')');
    }
    ir.push('  ' + sout + ' = load %struct._IO_FILE** @stdout');
    ir.push('  ' + call2 + ' = call i32 @fflush(%struct._IO_FILE* ' + sout + ')');
    ir.push('  ; WRITE finish');
    return ir;
  }

  function WRITELN (ast, cparams) {
    var ir = [],
        pre = st.new_name('WRITELN'),
        str = '%' + pre + 'str',
        call = '%' + pre + 'call';
    ir.push('  ; WRITELN start');
    if (cparams.length > 0) {
        ir.push.apply(ir, WRITE(ast, cparams));
    }
    ir.push.apply(ir, WRITE(ast, [{type:{name: 'STRING'},itype:'[2 x i8]*',ilocal:'@.newline'}]));
    ir.push('  ; WRITELN finish');
    return ir;
  }

  //
  // Arithmetic routines
  //

  //
  // Scalar functions
  //
  function ODD(ast, cparams) {
    var ir = [],
        id = ast.id,
        cparam = cparams[0],
        rem = st.new_name('%rem'),
        lname = st.new_name('%odd');
    ir.push('  ; ' + id + ' start');
    ir.push('  ' + rem + ' = urem ' + cparam.itype + ' ' + cparam.ilocal + ', 2');
    ir.push('  ' + lname + ' = icmp eq ' + cparam.itype + ' ' + rem + ', 1');
    ir.push('  ; ' + id + ' finish');
    ast.type = {node:'type',name:'INTEGER',origname:'BOOLEAN'};
    ast.itype = 'i1';
    ast.ilocal = lname;
    return ir;
  }

  //
  // Transfer functions
  //

  function CHAR(ast, cparams) {
    var ir = [], clen = cparams.length,
        id = ast.id,
        cparam = cparams[0],
        lname = st.new_name('%char');
    if (clen !== 1) {
      throw new Error(id + " only accepts one argument (" + clen + " given)");
    }
    ir.push('  ; ' + id + ' start');
    ir.push('  ' + lname + ' = trunc ' + cparam.itype + ' ' + cparam.ilocal + ' to i8');
    ir.push('  ; ' + id + ' finish');
    ast.type = {node:'type',name:'INTEGER',origname:'CHARACTER'};
    ast.itype = 'i8';
    ast.ilocal = lname;
    return ir;
  }

  function CHR(ast, cparams) {
    return CHAR(ast, cparams);
  }

  function ORD(ast, cparams) {
    var ir = [], clen = cparams.length,
        id = ast.id,
        cparam = cparams[0],
        ctype = cparam.type,
        lname = st.new_name('%ord'),
        lname1 = lname + '.1',
        lname2 = lname + '.2';
    if (clen !== 1) {
      throw new Error(id + " only accepts one argument (" + clen + " given)");
    }
    ir.push('  ; ' + id + ' start');
    switch (ctype.name) {
      case 'INTEGER':
        switch (ctype.origname) {
          case 'CHARACTER': // fall through
          case 'ENUMERATION':
            ir.push('  ' + lname + ' = zext i8 ' + cparam.ilocal + ' to i32');
            break;
          case 'BOOLEAN':
            ir.push('  ' + lname + ' = zext i1 ' + cparam.ilocal + ' to i32');
            break;
          default:
            lname = cparam.ilocal;
        }
        break;
      case 'CHARACTER':
        ir.push('  ' + lname + ' = zext i8 ' + cparam.ilocal + ' to i32');
        break;
      case 'STRING':
        if (cparam.val.length > 1) {
          throw new Error("Invalid type passed to ORD: " + ctype.name);
        }
        ir.push('  ' + lname1 + ' = getelementptr inbounds ' + cparam.itype + ' ' + cparam.istack + ', i32 0, i32 0');
        ir.push('  ' + lname2 + ' = load i8* ' + lname1);
        ir.push('  ' + lname + ' = sext i8 ' + lname2 + ' to i32');
        break;
      default:
        throw new Error("Invalid type passed to ORD: " + ctype.name);
    }
    ir.push('  ; ' + id + ' finish');
    ast.type = {node:'type',name:'INTEGER'};
    ast.itype = 'i32';
    ast.ilocal = lname;
    return ir;
  }

  function INTEGER(ast, cparams) {
    var ir = [], clen = cparams.length,
        cparam = cparams[0],
        lname = st.new_name('%int');
    if (clen !== 1) {
      throw new Error("INTEGER only accepts one argument (" + clen + " given)");
    }
    if (cparam.itype !== 'i32') {
        ir.push('  ' + lname + ' = zext ' + cparam.itype + ' ' + cparam.ilocal + ' to i32');
        ast.type = {node:'type',name:'INTEGER'};
        ast.itype = 'i32';
        ast.ilocal = lname;
    } else {
        throw new Error("TODO: convert " + cparam.type.name + " to INTEGER");
    }
    return ir;
  }

  //
  // String routines
  //

  function CONCAT(ast, cparams) {
    var ir = [], ir_after = [],
        clen = cparams.length,
        cparam,
        lname = st.new_name('%concat'),
        prev_tsize = st.new_name('%tsize'),
        new_tsize = st.new_name('%new_tsize');
    if (clen < 2) {
      throw new Error("CONCAT requires at least two arguments (" + clen + " given)");
    }
    ir.push('  ; CONCAT start');
    ir.push('  ' + prev_tsize + ' = add i64 0, 0');
    for (var i=0; i < cparams.length; i++) {
        cparam = cparams[i];
        if (cparam.type.name !== 'STRING' && cparam.type.origname !== 'CHARACTER') {
            throw new Error("Concat arguments must be STRINGs");
        }
        var decay = st.new_name('%decay'),
            idx1 = st.new_name('%idx'),
            idx2 = st.new_name('%idx'),
            size = st.new_name('%size'),
            tsize = st.new_name('%tsize'),
            ret = st.new_name('%ret');

        if (cparam.type.origname === 'CHARACTER') {
          ir.push('  ' + tsize + ' = add i64 1, ' + prev_tsize);
          ir.push('  ' + decay + ' = alloca i8');
          ir.push('  store i8 ' + cparam.ilocal + ', i8* ' + decay);
          size = 1;
        } else {
          ir.push('  ' + decay + ' = bitcast ' + cparam.itype + ' ' + cparam.ilocal + ' to i8*');
          ir.push('  ' + size + ' = call i64 @strlen(i8* ' + decay + ')');
          ir.push('  ' + tsize + ' = add i64 ' + size + ', ' + prev_tsize);
        }
        ir_after.push('  ' + ret + ' = call i8* @strncat(i8* ' + lname + ', i8* ' + decay + ', i64 ' + size + ')');
        prev_tsize = tsize;
    }
    ir.push('  ' + new_tsize + ' = add i64 ' + prev_tsize + ', 1');
    ir.push('  ' + lname + ' = call i8* @malloc(i64 ' + new_tsize + ')');
    ir.push('  store i8 0, i8* ' + lname);
    ir.push.apply(ir, ir_after);
    ir.push('  ; CONCAT finish');
    ast.type = {node:'type',name:'STRING'};
    ast.itype = 'i8*';
    ast.ilocal = lname;
    return ir;
  }

  //
  // Heap routines
  //

  //
  // Miscellaneous routines
  //

  function HALT(ast, cparams) {
    var ir = [], clen = cparams.length,
        cparam = cparams[0],
        lname = st.new_name('%char');
    if (clen !== 1) {
      throw new Error("HALT only accepts one argument (" + clen + " given)");
    }
    ir.push('  ; HALT start');
    ir.push('  call void @exit(' + cparam.itype + ' ' + cparam.ilocal + ') noreturn nounwind');
    ir.push('  unreachable');
    ir.push('  ; HALT finish');
    return ir;
  }

  function RANDOM(ast, cparams) {
    var ir = [],
        clen = cparams.length, cparam,
        pre = st.new_name('RANDOM'),
        call = '%' + pre + 'call',
        conv = '%' + pre + 'conv';

    ir.push('  ; RANDOM start');
    if (clen === 0) {
        // Return a random Real 0 <= x < 1
        ir.push('  ' + call + ' = call double @drand48()');
        ir.push('  ' + conv + ' = fptrunc double ' + call + ' to float');
        ast.type = {node:'type',name:'REAL'};
        ast.itype = 'float';
        ast.ilocal = conv;
    } else if (clen === 1) {
        // Return a random Integer 0 <= x < Num
        cparam = cparams[0];
        ir.push('  ' + call + ' = call i32 @lrand48()');
        ir.push('  ' + conv + ' = urem i32 ' + call + ', ' + cparam.ilocal);
        ast.type = {node:'type',name:'INTEGER',origname:'INTEGER'};
        ast.itype = 'i32';
        ast.ilocal = conv;
    } else {
      throw new Error("Random only accepts one or zero arguments (" + clen + " given)");
    }
    ir.push('  ; RANDOM finish');
    return ir;
  }

  // Symbol table initialization
  var settings = st.lookup('_settings_');

  // set default scanf function
  if (!settings.scanf_name) {
      settings.scanf_name = 'scanf';
      settings.scanf_var_args = true;
      st.insert('_settings_', settings);
  }

  function pins(nm, efn, fps, rtyp) {
      st.unit_pinsert(nm, efn, fps, rtyp);
  }
 
  // I/O routines
  pins('READ', READ,
       [{type:{node:'type',name:'varargs'},var:true}]);
  pins('READLN', READLN,
       [{type:{node:'type',name:'varargs'},var:true}]);
  pins('WRITE', WRITE,
       [{type:{node:'type',name:'varargs'}}]);
  pins('WRITELN', WRITELN,
       [{type:{node:'type',name:'varargs'}}]);
  // Scalar functions
  pins('ODD', ODD,
       [{type:{node:'type',name:'INTEGER'}}],
       {node:'type',name:'BOOLEAN'});
  // Transfer functions
  pins('CHAR', CHAR,
       [{type:{node:'type',name:'INTEGER'}}],
       {node:'type',name:'CHARACTER'});
  pins('CHR', CHR,
       [{type:{node:'type',name:'INTEGER'}}],
       {node:'type',name:'CHARACTER'});
  pins('ORD', ORD,
       [{type:{node:'type',name:'any'}}],
       {node:'type',name:'INTEGER'});
  pins('INTEGER', INTEGER,
       [{type:{node:'type',name:'multiple',names:['INTEGER', 'CHARACTER']}}],
       {node:'type',name:'INTEGER'});
  // String routines
  pins('CONCAT', CONCAT,
       [{type:{node:'type',name:'multiple',names:['STRING','CHARACTER']}},
        {type:{node:'type',name:'multiple',names:['STRING','CHARACTER']}},
        {type:{node:'type',name:'varargs'}}],
       {node:'type',name:'STRING'});
  // Miscellaneous routines
  pins('HALT', HALT,
       [{type:{node:'type',name:'INTEGER'}}]);
  pins('RANDOM', RANDOM,
       [{type:{node:'type',name:'varargs'}}],
       {node:'type',name:'any'});

  return {init: init, stop: stop};
};

if (typeof module !== 'undefined') {
    exports.SYSTEM = SYSTEM;
} else {
    SYSTEM;
}
