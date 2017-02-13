import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  tagName: 'section',
  classNames: ['edit-reminder'],

  editable: false,

  actions: {
    editReminder() {
      console.log('hi');
      const reminder = this.getProperties('editable');
      this.setProperties({editable: true})
      console.log(this.editable);
    }
  }
});
