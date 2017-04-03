var expect = require('expect');

var {generateMessage} = require('./message');

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