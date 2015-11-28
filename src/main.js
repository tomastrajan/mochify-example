'use strict';

import * as github from './github/github-integration-service';

export let name = 'tomastrajan';

export function getRepos() {
    return github.getRepos(name);
}

getRepos();