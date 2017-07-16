'use strict';


class Deck {
    constructor(){       
        this.details={};
        this.defaults={
            partial_deck_default:'AS,KS,QS,JS,0S,9S,8S,7S,AC,KC,QC,JC,0C,9C,8C,7C,AD,KD,QD,JD,0D,9D,8D,7D,AH,KH,QH,JH,0H,9H,8H,7H',
            shuffle: true,
            deck_count:1,
            pile:'discard'
        }
        this._api = axios.create({
            baseURL: 'https://deckofcardsapi.com/api/deck/'
        });
    }



    /////////////////////////////////////////////////////////////////////////////////////////////
    // METHOD get()
    //      create a full deck of cards
    // PARAMETERS:
    //      shuffle: boolean
    //          Is deck shuffled upon return
    //      deck_count: integer
    //          the deck can consist of a number of packs of cards. 6 is common in blackjack
    // RETURNS:
    //      Returns a promise upon completition of the api call containing a single JSON object
    //      which is replicated in the Deck instance under Deck.details.
    //              {
    //                  deck_id:"pf64vhddltjv",
    //                  remaining:52,
    //                  shuffled:true
    //                  success:true
    //              }
    /////////////////////////////////////////////////////////////////////////////////////////////

    get( shuffle=this.defaults.shuffle, deck_count=this.defaults.deck_count){        
        shuffle = shuffle ? "shuffle/" : '';
        let params = {
            deck_count:deck_count
        }

        return this._api({
            method: 'get',
            url: 'new/'+shuffle,
            params: params
        }).then(res=>{
            if(res.status && res.status===200){
                this.details = res.data;
                return res.data
            }else{
                return Error("Error retrieving data from api")
            }            
        })
        .catch(error=> {
            console.log(error);
        });
    }





    /////////////////////////////////////////////////////////////////////////////////////////////
    // METHOD getPartial()
    //      create a partial deck of cards
    // PARAMETERS:
    //      shuffle: boolean
    //          is deck shuffled upon return
    //      deck_count: integer
    //          the deck can consist of a number of packs of cards. 6 is common in blackjack
    //      partial_deck: string
    //          a string of card codes to remain in the deck - the default is 7s and up
    // RETURNS:
    //      Returns a promise upon completition of the api call containing a single JSON object
    //      which is replicated in the Deck instance under Deck.details.
    //              {
    //                  deck_id:"pf64vhddltjv",
    //                  remaining:52,
    //                  shuffled:true
    //                  success:true
    //              }
    /////////////////////////////////////////////////////////////////////////////////////////////

    getPartial( shuffle=this.defaults.shuffle, deck_count=this.defaults.deck_count, partial_deck=this.defaults.partial_deck_default ){        
        shuffle = shuffle ? "shuffle/" : '';
        let params = {
            deck_count:deck_count,
            cards:partial_deck
        }

        return this._api({
            method: 'get',
            url: 'new/'+shuffle,
            params: params
        }).then(res=>{
            if(res.status && res.status===200){
                this.details = res.data;
                return res.data;
            }else{
                return Error("Error retrieving data from api")
            }            
        })
        .catch(error=> {
            console.log(error);
        });
    }
    




    /////////////////////////////////////////////////////////////////////////////////////////////
    // METHOD shuffle()
    //      shuffle the instance this is called on
    // PARAMETERS:
    //      NONE
    // RETURNS:
    //      Returns a promise upon completition of the api call containing a single JSON object
    //      which is replicated in the Deck instance under Deck.details.
    //              {
    //                  deck_id:"pf64vhddltjv",
    //                  remaining:52,
    //                  shuffled:true
    //                  success:true
    //              }
    /////////////////////////////////////////////////////////////////////////////////////////////
    shuffle(){        
        return this._api({
            method: 'get',
            url: this.details.deck_id+'/shuffle/',
        }).then(res=>{
            if(res.status && res.status===200){
                this.details = res.data;
                return res.data;
            }else{
                return Error("Error retrieving data from api")
            }            
        })
        .catch(error=> {
            console.log(error);
        });
    }





    /////////////////////////////////////////////////////////////////////////////////////////////
    // METHOD draw()
    //      draws a card or a number of cards from the deck instance
    // PARAMETERS:
    //      card_count: integer
    //          number of cards to draw or deal could be a single card or a full hand
    // RETURNS:
    //      Returns a promise upon completition of the api call containing a single JSON object
    //      which is replicated in the Deck instance under Deck.details.
    //              {
    //                  deck_id:"e2s9tbhfcg3k",
    //                  remaining:52,
    //                  success:true,
    //                  cards:[CARDS]
    //              }
    //                  CARDS is an array of the card(s) drawn, each array item caontains a JSON object
    //                  {
    //                       code:"AS",
    //                       image: url of png image file,
    //                      images:{
    //                          png: url of png image file,
    //                          svg: url of svg image file,
    //                      }
    //                      suit: "HEARTS",
    //                      value: "4"
    //                  }
    /////////////////////////////////////////////////////////////////////////////////////////////
    draw( card_count=1 ){        
        let params = {
            count:card_count
        }

        return this._api({
            method: 'get',
            url: this.details.deck_id+'/draw/',
            params: params
        }).then(res=>{
            if(res.status && res.status===200){
                this.details = Object.assign(this.details, res.data);
                return(res.data)
            }else{
                return Error("Error retrieving data from api")
            }            
        })
        .catch(error=> {
            console.log(error);
        });
    }
    




    /////////////////////////////////////////////////////////////////////////////////////////////
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
    /////////////////////////////////////////////////////////////////////////////////////////////
    discard(cards, pile=deck.defaults.pile){
        // https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S      
        
        let params = {
            cards:cards
        }
        return this._api({
            method: 'get',
            url: this.details.deck_id+'/pile/'+pile+'/add/',
            params: params
        }).then(res=>{
            if(res.status && res.status===200){
                this.details = Object.assign(this.details, res.data);
                return(res.data)
            }else{
                return Error("Error retrieving data from api")
            }            
        })
        .catch(error=> {
            console.log(error);
        });
    }





    /////////////////////////////////////////////////////////////////////////////////////////////
    // METHOD drawFromPile()
    //      draws the top card or a specific card or list of cards from a specified pile 
    // PARAMETERS:
    //      card_count: integer
    //          number of cards to draw or deal could be a single card or a full hand
    // RETURNS:
    //      Returns a promise upon completition of the api call containing a single JSON object
    //      which is replicated in the Deck instance under Deck.details.
    //              {
    //                  deck_id:"e2s9tbhfcg3k",
    //                  remaining:52,
    //                  success:true,
    //                  cards:[CARDS]
    //              }
    //                  CARDS is an array of the card(s) drawn, each array item caontains a JSON object
    //                  {
    //                       code:"AS",
    //                       image: url of png image file,
    //                      images:{
    //                          png: url of png image file,
    //                          svg: url of svg image file,
    //                      }
    //                      suit: "HEARTS",
    //                      value: "4"
    //                  }
    /////////////////////////////////////////////////////////////////////////////////////////////
    
    drawFromPile( pile=deck.defaults.pile, cards ){    
        // https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?cards=AS    
        let params = {
            cards:cards
        }

        return this._api({
            method: 'get',
            url: this.details.deck_id+'/pile/'+pile+'/draw/',
            params: params
        }).then(res=>{
            console.log(res.status)
            if(res.status && res.status===200){
                this.details = Object.assign(this.details, res.data);
                return(res.data)
            }else{
                return {}
            }            
        })
        .catch(error=> {
            console.log(error);
        });
    }

}