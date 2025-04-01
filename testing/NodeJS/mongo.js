const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://franciscoaragones2014:${password}@cluster0.exm12.mongodb.net/TestFullstackBootcamp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Note = mongoose.model('Note', noteSchema)

  
  const note = new Note({
    content: 'HTML is x 2',
    important: false,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  
//   Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })
})
