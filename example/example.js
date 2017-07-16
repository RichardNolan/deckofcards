
const deck = new Deck();
deck.get().then(()=>{

    document.getElementById('draw').addEventListener('click', drawEvent);
    document.getElementById('draw2').addEventListener('click', (e)=>drawEvent(e,2));
    document.getElementById('draw5').addEventListener('click', (e)=>drawEvent(e,5));
    document.getElementById('drawDiscard').addEventListener('click', drawDiscardEvent);
    

    
    deck.shuffle().then(res=>{console.log(res)})
    deck.draw()
        .then(res=>{
            console.log(res)          
            deck.discard(res.cards[0].code);
        });
    deck.draw()
        .then(res=>{
            console.log(res.cards[0])            
            deck.discard(res.cards[0].code);
        });


   
   function drawEvent(e, num=1){
       console.log("Drawing "+num)
        deck.draw(num).then(res=>{
            console.log(res.cards);
            for(c in res.cards){
                let card = document.createElement("IMG");
                card.src = res.cards[c].images.png;
                document.getElementsByTagName('body')[0].appendChild(card)
            }
        });
   }
   
   function drawDiscardEvent(){
        deck.drawFromPile().then(res=>{
            if(res){
                for(c in res.cards){
                    let card = document.createElement("IMG");
                    card.src = res.cards[c].images.png;
                    document.getElementsByTagName('body')[0].appendChild(card)
                }
            }
        });
   }
    
});
