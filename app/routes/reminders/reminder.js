import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    return this.get('store').findRecod('reminder', params.reminder_id)
  }
});