import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['edit-reminder'],

  title: '',
  date: '',
  notes: '',

  actions: {
    editReminder() {
      console.log('hi');
    }
  }
});
