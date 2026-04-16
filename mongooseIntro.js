// const mongoose = require('mongoose');

// // mongoose
// //   .connect('mongodb://localhost:27017/new_db')
// //   .then(() => console.log('Connection to DB OK'))
// //   .catch(err => console.log('err', err));

// (async function () {
//   try {
//     mongoose.connect('mongodb://localhost:27017/new_db');
//     console.log('Connection to DB OK');

//     const taskSchema = new mongoose.Schema({
//       value: String,
//     });
//     const Task = mongoose.model('Task', taskSchema);
//     // C - INSERT - insertOne/insertMany

//     // const newTask = { value: 'To do HW' };
//     // const createdTask = await Task.create(newTask);
//     // console.log('createdTask', createdTask);

//     // R - SELECT - find
//     // const foundTasks = await Task.find();
//     // console.log('foundTasks', foundTasks);

//     // const foundTaskById = await Task.findById('69da5bfe4ea229ded5778984');
//     // console.log('foundTaskById', foundTaskById);

//     // U - UPDATE - updateOne/updateMany

//     // const updatedTask = await Task.findByIdAndUpdate(
//     //   '69da5bfe4ea229ded5778984',
//     //   { value: 'Updated Task 2' },
//     //   { new: true }
//     // );
//     // console.log('updatedTask', updatedTask);

//     //D - DELETE
//     const deletedTask = await Task.findByIdAndDelete(
//       '69da5bfe4ea229ded5778984'
//     );
//     console.log('deletedTask', deletedTask);
//   } catch (error) {
//     console.log('err', err);
//   }
// })();
