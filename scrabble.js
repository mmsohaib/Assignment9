// Muhammad Muneeb
// Assiginment 9
// Array for alphephtics with value and amount
// Thats where I found the value and amount of the tiles
// https://en.wikipedia.org/wiki/Scrabble_letter_distributions
var pieces = [
  {"letter":"A", "value":1,  "amount":9},
  {"letter":"B", "value":3,  "amount":2},
  {"letter":"C", "value":3,  "amount":2},
  {"letter":"D", "value":2,  "amount":4},
  {"letter":"E", "value":1,  "amount":12},
  {"letter":"F", "value":4,  "amount":2},
  {"letter":"G", "value":2,  "amount":3},
  {"letter":"H", "value":4,  "amount":2},
  {"letter":"I", "value":1,  "amount":9},
  {"letter":"J", "value":8,  "amount":1},
  {"letter":"K", "value":5,  "amount":1},
  {"letter":"L", "value":1,  "amount":4},
  {"letter":"M", "value":3,  "amount":2},
  {"letter":"N", "value":1,  "amount":6},
  {"letter":"O", "value":1,  "amount":8},
  {"letter":"P", "value":3,  "amount":2},
  {"letter":"Q", "value":10, "amount":1},
  {"letter":"R", "value":1,  "amount":6},
  {"letter":"S", "value":1,  "amount":4},
  {"letter":"T", "value":1,  "amount":6},
  {"letter":"U", "value":1,  "amount":4},
  {"letter":"V", "value":4,  "amount":2},
  {"letter":"W", "value":4,  "amount":2},
  {"letter":"X", "value":8,  "amount":1},
  {"letter":"Y", "value":4,  "amount":2},
  {"letter":"Z", "value":10, "amount":1},
  {"letter":"_", "value":0,  "amount":2}
];
// object Array for tiles
var tiles_on_track = [
  {"id": "piece0", "letter": "A"},
  {"id": "piece1", "letter": "B"},
  {"id": "piece2", "letter": "C"},
  {"id": "piece3", "letter": "D"},
  {"id": "piece4", "letter": "E"},
  {"id": "piece5", "letter": "F"},
  {"id": "piece6", "letter": "G"}
]
// keep track of board
var game_board_tiles = [
  {"id": "drop0",  "tile": "pieceX"},
  {"id": "drop1",  "tile": "pieceX"},
  {"id": "drop2",  "tile": "pieceX"},
  {"id": "drop3",  "tile": "pieceX"},
  {"id": "drop4",  "tile": "pieceX"},
  {"id": "drop5",  "tile": "pieceX"},
  {"id": "drop6",  "tile": "pieceX"},
  {"id": "drop7",  "tile": "pieceX"},
  {"id": "drop8",  "tile": "pieceX"},
  {"id": "drop9",  "tile": "pieceX"},
  {"id": "drop10", "tile": "pieceX"},
  {"id": "drop11", "tile": "pieceX"},
  {"id": "drop12", "tile": "pieceX"},
  {"id": "drop13", "tile": "pieceX"},
  {"id": "drop14", "tile": "pieceX"}
]
/**
* Use funtion to determine what word is and print it out to html doc and to
* the console and It also determines the score acording to the word.
*/
function word_search()
{
  var word = "";
  var score = 0;
  // j through the board to generate a words
  var i = 0;
  while(i < 15)
  {
    if(game_board_tiles[i].tile != "pieceX")
    {
      word = word + find_letter(game_board_tiles[i].tile);
      score = score + find_score(game_board_tiles[i].tile);
    }
    i++;
  }
  // check so it does'nt put double tiles. check if it returns 0 or 1.
  score = score + (score * should_double());
  // print the score of tile using HTML doc
  $("#score").html(score);
  // show black if there is no word
  if(word != "")
  {
    $("#word").html(word);
    return;
  }
  // or the word is blank
  $("#word").html("____");
}
// see if the tiles is placed at the double scored word by returing 1 or 0
function should_double()
{
  if(game_board_tiles[2].tile != "pieceX")
  {
    return 1;
  }
  if(game_board_tiles[12].tile != "pieceX")
  {
    return 1;
  }
  //else return 0.
  return 0;
}
 /**
 * return score according to the letter score the value in the piece.jason file.
 *
 * return 1 or 2 acording to the id
 */
function find_score(given_id)
{
  // see what letter we have
  var letter = find_letter(given_id);
  var score = 0;
  var i = 0;
  while(i < 27)
  {
    // see the object
    var obj = pieces[i];
    // See if the object is right
    if(obj.letter == letter)
    {
      score = obj.value;
      // see if its position 6th or 8th.
      score = score + (score * should_double_letter(given_id));
      return score;
    }
    i++;
  }
  // word is not right
  return -1;
}
// check by id to dropID and double the score
function should_double_letter(given_id)
{
  // see where dropID tile goes
  var dropID = find_tile_pos(given_id);
  // see if the drop id is single or not
  if(dropID == "drop6" || dropID == "drop8")
  {
    // return 1.
    return 1;
  }
  return 0;
}
 // this funtion is to find the ID that will return the letter it have
