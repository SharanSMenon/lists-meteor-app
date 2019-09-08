import {
  Meteor
} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {
  Accounts
} from 'meteor/accounts-base'
Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  new SimpleSchema({
    email: {
      type: String,
      regEx: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    }
  }).validate({
    email
  })
  return true;
})