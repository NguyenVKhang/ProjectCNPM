const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/now-showing", movieController.getMoviesNowShowing);
router.get("/coming-soon", movieController.getMoviesComingSoon);
router.post('/getmovie', movieController.getMovieByName)
router.post('/getdetailnow', movieController.getDetailMovieNowShowing)
router.post('/getdatailcoming', movieController.getDetailMovieComingSoon)
router.post('/getposition', movieController.getPosition);
router.get('/middleServer', movieController.getMiddle);
router.post('/updateStatus', movieController.updateStatus);
router.post('/updateStatusEmpty', movieController.updateStatusEmpty);
router.post('/getMovieByCinplex', movieController.getMovieByCinplex);


module.exports = router;    
