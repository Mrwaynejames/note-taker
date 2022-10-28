const express = require('express');
const path = require('path');
const fs = require('fs');
let notes = require('./db/db.json');
const uuid = require('./helpers/uuid');
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// joining to the home html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//get for all notes
app.get('/api/notes', (req, res) => {
res.json(`${req.method} request received for notes `);
console.info(`${req.method} request received for notes`);
});
//get for idividual notes
app.get('/api/notes/:note_id', (req, res) => {
    if (req.body && req.params.note_id) {
      console.info(`${req.method} request received for a note`);
      const reviewId = req.params.review_id;
      for (let i = 0; i < reviews.length; i++) {
        const currentNote = notes[i];
        if (currentNote.note_id === noteId) {
          res.json(currentNote);
          return;
        }
      }
      res.json('Note ID not found');
    }
  });
//too add a new note
  app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    //making sure new note has required fields
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err,data) => {
            if(err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
                //pushing the new note
                parsedNotes.push(newNote);
                notes = parsedNotes;

                fs.writeFile('./db/db.json',
                JsON.stringify(parsedNotes),
                (writeErr)=> writeErr ? console.err(writeErr)
                :console.info('Updated Notes')
                );
            }
        });
        const response = {status: 'success', body: newNote,};
        console.log(response);
        res.json(response);
    }else {
        res.json('new note error');
    }
  });

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);