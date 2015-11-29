'use strict';

import * as githubIntegrationService from './github-integration-service';

export let name = 'tomastrajan';

export function getRepos(name) {
    return githubIntegrationService.getRepos(name);
}

getRepos(name);
