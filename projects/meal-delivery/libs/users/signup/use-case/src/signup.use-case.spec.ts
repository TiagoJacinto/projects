import {
  AlreadyCreatedAccountTable,
  testSignupFeature,
} from '@tiagojacinto/meal-delivery-users-signup-acceptance-test';

testSignupFeature('@backend', (test) => {
  test('Successful signup', ({ given, when, then, and }) => {
    given('I am a new user', () => {});

    when('I register with valid account details', () => {});

    then('I should see a success message', () => {});

    and('I should receive a confirmation email', () => {});
  });

  test('Invalid or missing registration details', ({
    given,
    when,
    then,
    and,
  }) => {
    given('I am a new user', () => {});

    when('I register with invalid account details', () => {});

    then(
      'I should see an error notifying me that my input is invalid',
      () => {}
    );

    and('I should not receive a confirmation email', () => {});
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    given(
      'a set of users already created accounts',
      (table: AlreadyCreatedAccountTable) => {}
    );

    when('new users attempt to register with those emails', () => {});

    then(
      'they should see an error notifying them that the account already exists',
      () => {}
    );

    and('they should not receive a confirmation email', () => {});
  });
});