function find_letter(given_id)
{
  // Go through the 7 pieces,
  for(var i =0; i < 7; i++)
  {
    // check if the tiles are at right place
    if(tiles_on_track[i].id == given_id) {
      // retrun the letter
      return tiles_on_track[i].letter;
    }
  }
  return -1;
}

// Give this function a droppable ID and it returns which position in the array it is.
function find_board_pos(given_id)
{
  var i = 0;
  while(i < 15){
    if(game_board_tiles[i].id == given_id)
    {
      return i;
    }
    i++;
  }
  // Errors return -1.
  return -1;
}

// Given a tile, figure out which dropabble_tile_id it belongs to.
function find_tile_pos(given_id)
{
  for(var i = 0; i < 15; i++)
  {
    if(game_board_tiles[i].tile == given_id)
    {
      return game_board_tiles[i].id;
    }
  }
  return -1;
}

// random number to return number between min and max using Math.rand()
// I got this code from stackOverflow
// URL: https://stackoverflow.com/questions/1527803/generating-random
//-numbers-in-javascript-in-a-specific-range
function randInt(min, max)
{
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * load SCRABBLE Funtion loads and j through all the pieces on the_rack
 * there are only 7 tiles and its id's
 */
function load_scrabble_pieces()
{
  // making url for scrablle piece image
  var tiles_url = "img/scrabble/Scrabble_Tile_";
  var rand_num = 1;
  var piece = "<img class='pieces' id='piece" + i + "' src='" + tiles_url + rand_num + ".jpg" + "'></img>";
  var piece_ID = "";
  // 7 pieces loading on rack
  for(var i = 0; i < 7; i++)
  {
    // get rand number to create random number tiles we take 7 out 27 Tiles
    // by generating multiple ran nums
    var j = true;
    while(j == true)
    {
      rand_num = randInt(0, 26);
      // check to remove words from data structure
      if(pieces[rand_num].amount != 0)
      {
       j = false;
        pieces[rand_num].amount--;
      }
    }
    // make imag id and html to append tiles
    piece = "<img class='pieces' id='piece" + i + "' src='" + tiles_url + pieces[rand_num].letter + ".jpg" + "'></img>";
    piece_ID = "#piece" + i;
    tiles_on_track[i].letter = pieces[rand_num].letter;
    var tile_pos = $("#the_rack").position();
    // positioning the board pieces and img
    // -200 shift for left
    var img_left = -165 + (40 * i);
    // position of tiles on a track
    var img_top = -135;
    /*Load pieces to the page, and make them draggable.
       https://stackoverflow.com/questions/10863658/load-image-with-jquery-and-append-it-to-the-dom
       https://stackoverflow.com/questions/9704087/jquery-add-image-at-specific-co-ordinates
       placing tile pieces to screen
    **/
    $("#rack").append(piece);
    // move peices where the rack is
    $(piece_ID).css("left", img_left).css("top", img_top).css("position", "relative");
    // pieces dragable
    $(piece_ID).draggable();
  }
}

 // funtion to load targetimages to place the tiles
function load_droppable_targets()
{
  var tile_img_url = "img/scrabble/Scrabble_Droppable.png";
  var drop = "<img class='droppable' id='drop" + i + "' src='" + tile_img_url + "'></img>";
  var dropabble_tile_id = "#drop" + i;
  for(var i = 0; i < 15; i++)
  {
    drop = "<img class='droppable' id='drop" + i + "' src='" + tile_img_url + "'></img>";
    dropabble_tile_id = "#drop" + i;
    var tile_pos = $("#the_board").position();
    // Figure out where to put the droppable targets.
    var img_left = 0;
    var img_top = -125;
    // Add the img to the screen.
    $("#board").append(drop);
    // Reposition the img relative to the board.
    $(dropabble_tile_id).css("left", img_left).css("top", img_top).css("position", "relative");
    // Make the img droppable
    $(dropabble_tile_id).droppable({
      // cretae droable image on a board so it stays there
      //  https://jqueryui.com/droppable/#default
      drop: function(event, ui)
      {
        // check dropablle id
        var dropabble_tile_id = ui.draggable.attr("id");
        var droppableID = $(this).attr("id");
        // keep track that tiles is placed in board
        game_board_tiles[find_board_pos(droppableID)].tile = dropabble_tile_id;
        word_search();
      },
        // move tiles from board back
        // https://api.jqueryui.com/droppable/#event-out
        out: function(event, ui) {
        var dropabble_tile_id = ui.draggable.attr("id");
        var droppableID = $(this).attr("id");
        // check if tile is moved by mastakly
        if(dropabble_tile_id != game_board_tiles[find_board_pos(droppableID)].tile)
        {
          console.log("Wrong Move.");
          return;
        }
        // cehck that tile was removed
        game_board_tiles[find_board_pos(droppableID)].tile = "pieceX";
        // word update
        word_search();
      }
    });
  }
}
