import BaseComponent, { ISelectorCollection } from "./base-component";
import getElement from "./utils/getelement";

export default abstract class Page<T extends ISelectorCollection> extends BaseComponent<T> {

	constructor(selectors: T) {
		super(selectors);
	}

	public getElement(selectorKey: keyof T): WebdriverIO.Element {
		return getElement(this.selectors[selectorKey]);
	}

	// private searchWidget() {
	// }
}
