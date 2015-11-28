'use strict';

import 'babel-polyfill';
import { assert } from 'chai';

import { name, getRepos } from './main';

describe('App', () => {

    it('should contain default name', () => {
        assert.strictEqual(name, 'tomastrajan', 'correct name');
    });

    it('should get repositories of a specified user', () => {
        return getRepos()
            .then(repos => {
                assert.isDefined(repos, 'no repos found');
                assert.strictEqual(repos[1].name, 'angular-es6-webpack', 'invalid repo name');
            });
    });

});
