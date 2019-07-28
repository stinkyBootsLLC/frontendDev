/*

For this quiz, can you use this script, which is linked in the <head> of index.html,
to change the boring placeholder image to a picture of a cute animal?

Remember, you'll need to pass a function into the jQuery object to run
when the document is ready.

Unfortunately, placepuppy is no longer available. Here's a link to a random
animal image on lorempixel.com:
http://lorempixel.com/350/150/animals/

Good luck!

http://placekitten.com/350/150

*/

// first i need a function to change the attribute of image
function changeImagePlaceHolder(){
    // get the img element by traversing down the tree
    const sampleImageHolder = $('.article-list').children().first().find('img');
    // set the new attributes
    sampleImageHolder.attr({
        src: "http://placekitten.com/350/150",
        alt: "a stupid kitten",
        title: "photo by poop in my pants"
      });
    // debug  
    // console.log(sampleImageHolder);
}
// now call the function via jQuery 
$(changeImagePlaceHolder);

/*
// on method 
$( 'article' ).on( 'click', function( evt ) {
    console.log( evt );
});

// on methods have convinience methods
// https://api.jquery.com/category/events/


*/

