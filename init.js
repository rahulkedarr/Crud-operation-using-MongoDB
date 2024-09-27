const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main()
.then(()=>{
    console.log("connection successfully")
}).catch((err)=> {
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chat');
};

// // insert single data
// let tryData = new Chat({
//     from: "rahul",
//     to: "sonali",
//     msg: "let meet",
//     created_at: new Date()
// });

// // after insertion need to run save function to add data in MongoDB
// tryData.save().then((result)=>{
//     console.log(result)
// }).
// catch((err)=>{
//     console.log(err)
// })

let allChats = [
    {
    from: "rahul",
    to: "suraj",
    msg: "hii",
    created_at: new Date()
},
{
    from: "suraj",
    to: "rahul",
    msg: "hello",
    created_at: new Date()
},
{
    from: "rahul",
    to: "suraj",
    msg: "let meet",
    created_at: new Date()
},
{
    from: "suraj",
    to: "rahul",
    msg: "ok",
    created_at: new Date()
},
]

// // insert multiple data
Chat.insertMany(allChats).then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
})
// // delete data from dbs
// Chat.findByIdAndDelete('66baf92f6c042cdb746bf5fb').then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)})