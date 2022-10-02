const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

const { Songs } = require('../models');

router.post('/save', async (req, res) => {
    const songData = req.body;

    try {
        const song = await Songs.create(songData);
        res.json(song);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get('/getAll', async (req, res) => {
    try {

        const allSongs = await Songs.findAll({
            where: {
                privacy: 'public'
            }
        });

        res.json(allSongs);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})


router.get('/getLibrary/:uid', async (req, res) => {
    const uid = req.params.uid;
    try {
        const mySongs = await Songs.findAndCountAll({
            where: {
                uid
            }
        })
        res.json(mySongs);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.get('/get/:sid', async (req, res) => {
    const sid = req.params.sid;
    try {
        const song = await Songs.findByPk(sid);
        res.json(song);
    }
    catch (e) {
        res.status(400).json({ error: e.message });
    }
})

router.post('/updateCount', async (req, res) => {
    const { sid } = req.body;
    await Songs.increment({playCount: 1}, {where: {sid}})
})

router.get('/uploadCount/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const uploadCount = await Songs.count({
            where: {
                uid
            }
        })
        res.json(uploadCount);
    }catch(e){
        res.status(400).json({error: e.message});
    }
})

router.get('/similar/:sid', async (req, res) => {
    const { sid } = req.params;

    try{
        const song = await Songs.findByPk(sid);
        const similarSongs = await Songs.findAll({
            where: {
                [Op.or] : [
                    { artist: song.artist },
                    { album: song.album},
                    { uid: song.uid}
                ]
            },
            limit: 10,
            order : [
                ['playCount', 'ASC']
            ]
        })
        res.json(similarSongs);
    }
    catch(e){
        res.status(400).json({error: e.message});
    }
})

router.get('/recent', async (req, res) => {
    try {
        const recent = await Songs.findAll({
            limit: 9,
            order : [
                ['playCount', 'ASC']
            ]
        })
        res.json(recent);
    }
    catch(e) {
        res.status(400).json({error: e.message});
    }
})
module.exports = router;