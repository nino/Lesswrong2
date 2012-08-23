Template.selected_post.events = {
  'click input[type=submit]': function(){
    var post = Session.get('selected_post');
    var $comment = $('#comment');
    var comment = {
        post: post._id
      , body: $comment.val()
      , submitter: Meteor.user().username
      , submitted: new Date().getTime()
    };
    Comments.insert(comment);
    $comment.val('');
  }
};

Template.selected_post.show = function(){
  return Session.equals('state', 'view_post');
};

Template.selected_post.post = function(){
  var post = Session.get('selected_post');
  return post;
};

Template.selected_post.has_comments = function(){
  var post = Session.get('selected_post');
  var comments = Comments.find({ post: post._id, parent: null });
  return comments.count() > 0;
};

Template.selected_post.comments = function(){
  var post = Session.get('selected_post');
  var comments = Comments.find({ post: post._id, parent: null });
  return comments;
};
