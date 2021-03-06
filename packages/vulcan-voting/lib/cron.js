import { Posts, Comments } from "meteor/example-forum";
import { getSetting } from 'meteor/vulcan:core';
import { updateScore } from './scoring.js';

// TODO use a node cron or at least synced-cron
Meteor.startup(function () {
  const scoreInterval = parseInt(getSetting("scoreUpdateInterval")) || 30;
  if (scoreInterval > 0) {

    // active items get updated every N seconds
    Meteor.setInterval(function () {
      let updatedPosts = 0;
      let updatedComments = 0;

      // console.log('tick ('+scoreInterval+')');
      Posts.find({'status': 2,'inactive': {$ne : true}}).forEach(function (post) { // only run scoring on approved posts
        updatedPosts += updateScore({collection: Posts, item: post});
      });
      Comments.find({'inactive': {$ne : true}}).forEach(function (comment) {
        updatedComments += updateScore({collection: Comments, item: comment});
      });
      // console.log("Updated "+updatedPosts+"/"+Posts.find().count()+" Posts")
      // console.log("Updated "+updatedComments+"/"+Comments.find().count()+" Comments")
    }, scoreInterval * 1000);

    // inactive items get updated every hour
    Meteor.setInterval(function () {
      let updatedPosts = 0;
      let updatedComments = 0;
      console.log("Started updating the score of inactive items");
      Posts.find({'inactive': true}).forEach(function (post) {
        updatedPosts += updateScore({collection: Posts, item: post});
      });
      Comments.find({'inactive': true}).forEach(function (comment) {
        updatedComments += updateScore({collection: Comments, item: comment});
      });
      console.log("finished updating the score of inactive items");
    }, 3600 * 24 * 1000);

  }
});
