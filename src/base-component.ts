import { get } from "lodash";
import Selector, { FindElementParam } from "./selector";

export interface ISelectorCollection {
	[key: string]: Selector;
}

export default abstract class BaseComponent<T extends ISelectorCollection> {
	protected selectors: T;
	protected rootElement?: WebdriverIO.Element | null;

	constructor(selectors: T, rootElement?: WebdriverIO.Element) {
		this.selectors = selectors;
		this.rootElement = rootElement || null;
	}

	public ensureExist(maxWait = 15 * 1000): void | never {
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

	protected getElement(
		selectorKey: keyof T,
		maxRetries = 3,
		currentRetries = 0,
		): WebdriverIO.Element {

		let nbRetries = currentRetries;
		const selector: Selector = this.selectors[selectorKey];
		const elem = this.$(selector.value);
		const elemError: string = get(elem, "error.message", get(elem, "error", ""));
		if (elemError.includes("no such element")) {
			nbRetries += 1;
			if (nbRetries < maxRetries) {
				browser.pause(1000);
				return this.getElement(selectorKey, maxRetries, nbRetries);
			}
			throw new Error(`Failed to find "${selector.value}"`);
		}
		return elem;
	}

	protected $ = (selector: FindElementParam): WebdriverIO.Element => {
		if (this.rootElement) {
			return this.rootElement.$(selector);
		}
		return $(selector);
	}

	protected $$ = (selector: FindElementParam): WebdriverIO.Element[] => {
		if (this.rootElement) {
			return this.rootElement.$$(selector);
		}
		return $$(selector);
	}
}
