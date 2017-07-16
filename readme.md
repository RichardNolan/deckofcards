## Deck of Cards
This is an an unofficial deck of cards libary for the fantastic [deckofcardsapi](http://www.deckofcardsapi.com).

The only dependency is [axios](https://github.com/mzabriskie/axios) which is used for the api calls, but this could easily be swapped out for Jquery, fetch or any other ajax libary.

It is written in ES2015 javascipt. 


## Usage
1. include deckofcards.js as a script in the head of your page

```
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.16.2/axios.min.js"></script>
        <script src="deckofcards.js"></script>
        <script>
            //your code can go here
        </script>
    </head>
    <body>

    </body>
</html>
```

2. In your code initiate the Deck like so
```

const deck = new Deck();
deck.get().then(()=>{

    // YOUR CODE HERE

});
```

## API Reference
- get
```
    METHOD get()
         create a full deck of cards
    PARAMETERS:
         shuffle: boolean
             Is deck shuffled upon return
         deck_count: integer
             the deck can consist of a number of packs of cards. 6 is common in blackjack
    RETURNS:
         Returns a promise upon completition of the api call containing a single JSON object
         which is replicated in the Deck instance under Deck.details.
                 {
                     deck_id:"pf64vhddltjv",
                     remaining:52,
                     shuffled:true
                     success:true
                 }
```

-getPartial
```
    METHOD getPartial()
         create a partial deck of cards
    PARAMETERS:
         shuffle: boolean
             is deck shuffled upon return
         deck_count: integer
             the deck can consist of a number of packs of cards. 6 is common in blackjack
         partial_deck: string
             a string of card codes to remain in the deck - the default is 7s and up
    RETURNS:
         Returns a promise upon completition of the api call containing a single JSON object
         which is replicated in the Deck instance under Deck.details.
                 {
                     deck_id:"pf64vhddltjv",
                     remaining:52,
                     shuffled:true
                     success:true
                 }
```

-shuffle
```
    METHOD shuffle()
         shuffle the instance this is called on
    PARAMETERS:
         NONE
    RETURNS:
         Returns a promise upon completition of the api call containing a single JSON object
         which is replicated in the Deck instance under Deck.details.
                 {
                     deck_id:"pf64vhddltjv",
                     remaining:52,
                     shuffled:true
                     success:true
                 }
```

-draw
```
METHOD draw()
         draws a card or a number of cards from the deck instance
    PARAMETERS:
         card_count: integer
             number of cards to draw or deal could be a single card or a full hand
    RETURNS:
         Returns a promise upon completition of the api call containing a single JSON object
         which is replicated in the Deck instance under Deck.details.
                 {
                     deck_id:"e2s9tbhfcg3k",
                     remaining:52,
                     success:true,
                     cards:[CARDS]
                 }
                     CARDS is an array of the card(s) drawn, each array item caontains a JSON object
                     {
                          code:"AS",
                          image: url of png image file,
                         images:{
                             png: url of png image file,
                             svg: url of svg image file,
                         }
                         suit: "HEARTS",
                         value: "4"
                     }
```

-discard
```
    METHOD discard()
         discards a card or list of cards (codes) that have been drawn from the deck
    PARAMETERS:
         cards: string
             a string of card codes to discard
         pile: string
             a name for the discard pile, this allows for multiple discard piles. Default is discard
    RETURNS:
         Returns a promise upon completition of the api call containing a single JSON object
         which is replicated in the Deck instance under Deck.details.
                 {
                     deck_id:"pf64vhddltjv",
                     remaining:52,
                     piles:{
                         PILE_NAME:{
                             remaining:1
                         }
                     }
                     success:true
                 }
```

-drawFromPile
```
    METHOD drawFromPile()
         draws the top card or a specific card or list of cards from a specified pile 
    PARAMETERS:
         card_count: integer
             number of cards to draw or deal could be a single card or a full hand
    RETURNS:
         Returns a promise upon completition of the api call containing a single JSON object
         which is replicated in the Deck instance under Deck.details.
                 {
                     deck_id:"e2s9tbhfcg3k",
                     remaining:52,
                     success:true,
                     cards:[CARDS]
                 }
                     CARDS is an array of the card(s) drawn, each array item caontains a JSON object
                     {
                          code:"AS",
                          image: url of png image file,
                         images:{
                             png: url of png image file,
                             svg: url of svg image file,
                         }
                         suit: "HEARTS",
                         value: "4"
                     }
```