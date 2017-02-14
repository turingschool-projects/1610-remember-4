/* globals server */

import { test } from 'qunit';
import moduleForAcceptance from 'remember/tests/helpers/module-for-acceptance';

import Ember from 'ember';

moduleForAcceptance('Acceptance | reminders list');

test('viewing the homepage', function(assert) {
  server.createList('reminder', 5);

  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/reminders');
    assert.equal(find('.spec-reminder-title').length, 5);
  });
});

//This test is now failing and we don't understand why. It seems like it doesn't have access to the title.
//When we check the actual application the class names are there and they corrospond to the correct element.
//This test was passing earlier today and we didn't make any changes to this file today.
test('clicking on an individual item', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-title:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('.spec-reminder-title:first').text().trim(), find('.new-reminder-title').text().trim());
  });
});

test('clicking on an individual item adds a class of active', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-title:first');

  andThen(function() {
    assert.equal(find('.active').length, 1);
  });
});

//This test is now failing and we don't understand why. It seems like it doesn't have access to the title.
//When we check the actual application the class names are there and they corrospond to the correct element.
//This test was passing earlier today and we didn't make any changes to this file today.
test('clicking on an individual reminder renders the correct title element', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-title:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('h2').text().trim(), find('.spec-reminder-title:first').text().trim());
  });
});

test('clicking on add new reminder will take us to /new', function(assert){
  server.createList('reminder',5);

  visit('/');
  click('.spec-add-new');

  andThen(function(){
    assert.equal(currentURL(), '/reminders/new');
    assert.equal(find('.reminder').length, 5)
  });
});

test('user should be able to create a new reminder', function(assert) {
  visit('/');
  click('.spec-add-new');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
    fillIn('.title-input', 'walk dog');
    fillIn('.date-input', 'today');
    fillIn('.notes-input', 'Fido is a good dog');
    click('.submit-new-btn');
  })

  andThen(function(){
    assert.equal(find('.spec-reminder-title').text().trim(), 'walk dog', 'should show title');
    assert.equal(find('.spec-reminder-date').text().trim(), 'today', 'should show date');
    assert.equal(find('.spec-reminder-notes').text().trim(), 'Fido is a good dog', 'should show notes');
    })
  })

test('homepage will show zero reminders if user has no reminders list', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.reminder').length, 0);
    assert.equal(find('.user-message').text().trim(), 'You have no reminders. Please add some!')
  })
})

test('user message disappears if a user adds a new reminder', function(assert) {
  visit('/');
  click('.spec-add-new');

  andThen(function() {
    fillIn('.title-input', 'walk dog');
    fillIn('.date-input', 'today');
    fillIn('.notes-input', 'Fido is a good dog');
    click('.submit-new-btn');
  })

  andThen(function() {
    assert.equal(find('.user-message').text().trim(), '')
    assert.equal(find('.reminder').length, 1)
  })
})

test('user should be able to edit the reminder', function(assert) {
  visit('/');
  click('.spec-add-new');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/new');
    fillIn('.title-input', 'Taylors mom');
    fillIn('.date-input', 'always');
    fillIn('.notes-input', 'Has got it going on');
    click('.submit-new-btn');
  })

  click('.spec-reminder-title:first');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1');
    click('.edit-reminder-btn')
  })

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1/edit');
  })

  andThen(function(){
    fillIn('.edit-title', 'Brennas mom');
    fillIn('.edit-date', 'always');
    fillIn('.edit-notes', 'Has got it going on, too');
    click('.save-reminder-btn');
  })

  andThen(function(){
    assert.equal(currentURL(), '/reminders');
  })
//This last andThen does not pass. Everything above does. I thought it might be the same issue as the above tests
//because it involves the spec-reminder-title, etc classes. Once again, in the app everything works fine and when we
//hover over the new titles, etc with the inspector, they all have the correct class names with the corrosponding item.
  andThen(function(){
    assert.equal(find('.spec-reminder-title').text().trim(), 'Brennas mom', 'should show new title');
    assert.equal(find('.spec-reminder-date').text().trim(), 'always', 'should show new date');
    assert.equal(find('.spec-reminder-notes').text().trim(), 'Has got it going on, too', 'should show new notes');
  })
})
