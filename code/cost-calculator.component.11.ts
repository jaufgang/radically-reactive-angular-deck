@Component({
  selector: 'cost-calculator',
  templateUrl: './cost-calculator.component.html',
  providers: [ComponentStore],
})
export class CostCalculator {

  @Input() set productType(productType: string) {
    this.setProductType(productType)
  }

  // *** Selectors ***

  readonly productType$ = this.store
    .select(state=> state.productType);

  readonly costPerGallon$ = this.productType$.pipe(
    switchMap((productType) =>
      this.pricingService.getCostPerGallon(productType)
    )
  );

  readonly gallonsToPurchase$ = this.store
    .select(state => state.gallonsToPurchase)

  readonly totalCost$ = combineLatest([
    this.gallonsToPurchase$,
    this.costPerGallon$,
  ]).pipe(
    map(([gallonsToPurchase, costPerGallon]) =>
      gallonsToPurchase * costPerGallon
    ));

  readonly vm$=this.store.select(
    this.productType$,
    this.gallonsToPurchase$,
    this.costPerGallon$,
    this.totalCost$,
    (productType, gallonsToPurchase, costPerGallon, totalCost) =>
      ({productType, gallonsToPurchase, costPerGallon, totalCost}),
    {debounce: true}
  );

  // *** Updaters ***

  readonly setProductType = this.store.updater<string>(
    (state, productType) =>
      ({...state, productType })
  );

  readonly setGallonsToPurchase = this.store.updater<number>(
    (state, gallonsToPuchase) =>
      ({...state, gallonsToPuchase })
  );

  constructor(
    private readonly store: ComponentStore<{
      productType: string;
      gallonsToPurchase: number;
    }>,
    private readonly pricingService: PricingService,
  ){
    this.store.setState({
      productType: DEFAULT_PRODUCT_TYPE,
      gallonsToPurchase: 0,
    })
  }

}
