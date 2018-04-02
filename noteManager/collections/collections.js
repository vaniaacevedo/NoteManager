import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection('notes');

Meteor.methods({
  'notes.insert'(text){
    check(text, String);

    // Make sure the user is logged in before inserting a note
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Notes.insert({
      text:text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'notes.remove'(note) {
   check(note._id, String);

   Notes.remove(note._id);
 },
});
