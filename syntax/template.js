var name = 'kwon';

var letter = 'Dear ' + name + '\nabcdef ghisdja ' + name + ' lksfaj';
console.log(letter);

var letter = `Dear ${name}

nabcdef ghisdja ${name} lksfaj`;

console.log(letter); // ` 이거 사용 ${변수 or 하고싶은 연산}