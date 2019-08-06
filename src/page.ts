import BaseComponent, { ISelectorCollection } from "./base-component";
import Selector from "./selector";
import Widget from "./widget";

export default abstract class Page<T extends ISelectorCollection, U extends Widget<any>> extends BaseComponent<T> {

	constructor(
		selectors: T,
		private readonly widget?: new (containerElement: WebdriverIO.Element, ...args: any[]) => U,
		private readonly items?: Selector) {
		super(selectors);
	}

	private getItems(): WebdriverIO.Element[] {
		if (!this.items) {
			throw new Error(`"items" selector does not exist`);
		}

		return this.$$(this.items.value);
	}

	private getWidgets(): U[] {
		return this.getItems()
			.map(item => {
				if (!this.widget) {
					throw new Error(`"widget" property does not exist`);
				}
				return new this.widget(item);
			});
	}

	// private searchWidget() {
	// }
}
