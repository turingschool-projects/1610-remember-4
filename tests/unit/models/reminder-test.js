import { moduleForModel, test } from 'ember-qunit';

moduleForModel('reminder', 'Unit | Model | reminder', {
  // Specify the other units that are required for this test.
  needs: []
});

test('each reminder should have a title, date and note', function(assert) {
  let reminders = this.subject({title: 'some lorem ipsum', date: 'Tue Feb 07 2017 02:43:02 GMT-0700 (MST)', notes: 'some more lorem ipsum'});
  assert.equal(reminders.get('title'), 'some lorem ipsum', 'this is the reminder title')
  assert.equal(reminders.get('date'), 'Tue Feb 07 2017 02:43:02 GMT-0700 (MST)', 'this is the reminder date')
  assert.equal(reminders.get('notes'), 'some more lorem ipsum', 'this is the reminder note')
});
