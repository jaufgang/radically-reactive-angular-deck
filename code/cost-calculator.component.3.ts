@Component({
  selector: 'cost-calculator',
  templateUrl: './cost-calculator.component.html',
  providers: [ComponentStore],
})
export class CostCalculator {

  readonly costPerGallon$ = this.pricingService.costPerGallon$

  readonly gallonsToPurchase$ =
    new BehaviorSubject<number>(0);

  readonly totalCost$ = combineLatest([
    this.gallonsToPurchase$,
    this.costPerGallon$,
  ]).pipe(
    map(([gallonsToPurchase, costPerGallon]) =>
      gallonsToPurchase * costPerGallon
    ));

  // *** Updaters ***

  readonly setGallonsToPurchase = this.store.updater<number>(
    (state, gallonsToPuchase) =>
      ({...state, gallonsToPuchase })
  );

  constructor(
    private readonly store: ComponentStore<any>,
    private readonly pricingService: PricingService,
  ){
    this.store.setState({})
  }

}
