var expect = require('expect');

var {isRealString} = require('./validation');

it('should return isRealString', () => {
    var str = isRealString('123');
    expect(str).toBe(true);
});

it('should reject strings with only spaces', () => {
    var res = isRealString('      ');
    expect(res).toBe(false);
});

it('should allow strings with non-space characters', () => {
    var res = isRealString('    ussr   ');
    expect(res).toBe(true);
});