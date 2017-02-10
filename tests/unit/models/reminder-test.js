import { moduleForModel, test } from 'ember-qunit';

moduleForModel('reminder', 'Unit | Model | reminder', {
  // Specify the other units that are required for this test.
  needs: []
});

test('each reminder should have a title', function(assert) {
  let reminders = this.subject({title: 'some lorem ipsum'});
  assert.equal(reminders.get('title'), 'some lorem ipsum', 'this is the reminder title')
});

test('each reminder should have a date', function(assert) {
  let reminders = this.subject({date: 'Tue Feb 07 2017 02:43:02 GMT-0700 (MST)'});
  assert.equal(reminders.get('date'), 'Tue Feb 07 2017 02:43:02 GMT-0700 (MST)', 'this is the reminder date')
});

test('each reminder should have a note', function(assert) {
  let reminders = this.subject({notes: 'some more lorem ipsum'});
  assert.equal(reminders.get('notes'), 'some more lorem ipsum', 'this is the reminder note')
});
