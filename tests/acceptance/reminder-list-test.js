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

test('clicking on a reminder displays the title', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-title:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('.view-title').text().trim(), find('.spec-reminder-title:first').text().trim());
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

test('clicking on an individual reminder renders the correct title element', function(assert) {
  server.createList('reminder', 5);

  visit('/');
  click('.spec-reminder-title:first');

  andThen(function() {
    assert.equal(currentURL(), '/reminders/1');
    assert.equal(find('.view-title').text().trim(), find('.spec-reminder-title:first').text().trim());
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
  })

  fillIn('.title-input', 'walk dog');
  fillIn('.date-input', 'today');
  fillIn('.notes-input', 'Fido is a good dog');
  click('.submit-new-btn');

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

  fillIn('.title-input', 'walk dog');
  fillIn('.date-input', 'today');
  fillIn('.notes-input', 'Fido is a good dog');
  click('.submit-new-btn');

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
  })

  fillIn('.title-input', 'Taylors mom');
  fillIn('.date-input', 'always');
  fillIn('.notes-input', 'Has got it going on');
  click('.submit-new-btn');
  click('.spec-reminder-title:first');

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1');
  })

  visit('/reminders/1')
  click('.edit-reminder-btn')

  andThen(function(){
    assert.equal(currentURL(),'/reminders/1/edit');
  })

  fillIn('.edit-title input', 'Brennas mom');
  fillIn('.edit-date input', 'always');
  fillIn('.edit-notes input', 'Has got it going on, too');

  andThen(function(){
    assert.equal(find('.edit-title input').val(), 'Brennas mom', 'title value is correct');
    assert.equal(find('.edit-date input').val(), 'always', 'date value is correct');
    assert.equal(find('.edit-notes input').val(), 'Has got it going on, too', 'notes value is correct');
  })

  click('.save-reminder-btn');

  andThen(function(){
    assert.equal(currentURL(), '/reminders/1');
  })

  andThen(function(){
    assert.equal(find('.spec-reminder-title').text().trim(), 'Brennas mom', 'should show new title');
    assert.equal(find('.spec-reminder-date').text().trim(), 'always', 'should show new date');
    assert.equal(find('.spec-reminder-notes').text().trim(), 'Has got it going on, too', 'should show new notes');
  })
})
