type Constructable = new (...args: any[]) => any;

type InjectableToken = string | symbol | Constructable;
type Provider = Constructable | { provide: InjectableToken; useClass: Constructable } | { provide: InjectableToken; useValue: any };