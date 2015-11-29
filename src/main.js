'use strict';

import * as q from 'q';

import GithubComponent from './github/github-component';

q.when()
    .then(new GithubComponent('tomastrajan').initialized);
