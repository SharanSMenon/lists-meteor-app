import {
  Mongo
} from 'meteor/mongo';
import {
  Meteor
} from 'meteor/meteor';
import moment from "moment";
import {
  ObjectID
} from 'mongodb'
export const Lists = new Mongo.Collection('lists');

if (Meteor.isServer) {
  Meteor.publish('lists', function () {
    return Lists.find({
      userId: this.userId
    })
  })
}

Meteor.methods({
  'lists.addList'(title) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    return Lists.insert({
      title,
      items: [],
      updatedAt: moment().valueOf(),
      userId: this.userId
    })
  },
  'lists.removeList'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Lists.remove({
      _id,
      userId: this.userId
    })
  },
  'lists.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Lists.update({
      _id,
      userId: this.userId
    }, {
        $set: {
          updatedAt: moment().valueOf(),
          ...updates
        }
      })
  },
  'lists.addListItem'(_id, item) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    const x = new ObjectID()
    const itemPush = {
      _id: x.toHexString(),
      updatedAt: moment().valueOf(),
      ...item
    }
    Lists.update({
      _id,
      userId: this.userId
    }, {
        $push: {
          items: itemPush
        }
      })
  },
  'lists.deleteListItem'(_id, itemId) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Lists.update({
      userId: this.userId,
      _id
    }, {
        $pull: {
          items: {
            _id: itemId
          }
        }
      })
  },
  'lists.updateListItem'(_id, itemId, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    let update = { }
    if (updates.name) {
      update["items.$.name"] = updates.name
    }
    if (typeof updates.completed === "boolean") {
      update["items.$.completed"] = updates.completed
    }
    Lists.update({
      userId: this.userId,
      _id,
      "items._id":itemId
    }, {
        $set: {
          ...update
        }
      })
  }
})