This post will show how to implement two nice standard features of open source development:
- A build status badge on the readme.md of the project
- A github pull request check requiring a valid build before completing

## Build Status Badge

A build status badge is a quick way for a user to know the build state of a repository.  It is customary to embed the status in the readme.md file of the repository.

### Enabling build status in VSTS

Build status for a VSTS build queue can be retrieved by embedding the following image into an html page or markdown.

```html
https://<account>.visualstudio.com/_apis/public/build/definitions/<build_definition_id>/<build_id>/badge
```

In our case:
https://nextline.visualstudio.com/_apis/public/build/definitions/f5929b14-1593-4039-8984-a92fe4eea9a6/37/badge

If you open this in a browser, you will see the up to date build status for our master queue.

In order for this to work, you have to enable the build badge in the build definition.

This is done in the options section of the configuration:

![Enable build status badge](/img/integrate-with-github-status/enable-status-badge.png)

### Update readme.md to add the build status

In commit [57d13ad5a509964cdbcfabbcea5a4a272cdcab95](https://github.com/eliakaris/blog/commit/57d13ad5a509964cdbcfabbcea5a4a272cdcab95) you will see I added the build status badge to the readme.md file.

Very simply it is:
```md
[![Build Status](https://nextline.visualstudio.com/_apis/public/build/definitions/f5929b14-1593-4039-8984-a92fe4eea9a6/37/badge)](https://nextline.visualstudio.com/Blog/_build/index?definitionId=37)
```

This is the image link from above and when it is clicked, it will take the user to the build definition.  The user will require access to VSTS to actually view the build details though.

## Enabling status checks in the Github pull request

Github supports [status checks](https://help.github.com/articles/enabling-required-status-checks/) in pull requests.  These allow third party systems such as VSTS and others to integrate in the pull request process.  They can block a pull request and perform other review actions such as look for naughty words and passwords.

In order to keep our system humming along and ensure a build is never broken, a build is required before any pull request can be merged.  VSTS supports sending status checks to github which can then be enabled as a status check.

### Enabling status checks from the VSTS build

First the build status reporting has to be enabled in the VSTS build definition.

This is done by editing the "Report build status" setting on the Get sources page of the build definition.

![Report build status](/img/integrate-with-github-status/report-build-status.png)

After this is done, trigger a build and the build status check will become available in Github.

### Enable the status check in Github

In order to block pull request merging before a build is done, status checks have to be configured for the branch.  This is done with Github's [Branch protection rules](https://help.github.com/articles/defining-the-mergeability-of-pull-requests/).

To enable this, go to the Branches tab of the settings:

![Branch protections page](/img/integrate-with-github-status/branch-protections.png)

Edit the master branch and enable the VSTS status check:

![VSTS build status check](/img/integrate-with-github-status/enable-status-checks.png)

That should be it!

Every pull request will kick of a VSTS build and update the Github status check with its status.

Once a build is successful, a merge will be allowed.

### Viewing it in action

The [pull request](https://github.com/eliakaris/blog/pull/29) for this blog entry kicked off a build.

Here's the status check in Github:

![Github status check](/img/integrate-with-github-status/waiting-on-build.png)

Here's the VSTS build:

![VSTS build running](/img/integrate-with-github-status/vsts-build.png)

Here's the build completed:

![VSTS build completed](/img/integrate-with-github-status/vsts-build-complete.png)

And finally the status check passed:

![Github status check passed](/img/integrate-with-github-status/status-check-complete.png)