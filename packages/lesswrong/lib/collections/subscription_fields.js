import Users from "meteor/vulcan:users";
import {Posts, Comments, Categories} from "meteor/example-forum"

Users.addField([
  {
    fieldName: 'subscribedItems',
    fieldSchema: {
      type: Object,
      optional: true,
      blackbox: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscribers',
    fieldSchema: {
      type: Array,
      optional: true,
      hidden: true, // never show this,
    }
  },
  {
    fieldName: 'subscribers.$',
    fieldSchema: {
      type: String,
      optional: true,
      hidden: true, // never show this,
    }
  },
  {
    fieldName: 'subscriberCount',
    fieldSchema: {
      type: Number,
      optional: true,
      hidden: true, // never show this
    }
  }
]);

Posts.addField([
  {
    fieldName: 'subscribers',
    fieldSchema: {
      type: Array,
      optional: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscribers.$',
    fieldSchema: {
      type: String,
      optional: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscriberCount',
    fieldSchema: {
      type: Number,
      optional: true,
      hidden: true, // never show this
    }
  }
]);

Comments.addField([
  {
    fieldName: 'subscribers',
    fieldSchema: {
      type: Array,
      optional: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscribers.$',
    fieldSchema: {
      type: String,
      optional: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscriberCount',
    fieldSchema: {
      type: Number,
      optional: true,
      hidden: true, // never show this
    }
  }
]);

Categories.addField([
  {
    fieldName: 'subscribers',
    fieldSchema: {
      type: Array,
      optional: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscribers',
    fieldSchema: {
      type: String,
      optional: true,
      hidden: true, // never show this
    }
  },
  {
    fieldName: 'subscriberCount',
    fieldSchema: {
      type: Number,
      optional: true,
      hidden: true, // never show this
    }
  }
]);
