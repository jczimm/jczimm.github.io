

//
// 'Extended' Tiny Encryption Algorithm
//
// Algorithm: David Wheeler & Roger Needham, Cambridge University Computer Lab
//            http://www.cl.cam.ac.uk/ftp/papers/djw-rmn/djw-rmn-tea.html (1994)
//            http://www.cl.cam.ac.uk/ftp/users/djw3/xtea.ps (1997)
//
// JavaScript implementation: Chris Veness, Movable Type Ltd: www.movable-type.co.uk
//


function encrypt(val, key)
{
  // 128 bits (16 chars) of string 'key' are used to encrypt string 'val'; function
  // returns encrypted version of 'val'.
  var v = new Array(2), k = new Array(4), s = "", i;

  val = escape(val);  // use escape() so only have single-byte chars to encode

  k[0] = Str4ToLong(key.substr(0,4));
  k[1] = Str4ToLong(key.substr(4,4));
  k[2] = Str4ToLong(key.substr(8,4));
  k[3] = Str4ToLong(key.substr(12,4));

  for (i=0; i<val.length; i+=8) {  // encode val into s in 64-bit (8 char) blocks
    v[0] = Str4ToLong(val.substr(i,4));
    v[1] = Str4ToLong(val.substr(i+4,4));
    code(v, k);
    s += LongToStr4(v[0]) + LongToStr4(v[1]);
  }

//  return(s)       // deleted NVS  2005.04.27
  return(escape(s)) // corrected NVS 2005.04.27
  // note: if val or key are passed as string objects, rather than strings, this
  // function will throw an 'Object does not support this property or method' error
}


function decrypt(val, key)
{
  var v = new Array(2), k = new Array(4), s = "", i;

  k[0] = Str4ToLong(key.substr(0,4));
  k[1] = Str4ToLong(key.substr(4,4));
  k[2] = Str4ToLong(key.substr(8,4));
  k[3] = Str4ToLong(key.substr(12,4));

  val = unescape(val); // corrected NVS 2005.04.27
  for (i=0; i<val.length; i+=8) {  // decode val into s in 64-bit (8 char) blocks
    v[0] = Str4ToLong(val.substr(i,4));
    v[1] = Str4ToLong(val.substr(i+4,4));
    decode(v, k);
    s += LongToStr4(v[0]) + LongToStr4(v[1]);
  }

  if (s.indexOf("\x00") != -1) {
    // strip trailing null chars resulting from filling 4-char blocks
    s = s.substr(0, s.indexOf("\x00"));
  }

  return(unescape(s));
}


function code(v, k)
{
  // Extended TEA: this is the 1997 revised version of Needham & Wheeler''s algorithm
  // params: v[2] 64-bit value block; k[4] 128-bit key
  var y = v[0], z = v[1];
  var delta = 0x9E3779B9, limit = delta*32, sum = 0;

  while (sum != limit) {
    y += (z<<4 ^ z>>>5)+z ^ sum+k[sum & 3];
    sum += delta;
    z += (y<<4 ^ y>>>5)+y ^ sum+k[sum>>>11 & 3];
    // note: unsigned right-shift '>>>' is used in place of original '>>', due to lack
    // of 'unsigned' type declaration in JavaScript (thanks to Karsten Kraus for this)
  }
  v[0] = y; v[1] = z;
}


function decode(v, k)
{
  var y = v[0], z = v[1];
  var delta = 0x9E3779B9, sum = delta*32;

  while (sum != 0) {
    z -= (y<<4 ^ y>>>5)+y ^ sum+k[sum>>>11 & 3];
    sum -= delta;
    y -= (z<<4 ^ z>>>5)+z ^ sum+k[sum & 3];
  }
  v[0] = y; v[1] = z;
}


function Str4ToLong(s)  // convert 4 chars of s to a numeric long
{
  var v = s.charCodeAt(0) +
    (s.charCodeAt(1)<<8) +
    (s.charCodeAt(2)<<16) +
    (s.charCodeAt(3)<<24);
  return(isNaN(v) ? 0 : v);
}


function LongToStr4(v)  // convert a numeric long to 4 char string
{
  var s = String.fromCharCode(v & 0xFF, v>>8 & 0xFF, v>>16 & 0xFF, v>>24 & 0xFF);
  return(s);
}


