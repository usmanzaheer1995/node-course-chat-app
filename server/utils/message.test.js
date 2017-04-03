var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    it('should generate correct message object', () => {
        var from = 'musa';
        var text = 'hi there';
        var response = generateMessage(from,text);
        //expect(response.from).toBe('musa');
        //expect(response.text).toBe('hi there');
        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({
            from,
            text,
        });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = "usman";
        var longitude = 1;
        var latitude = 1;
        var response = generateLocationMessage(from,longitude,latitude);
        expect(response.createdAt).toBeA('number');
        expect(response).toInclude({
            from,
            url: `https://www.google.com/maps?q=1,1`,
        });
    });
});