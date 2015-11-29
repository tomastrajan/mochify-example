'use strict';

import * as axios from 'axios';
import * as _ from 'lodash';

import { unwrapResponse, logResponse, logRejection } from '../common/integration-utils';

const API_URL = 'https://api.github.com';

export function getRepos(name) {
    return axios.get(API_URL + `/users/${name}/repos`)
        .then(unwrapResponse)
        .then(_.partialRight(_.map, dtoToModel))
        .then(logResponse)
        .catch(logRejection);
}

function dtoToModel(dto) {
    return _.pick(dto, ['name', 'description', 'html_url']);
}