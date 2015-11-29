'use strict';

import * as mustache from 'mustache';
import * as githubIntegrationService from './github-integration-service';

export default class GithubComponent {

    constructor(name) {
        this.name = name;
        this.repos = [];

        this.holder = document.querySelector('#github-component');
        if (!this.holder) {
            this.holder = document.createElement('div');
            this.holder.innerHTML = `
                <div id="github-component">
                    <div class="row">
                        <div class="col s6"><input type="text" value="${this.name}" /></div>
                        <div class="col s6"><button class="btn">Search</button></div>
                    </div>
                    <div class="row">
                        <div class="repo-list">

                        </div>
                    </div>
                </div>
            `;
            document.querySelector('.content').appendChild(this.holder);
        }
        this.repoList = this.holder.querySelector('.repo-list');
        this.holder.querySelector('input').addEventListener('change', this.onInputChange.bind(this));
        this.holder.querySelector('button').addEventListener('click', this.onButtonClick.bind(this));

        this.template = `
            <ul class="collection">
                {{#repos}}
                    <li class="collection-item">
                        <h5><a href="{{html_url}}">{{name}}</a></h5>
                        <p>{{description}}</p>
                    </li>
                {{/repos}}
            </ul>
        `;
        mustache.parse(this.template);

        this.initialized = this.update();
    }

    onButtonClick() {
        this.update();
    }

    onInputChange(e) {
        this.name = e.target.value;
    }

    update() {
        return this.getRepos()
            .then(this.render.bind(this));
    }

    render() {
        this.repoList.innerHTML = mustache.render(this.template, { repos: this.repos });
    }

    getRepos() {
        return githubIntegrationService.getRepos(this.name)
            .then(repos => {
                this.repos = repos;
            });
    }

}
