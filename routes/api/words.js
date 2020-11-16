const express = require('express');
const router = express.Router();
const words = require('../../Words')
const uuid = require('uuid')

//CRUD API for your Spanish flashcards!

//Gets all words
router.get('/', (req, res) => {
    res.json(words)
});

//Get single word
router.get('/:id', (req, res) => {
    const found = words.some(word => word.id === parseInt(req.params.id))

    if(found) {
        res.json(words.filter((word) => word.id === parseInt(req.params.id)));
    }

    else {
        res.status(400).json({msg: 'word not found'});
    }
})

//Create word!
router.post('/', (req, res) => {
   const newMember = {
    id: uuid.v4(),
    span: req.body.span,
    eng: req.body.eng,
    status: 'active'
};

    if(!newMember.span || !newMember.eng) {
        return res.status(400).json({ msg: 'Please include both an English and Spanish word!'});
    }   

    words.push(newMember);
    res.redirect('/');
});

//Update Word
router.put('/:id', (req, res) => {
    const found = words.some(word => word.id === parseInt(req.params.id))

    if(found) {
        const updateWord = req.body;
        words.forEach((word) => {
            if(word.id === parseInt(req.params.id)) {
                word.span = updateWord.span ? updateWord.span : word.span;
                word.eng = updateWord.eng ? updateWord.eng : word.eng;
            
                res.json({ msg: "word updated", word })
            }
        })
    }

    else {
        res.status(400).json({msg: 'word not found'});
    }
})

//Delete
router.delete('/:id', (req, res) => {
    const found = words.some(word => word.id === parseInt(req.params.id))

    if(found) {
        res.json({ msg: "word deleted", word: words.filter((word) => word.id !== parseInt(req.params.id)) });
    }

    else {
        res.status(400).json({msg: 'word not found'});
    }
})

module.exports = router;