# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Allowed Types of change: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

## [Unreleased]

### Fixed

- BC-611 - Improve E2E tests - nuxtTeacherGradesTask.feature
- Fixed the step in deleteTask.feature. Now it waits for the page to reload

### Added

- BC-308 - include course colour checks which were deactivated by merging BC-235
- added e2e tests to create and edit a teacher

### Changed

- BC-699 - Removed waitUntilAjaxIsFinished method
- BC-581 - Refactored waitUntilAjaxIsFinished method
- BC-155 - rename tab for students in task overview page

## [26.16.0] - 2021-11-09

### Added

- BC-402 - Update e2e test so there is an new workflow to call by other repos
- added e2e test to delete a team

### Removed

- BC-379 - removed local server installation

### Fixed

- fixed default `npm run test` to run only stable tests

## [26.13.0] - 2021-10-19

### Added

- BC-326 - Improve E2E test: deleteTask.feature
- BC-402 - split tests into 5 groups for parallel CI run
- BC-183 - added testcase for nuxt client task page for teacher role
- BC-364 - add command to run unstable Tests on PR label `run unstable tests`
- BC-283 - added wait method to test step
- reinstated that all tests are running
- SC-9237 - added E2E test to check redirect
- BC-25 - seed database changed to use management api call
- BC-182 - added testcase for nuxt client task page for student role

### Removed

- docker log output
- removed \_travis.sh files
- removed .travis.yml
- disabled email tests
- remove github workflow update_version.yml

### Fixed

- BC-387 - fix command to run extended Test
- fix fallbacks for features and notification services versions
- execute changes for features in travis
- changed sidebar menu item CURRENT TASKS instead of OPEN TASKS
- fix createStudent scenario
- BC-235 - fix and adjust colours in courses

## 26.4.0

- adapt to sidebar changes

## 26.2.0

- SC-8248 removed helpdesk
- SC-8846 add core test set functionality
- refactoring tests

### Removed

- remove the replace of envs in the docker-compose file. Envs will be direktly taken by the docker-file. (the changed docker-file is not used anyways)

## 26.1.0

## 26.0.0

## 25.6.0 - 09-02-21

### Changed

- SC-8122 extended a test case
- SC-8356 added docker authentication
- SC-8213 error response format adjusted

## 25.3.0

### Added

- SC-7203 - Added new test: ceateEvent
- SC-7126 - Fix test of createClass due to bugfix on client
- SC-7848 - Added new function, due to bugfix on client
- SC-6814 - Delete class test
- SC-5795 - CreateUser and send registration link
- SC-7736 - Deleted User forgot password functionality
- SC-7735 - Deleted User Tests for Removed user in not visible in team anymore
- SC-7059 - DeletionConcept Tests
- OPS-1297 - Added Changelog github action
- SC-7571 - sendConsentFormEmail adjusted
- SC-7733 - User can not login anymore, DeletionConcept Tests
- SC-5797 - Added new test: showRegularTaskOnDashboard
- SC-5780 - Added new test: editTeam
- SC-6816 - Added new test: editClass
- SC-8119 - Added new test: created student older than 16 can register
- SC-5286 - Added new test: editClass adGroupOfStudentsToTheClass
- SC-8120 - Added new test: createClass createClassWith3Members

### Changed

- SC-6108 Adaptions to some E2E tests to make them work with the new admin tables
- SC-7688 Rename expected menuitem names
- IMP-160 rename repository
- SC-7110 Refactoring: Improved terms in cucumber steps: Teams, Topics, Class
- SC-7524-parametrization: adjust parametrization to existing feature files
- SC-7684-parametrization: feature and step definition file restructuring
- SC-7329-Adjust QA TCs to initial DB
- SC-7474 pull docker container for tests if commit id exists on docker hub
- SC-6767-Chrome driver update 2.46 -> 87.0
- SC-8117 expanded createNewStudent16 to perform first login

### Fixed

- fixed github action changelog
- SC-7126 - Fix test of createClass due to bugfix on client

## 25.0.1 - 2020-09-30

### Changed

- SC-6945 skip @copyCourseWithText for hotfix
- SC-5858 change selectors after removing chosen library in the old client
- SC-7878 - dropdowns and multiselects

## 25.0.0

- OPS-1205 Handle German and English error message within login page test

## [24.3.0] - 2020-08-25

## [24.0.0] - 2020-07-30

## [23.6.0] - 2020-07-21

### Fixed - 23.6.0

### Fixed - 24.0.0

- fixed the @createSimpleHomework, added one more step when creating a new course

## [23.5.0] - 2020-06-21

### Added in 23.5.0

- Fix dependencies security vulnerabilities [SC-4534](https://github.com/hpi-schul-cloud/end-to-end-tests/pull/78)
- Add timestamps to filenames [NA](https://github.com/hpi-schul-cloud/end-to-end-tests/pull/75)
- Fix for failing test in @createSimpleHomework [NA](https://github.com/hpi-schul-cloud/end-to-end-tests/pull/72)

## [23.2.0] - 2020-06-29

### Added in 23.2.0

- Admin can create empty classes

## [23.0.0] - 2020-05-19

### Added in 23.0.0

- copied in a basic mergify config to automerge PRs
- added `npm ci` command to end-to-end-tests ci setup to be able to execute new js seed script properly
- This changelog has been added
