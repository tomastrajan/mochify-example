'use strict';

import 'babel-polyfill';
import { assert } from 'chai';
import * as sinon from 'sinon';
import * as q from 'q';

import * as githubIntegrationService from './github-integration-service';

import GithubComponent from './github-component';

let holder;
let component;

describe('GithubComponent', () => {

    beforeEach(() => {
        holder = document.createElement('div');
        holder.setAttribute('class', 'content');
        document.getElementsByTagName('body')[0].appendChild(holder);
        sinon.stub(githubIntegrationService, 'getRepos', (name) => {
            const data = {
                user1: [{name: 'repo1'}],
                user2: [{name: 'repo2'}]
            };
            return q.when(data[name]);
        });
        component = new GithubComponent('user1');
        return component.initialized;
    });

    afterEach(() => {
        document.getElementsByTagName('body')[0].removeChild(holder);
        githubIntegrationService.getRepos.restore();
    });

    it('should contain initialized name', () => {
        assert.strictEqual(component.name, 'user1', 'correct name');
    });

    it('should contain initialized repos', () => {
        assert.isDefined(component.repos, 'no repos found');
        assert.strictEqual(component.repos[0].name, 'repo1', 'invalid repo name');
    });

    it('should get repos for other name', () => {
        component.name = 'user2';
        return component.getRepos()
            .then(repos => {
                assert.isDefined(component.repos, 'no repos found');
                assert.strictEqual(component.repos[0].name, 'repo2', 'invalid repo name');
            });
    });

    it('should rendered repo list', () => {
        let repoList = holder.getElementsByTagName('ul')[0];
        assert.strictEqual(repoList.firstElementChild.firstElementChild.firstElementChild.innerHTML,
            'repo1', 'repo list element not rendered');
    });

});
