'use strict';

import { assert } from 'chai';

import { name } from './main';

describe('Example test', () => {

    it('should contain a name', () => {
        assert.strictEqual(name, 'tomastrajan', 'correct name');
    });

});
