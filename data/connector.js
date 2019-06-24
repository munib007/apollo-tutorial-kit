// at the top with imports:
import casual from 'casual';
import Mongoose from 'mongoose';

var db;
var error;
// somewhere in the middle:
const mongo = Mongoose.connect('mongodb://127:0:0:1:27017/views',function(err, database){
error = err;    
db = database;
var f1;
waiting.forEach(function(callback) {
    callback(err, database);
  });
}
);

const ViewSchema = Mongoose.Schema({
  postId: Number,
  views: Number,
});

const View = Mongoose.model('views', ViewSchema);

// modify the mock data creation to also create some views:
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).then((post) => { // <- the new part starts here
        // create some View mocks
        return View.update(
          { postId: post.id },
          { views: casual.integer(0, 100) },
          { upsert: true });
      });
    });
  });
});

// at the bottom, add View to the exports
export { Author, Post, View };