readonly costPerGallon$ = this.pricingService.costPerGallon$

readonly gallonsToPurchase$ =
  new BehaviorSubject<number>(0);

readonly totalCost$ = combineLatest([
  this.gallonsToPurchase$,
  this.costPerGallon$,
]).pipe(
  map( ([gallonsToPurchase, costPerGallon]) =>
    gallonsToPurchase * costPerGallon
));

setGallonsToPurchase$(gallonsToPurchase) {
  this.gallonsToPurchase$.next(gallonsToPurchase)
}

