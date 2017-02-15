import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),

  actions: {
    remove(){
      this.get('store').findRecord('reminder', this.model.id,{reload:true}).then(reminder =>{
        reminder.destroyRecord()
      })
    }
  }
})
