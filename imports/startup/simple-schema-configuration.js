import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
SimpleSchema.defineValidationErrorTransform((error) => new Meteor.Error(400, error.message))