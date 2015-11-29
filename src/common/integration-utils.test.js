'use strict';

import 'babel-polyfill';
import { assert } from 'chai';
import * as sinon from 'sinon';

import * as integrationUtils from './integration-utils';

describe('Integration Utils', () => {

    it('should logResponse in debug mode', () => {
        integrationUtils.setDebug(true);
        sinon.stub(console, 'log');

        integrationUtils.logResponse('response');

        assert.strictEqual(console.log.callCount, 1, 'log not called');
        assert.isTrue(console.log.calledWith('response'), 'log called with incorrect parameter');

        integrationUtils.setDebug(false);
        console.log.restore();
    });

    it('should not logResponse without debug mode', () => {
        sinon.stub(console, 'log');

        integrationUtils.logResponse('response');

        assert.strictEqual(console.log.callCount, 0, 'log called');

        console.log.restore();
    });

    it('should logRejection', () => {
        sinon.stub(console, 'error');

        integrationUtils.logRejection('error');

        assert.strictEqual(console.error.callCount, 1, 'error not called');
        assert.isTrue(console.error.calledWith('error'), 'error called with incorrect parameter');

        console.error.restore();
    });

    it('should unwrapResponse', () => {
        let response = { data: 'data' };

        let result = integrationUtils.unwrapResponse(response);

        assert.strictEqual(result, 'data', 'incorect unwrapped response');
    });

});
