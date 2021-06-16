const chalk = require('chalk');
const fs = require('fs');

// adds new notes to json file
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title;
    // })

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        console.log(chalk.blue.bold('New note added'));
    } else {
        console.log(chalk.yellow.bold('Note title already taken'));
    }
}

// remove notes
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title != title);

    if (notes.length != notesToKeep.length) {
        console.log(chalk.green.bold('Note Removed'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.bold('Nothing Removed'));
    }
}

//listing notes
const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.magenta('Your Notes'));
    let count = 0;

    notes.forEach((note, count) => {
        console.log(chalk.yellow.green(count + 1) + ' -->', chalk.bold.italic.cyan(note.title));
    })
}

// reading note
const readNote = (title) => {
    const notes = loadNotes();

    const matching = notes.find((note) => note.title === title);

    if (matching) {
        console.log(chalk.bold.green('Your Note'));
        console.log('Title :', chalk.bold.magenta(matching.title));
        console.log('Body :', chalk.italic.blue(matching.body));
    } else {
        console.log(chalk.red.bold('Nothing Found'));
    }
}

// loads already existing json onjects inside json file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

// saves the entered object in the json file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

// component exporter
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
};