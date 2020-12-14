# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Allowed Types of change: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`

## 25.3.0

### Added

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
- SC-5286 - Added new test: editClass adGroupOfStudentsToTheClass

## Changed

- IMP-160 rename repository
- SC-7110 Refactoring: Improved terms in cucumber steps: Teams, Topics, Class
- SC-7524-parametrization: adjust parametrization to existing feature files
- SC-7684-parametrization: feature and step definition file restructuring
- SC-7329-Adjust QA TCs to initial DB
- SC-7474 pull docker container for tests if commit id exists on docker hub
- SC-6767-Chrome driver update 2.46 -> 87.0


### Fixed

- fixed github action changelog

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

