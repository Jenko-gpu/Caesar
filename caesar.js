//const { prototype } = require('events');
var fs = require('fs');
//const { text } = require('stream/consumers');

raw = fs.readFileSync("freq.txt").toString();
freq = new Array;
let pos = raw.indexOf('%');
freq[raw.charAt(0)] = +raw.substring(2, pos)/100;
for (let i = 0; i < 25; i++){
    freq[raw.charAt(pos + 3)] = +(raw.substring(pos+5, raw.indexOf('%', pos + 5)))/100;
    pos = raw.indexOf('%', pos + 2);
}


text = fs.readFileSync("text.txt").toString();
function encode(shift = 2){
    let nStr = "";
    let code_A = 65 ;
    let code_Z = 90 ;
    let code_a = 97 ;
    let code_z = 122;
    if (shift < 0 ) {
        shift = 26 + shift;
    }
    for ( i = 0; i < text.length; i++ ){

        code = text.charCodeAt(i);
            if (code>=code_a && code <= code_z){
            code = code - code_a;
            nStr += String.fromCharCode(code_a + (code + shift) % 26 );
        } else
        if (code>=code_A && code <= code_Z){
            code = code - code_A;
            nStr += String.fromCharCode(code_A + (code + shift) % 26 );
        } else{
            nStr += String.fromCharCode(code);
        }
        
    }
    return nStr;

}


let cur_freq = new Array;

for (i = 65; i<65+26; i++){
    cur_freq[String.fromCharCode(i)] = 0;
}

for (el in text){
    x = text.charAt(el).toUpperCase();
    if (x in freq) cur_freq[x]++;
}

for (x in cur_freq){
    cur_freq[x] /= text.length;
}


let min = 100;
let min_argv = NaN;

for (k = 0; k < 26; k++) {
    let cur = 0;
    for (i in freq) {
        mov = i.charCodeAt(0)+k;
        if (mov > 90) {
            mov -= 90-65+1
        }
        //console.log(i,mov,k);
        cur += (freq[i] - cur_freq[String.fromCharCode(mov)]) * (freq[i] - cur_freq[String.fromCharCode(mov)]);
    }
    if ( cur < min ) {
        min = cur;
        min_argv = k;
    }
}
console.log("Shift is:",min_argv);



console.log(encode(-min_argv))