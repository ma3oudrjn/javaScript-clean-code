//prefer composition over inheristic


class Market {
constructor(name) {
    this.name = name;
}}

//not need extend market not relate to order
class MarketOrder  extends Maeket {
    constructor(name, price , market) {
        super(name, price);
        this.market = market;
        this.price = price;
        this.market = market;
    }

}

setMarket(name){
this.name = new Market(name)
}

//composition it not parent or child its just connect to gther