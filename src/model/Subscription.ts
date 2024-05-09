import { subscribe } from 'diagnostics_channel';

type subscribe<Generic> = (latest: Generic, values: Array<Generic>) => void;
type emitted<Generic> = (Subscription: subscribe<Generic>) => void;

export class Subscription<Generic> {
  private subscriptions: Array<subscribe<Generic>> = [];
  private emitted: emitted<Generic> = (subscription) => {};
  private _values: Array<Generic> = [];

  subscribe(subscription: subscribe<Generic>): number {
    this.emitted(subscription);
    this.subscriptions = this.subscriptions.concat(subscription);
    return this.subscriptions.length - 1;
  }
  unsubscribe(key: number) {
    this.subscriptions.splice(key, 1);
  }
  set value(value: Generic) {
    this._values.push(value);
    this.emitted = (subscription) => subscription(value, this._values);
    this.subscriptions.forEach((subscription) =>
      subscription(value, this._values)
    );
  }
  set values(values: Array<Generic>) {
    this._values = values;
    const latest: Generic = this._values[this._values.length - 1];
    this.emitted = (subscription) => subscription(latest, this._values);
    this.subscriptions.forEach((subscription) =>
      subscription(latest, this._values)
    );
  }
}
