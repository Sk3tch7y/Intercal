# Test Plan

## Introduction
We will be using the Mocha framework to test our Node.js functions and methods to ensure that our code is error-free. Mocha is well-known for it's unit testing and integration testing, and will allow us to efficiently write test cases for our code, reducing overall code bloat and wasted time.

We will be aiming for 90% code coverage with our unit testing, allowing us to ensure that our test cases cover the majority of functionality in our code base.

The overall aim for our test plan is to produce code that executes as expected every time.

## Scope
The scope for our tests involves everything to do with the core functionality of our project, including searching lakes, changing parameters, marking posts to follow, saving user view

The scope does not involve login and registration

## Testing Approaches
### Current:
Currently, as we have just begun implementing code, we do not have the CI/CD tests in place so we are all doing manual unit testing with our code as well as manual tests to ensure we have integrated different components successfully.

### Future:
Future tests will be written to ensure functionality according to our pre-defined user stories. These tests will aim to cover 85-100% of the code base.

We will be following BDD (Behaviour Driven Development), which is a refined version of TDD (Test Driven Development), focused on the user experience. Due to this, unit testing will become a part of the implementation cycle, and will happen before the actual code is written. This will ensure that our written code is providing the expected output, cutting down on errors that may arise in the future.

Along with unit testing will be integration testing, where we will test the system as a whole after each major step to ensure seamless integration with the rest of the system.

We will be using a CI/CD pipeline in Github Actions to run all of our tests when changes are made to the main branch to ensure our integration testing is followed adequately.

## Roles
Each user will be in charge of writing their unit tests, although each member can write tests if they notice tests are lacking.

Nic will be in charge of setting up the initial CI/CD pipeline so that the team can add their tests to Github in order to ensure integration tests are successful when new changes are made.