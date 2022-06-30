gallonsToPurchase: number;
costPerGallon: number;
totalCost: number;


ngOnInit() {
  this.pricingService.costPerGallon$
    .subscribe(costPerGallon => {
      this.costPerGallon = costPerGallon
      this.updateTotalCost();
    });
}

setGallonsToPurchase(gallonsToPurchase) {
  this.gallonsToPurchase = gallonsToPurchase;
  this.updateTotalCost();
}

updateTotalCost() {
  this.totalCost = gallonsToPurchase * costPerGallon;
}
