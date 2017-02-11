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
    assert.equal(find('.reminder').length,5)
  });
});

test('user should be able to create a new reminder', function(assert){
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
