const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require('./error.js');

/* database connection start */
main()
  .then(() => {
    console.log("connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chat");
}
/* database connection  end*/

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 

//  show all data from database on homepage
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("chat.ejs", { chats });
});

//api to  add new msg 
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//send data from form to dbs
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//api for redirected to  edit page
app.get("/chats/:id/edit", async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if(!chat){
    next(new ExpressError(404,"chat is not found")) ;}
  res.render("edit.ejs", { chat });
});

//api for update database edit msg
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newmsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newmsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//api for delete data from dbs
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

//error handler
app.use((err, req, res, next)=>{
  let {status, message} = err;
  res.status(status).send(message)
})