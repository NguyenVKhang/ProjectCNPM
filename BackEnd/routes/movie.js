const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/now-showing", movieController.getMoviesNowShowing);
router.get("/coming-soon", movieController.getMoviesComingSoon);
router.get('/getmovie/:id', movieController.getMovie)
router.post('/getdetailnow', movieController.getDetailMovieNowShowing)
router.post('/getdatailcoming', movieController.getDetailMovieComingSoon)
router.post('/getposition', movieController.getPosition);
router.get('/middleServer', movieController.getMiddle);
router.post('/updateStatus', movieController.updateStatus);
router.post('/updateStatusEmpty', movieController.updateStatusEmpty);
router.post('/getMovieByCinplex', movieController.getMovieByCinplex);
router.get('/getShowTime/:id', movieController.getShowTime);
router.get('/getAllMovies', movieController.getAllMovies);

// http://localhost:3001/movies/postMovie
router.post('/postMovie', movieController.postMovie);
router.post('/deleteMovie', movieController.deleteMovie);
router.post('/updateMovie', movieController.updateMovie);

module.exports = router;    
