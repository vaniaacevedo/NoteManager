import { Template } from 'meteor/templating';
import { Notes } from '../collections/collections';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

//to config accounts
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Template.body.helpers({
  // notes:[
  //   {text:'My note 1'},
  //   {text:'My note 1'},
  //   {text:'My note 1'}
  // ]
notes(){
  return Notes.find({},{ sort: { createdAt: -1 } });
}
});

Template.add.events({
  'submit .add-form': function(){
    event.preventDefault();
    //get input value
    const target= event.target;
    const text= target.text.value;
    //insert note into collection
    // Notes.insert({
    //   text:text,
    //   createdAt: new Date(),
    //   owner: Meteor.userId(),
    //   username: Meteor.user().username,
    // });
    Meteor.call('notes.insert', text);
    //Clear form
    target.text.value ='';
    //close modal
    $('.modal').modal('close');
    return false
  }
});

Template.note.events({
  'click .delete-note': function(){
    // Notes.remove(this._id);
    Meteor.call('notes.remove', this);
    return false
  }
});
