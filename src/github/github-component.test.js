import 'babel-polyfill';
import { assert } from 'chai';

import * as githubComponent from './github-component';

describe('GitHub Component', () => {

    it('should contain default name', () => {
        assert.strictEqual(githubComponent.name, 'tomastrajan', 'correct name');
    });

    it('should get repositories of a specified user', () => {
        return githubComponent.getRepos('tomastrajan')
            .then(repos => {
                assert.isDefined(repos, 'no repos found');
                assert.strictEqual(repos[1].name, 'angular-es6-webpack', 'invalid repo name');
            });
    });

    it('should not get repositories for invalid user', () => {
        return githubComponent.getRepos('invalid-user')
            .then(repos => {
                assert.isDefined(repos, 'no repos found');
                assert.strictEqual(repos.length, 0, 'invalid repos count');
            });
    });

});
