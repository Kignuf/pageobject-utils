import Selector from "./selector";

export interface ISelectorCollection {
	[key: string]: Selector;
}

export default abstract class BaseComponent<T extends ISelectorCollection> {
	protected selectors: T;

	constructor(selectors: T) {
		this.selectors = selectors;
	}

	protected abstract getElement(selectorKey: keyof T): WebdriverIO.Element;

	protected ensureExist(maxWait = 15 * 1000): void | never {
		let waited = 0;
		Object.values(this.selectors)
			.filter(selector => selector.isMandatory)
			.forEach(selector => {
				const begin = Date.now();
				const remainingWait = Math.max(0, maxWait - waited);
				$(selector.value).waitForExist(remainingWait);
				waited += Date.now() - begin;
			});
	}
}
