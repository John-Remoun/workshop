import User from "./user.model.js";
import Post from "./post.model.js";
import Comment from "./comment.model.js";



User.hasMany(Post, { foreignKey: "userId", as: "posts" });
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });

Post.belongsTo(User, { foreignKey: "userId", as: "user" });
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });

Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

export { User, Post, Comment };
