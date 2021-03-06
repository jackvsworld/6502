/*
  6502id.js
  MOS 6502 Instruction Decoder
*/

var microprogram = {
  length: 128, /* total number of microinstructions */
  width: 3     /* size of each microinstruction in bytes */
};

function writeLog(message) {
  console.log(message);
}

function base2(val, bits) {
  var str = (+val).toString(2);
  return new Array((1 + bits) - str.length).join('0') + str;
}

(function (f, image, pla, undefined) {
  var anchor = window.document.createElement('a');
  var g = function (debug, table, opcode) {
    var x = opcode.split('').reduce(function (a, b, i) {
      return a + (table[b] << (7 - i));
    }, 0);
    writeLog(base2(x, 8) + ' = ' + debug + '(' + opcode + ')');
    return x;
  };
  
  var bytes = new Uint8Array(image);
  
  anchor.href = window.URL.createObjectURL(
    new Blob(
      [f(bytes,
        pla,
        g.bind(undefined, ' IR', { '0': 0, '1': 1, 'X': 0 }),
        g.bind(undefined, '/IR', { '0': 1, '1': 0, 'X': 0 }),
        function (tcstate) {
          var x = ({
            'A': 0x20,
            'B': 0x10,
            'C': 0x08,
            'D': 0x04,
            'E': 0x02,
            'F': 0x01,
            'X': 0x00
          })[tcstate];
          writeLog('  ' + base2(x, 6) + ' =  TC(' + tcstate + ')');
          writeLog('  ' + base2(~x & 0x3f, 6) + ' = /TC(' + tcstate + ')');
          return x;
        }
      )], { type: 'application/octet-stream' }
    )
  );
  writeLog(bytes.length);
  anchor.download = '6502PLA';
  anchor.textContent = 'download binary image of instruction decoder';
  document.body.appendChild(anchor);
}) (
function (array, pla, ir, notir, tcstate) {
  var w = microprogram.width;
  for (var i = 0; i < plaLines; ++i) (function (array, pla, i) {
    array[w*i + 2] = notir(pla[i][1]);
    array[w*i + 1] = ir(pla[i][1]);
    array[w*i + 0] = tcstate(pla[i][0]);
    /* array[4*i + 0] = i; */
  }) (array, pla, i);
  return array;
}, new ArrayBuffer(microprogram.width*microprogram.length), [ 
[/*  2*/'X',  '100xx1x0' ],
[/*  3*/'D',	'xxx100x1' ],
[/*  4*/'C',	'xxx110x1' ],
[/*  5*/'A',	'1x0010xx' ],
[/*  6*/'A',	'100110x0' ],
[/*  7*/'A',	'1100xxx0' ],
[/*  8*/'C',	'xxx1x1xx' ],
[/*  9*/'X',	'10xxxxx0' ],
[/* 10*/'C',	'xxxx00xx' ],
[/* 11*/'A',	'1000101x' ],
[/* 12*/'A',	'1100101x' ],
[/* 13*/'A',	'1110xxx0' ],
[/* 14*/'X',	'100xxx1x' ],
[/* 15*/'A',	'1001101x' ],
[/* 16*/'A',	'101xxx1x' ],
[/* 17*/'B',	'1100101x' ],
[/* 18*/'B',	'111010x0' ],
[/* 19*/'A',	'1011101x' ],
[/* 20*/'B',	'1x0010x0' ],
[/* 21*/'A',	'101xx1x0' ],
[/* 22*/'A',	'1010xxx0' ],
/*[*//* 23*//*'X',	'xxxxxxxx' ],*/
[/* 24*/'A',	'001000x0' ],
[/* 25*/'F',	'000000x0' ],
[/* 26*/'A',	'0x0010x0' ],
[/* 27*/'E',	'011000x0' ],
[/* 28*/'D',	'0x1010x0' ],
[/* 29*/'F',	'010000x0' ],
[/* 30*/'X',	'011xxx1x' ],
/*[*//* 31*//*'C',	'xxxxxxxx' ],*/
[/* 32*/'A',	'010xxxx1' ],
[/* 33*/'X',	'01x011x0' ],
[/* 34*/'C',	'xxx011xx' ],
[/* 35*/'A',	'000xxxx1' ],
[/* 36*/'C',	'xxxx0xxx' ],
[/* 37*/'A',	'xxxxxxxx' ],
[/* 38*/'C',	'0xx0x0x0' ],
[/* 39*/'D',	'0xx0xxx0' ],
[/* 40*/'E',	'00x000x0' ],
[/* 41*/'E',	'010000x0' ],
[/* 42*/'D',	'xxx000x1' ],
[/* 43*/'E',	'000100x1' ],
[/* 44*/'C',	'000100x1' ],
[/* 45*/'D',	'00011xxx' ],
[/* 46*/'X',	'0x1010x0' ],
[/* 47*/'X',	'111xxx1x' ],
[/* 48*/'E',	'xxx000x1' ],
[/* 49*/'D',	'xxx100x1' ],
[/* 50*/'X',	'01x000x0' ],
[/* 51*/'C',	'001000x0' ],
[/* 52*/'A',	'11x0xxx0' ],
[/* 53*/'A',	'110xxxx1' ],
[/* 54*/'A',	'111xxxx1' ],
[/* 55*/'A',	'x11xxxx1' ],
[/* 56*/'X',	'001xxx1x' ],
[/* 57*/'D',	'01x011x0' ],
[/* 58*/'X',	'00xxxx1x' ],
[/* 59*/'F',	'001000x0' ],
[/* 60*/'C',	'0xx0x0x0' ],
[/* 61*/'A',	'100110x0' ],
[/* 62*/'B',	'0xxxxxx1' ],
[/* 63*/'B',	'x11xxxx1' ],
[/* 64*/'B',	'0xx0101x' ],
[/* 65*/'A',	'1000101x' ],
[/* 66*/'A',	'011010x0' ],
[/* 67*/'A',	'101xxxx1' ],
[/* 68*/'A',	'xxxxxxx1' ],
[/* 69*/'A',	'101010x0' ],
[/* 70*/'A',	'0xx0101x' ],
[/* 71*/'A',	'1010101x' ],
[/* 72*/'A',	'0010x1x0' ],
[/* 73*/'A',	'x01xxxxx' ],
[/* 74*/'E',	'xxx11xxx' ],
[/* 75*/'F',	'xxx100x1' ],
[/* 76*/'A',	'xxx100x0' ],
[/* 77*/'X',	'010010x0' ],
[/* 78*/'A',	'01x0101x' ],
[/* 79*/'X',	'01xxxx1x' ],
[/* 80*/'C',	'000000x0' ],
[/* 81*/'D',	'001000x0' ],
[/* 82*/'X',	'100xxxx1' ],
[/* 83*/'C',	'xxx100x0' ],
[/* 84*/'C',	'xxxx01xx' ],
/*[*//* 85*//*'X',	'xxxxxxxx' ],*/
[/* 86*/'X',	'xxx1xxxx' ],
[/* 87*/'C',	'xxx100x1' ],
[/* 88*/'C',	'xxx11xxx' ],
[/* 89*/'F',	'011000x0' ],
/*[*//* 90*//*'E',	'xxxxxxxx' ],*/
/*[*//* 91*//*'D',	'xxxxxxxx' ],*/
[/* 92*/'A',	'0x0000x0' ],
[/* 93*/'A',	'01x011x0' ],
[/* 94*/'F',	'xxx000xx' ],
[/* 95*/'D',	'xxxx1xxx' ],
[/* 96*/'E',	'xxxx00xx' ],
[/* 97*/'D',	'xxxx1xxx' ],
[/* 98*/'D',	'xxxx0xx0' ],
[/* 99*/'X',	'0x000xx0' ],
[/*100*/'X',	'00100xx0' ],
[/*101*/'X',	'01x011x0' ],
/*[*//*102*//*'X',	'xxxxxxxx' ],*/
[/*103*/'X',	'0xx010x0' ],
[/*104*/'X',	'x00xxxxx' ],
[/*105*/'E',	'000000x0' ],
[/*106*/'C',	'000010x0' ],
[/*107*/'C',	'0x0010x0' ],
[/*108*/'E',	'01x011x0' ],
/*[*//*109*//*'X',	'xxxxxxxx' ],*/
[/*110*/'F',	'01x000x0' ],
[/*111*/'F',	'001000x0' ],
[/*112*/'C',	'010011x0' ],
[/*113*/'D',	'0x1010x0' ],
[/*114*/'X',	'x1xxxx1x' ],
[/*115*/'X',	'00xxxx1x' ],
[/*116*/'A',	'01x110x0' ],
/*[*//*117*//*'X',	'xxxxxxxx' ],*/
[/*118*/'X',	'0010x1x0' ],
[/*119*/'A',	'00x110x0' ],
[/*120*/'D',	'xxx101xx' ],
[/*121*/'X',	'x11xxxx1' ],
[/*122*/'A',	'0010x1x0' ],
[/*123*/'A',	'001010x0' ],
[/*124*/'E',	'010000x0' ],
[/*125*/'X',	'110xxxx1' ],
[/*126*/'X',	'11x011x0' ],
[/*127*/'X',	'00x0101x' ],
[/*128*/'X',	'11x00xx0' ],
/*[*//*129*//*'X',	'xxxxxxxx' ],*/
[/*130*/'A',	'11x110x0' ],
[/*131*/'X',	'x0xxxxxx' ],
[/*132*/'D',	'xxx011xx' ],
[/*133*/'C',	'xxx001xx' ],
[/*134*/'F',	'xxxx00x1' ],
[/*135*/'E',	'xxx11xxx' ],
[/*136*/'X',	'0xxxxxxx' ],
[/*137*/'X',	'101110x0' ],
[/*138*/'E',	'xxxx10xx' ]
]);