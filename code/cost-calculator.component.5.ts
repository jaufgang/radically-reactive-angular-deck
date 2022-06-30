@Component({
  selector: 'cost-calculator',
  templateUrl: './cost-calculator.component.html',
  providers: [ComponentStore],
})
export class CostCalculator {
  // *** Selectors ***

  readonly costPerGallon$ = this.pricingService.costPerGallon$

  readonly gallonsToPurchase$ = this.store
    .select(state => state.gallonsToPurchase)

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
    private readonly store: ComponentStore<{ gallonsToPurchase: number; }>,
    private readonly pricingService: PricingService,
  ){
    this.store.setState({
      gallonsToPurchase: 0,
    })
  }

}
