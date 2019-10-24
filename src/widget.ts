import BaseComponent, { SelectorCollection } from "./base-component";
import Selector from "./selector";

export interface IWidgetSelectorCollection extends SelectorCollection {
	mainText: Selector;
}

export default abstract class Widget<T extends IWidgetSelectorCollection> extends BaseComponent<T> {
	constructor(selectors: T, containerElement: WebdriverIO.Element) {
		super(selectors, containerElement);
	}
}
