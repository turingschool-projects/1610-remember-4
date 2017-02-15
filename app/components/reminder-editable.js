import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    remove(){
      console.log('hi');
      this.get('store').findRecord('reminder', this.model.id).then(reminder =>{
        reminder.destroyRecord()
      })
    }
  }
})
