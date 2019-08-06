import BaseComponent, { ISelectorCollection } from "./base-component";
import Selector from "./selector";

export interface IWidgetSelectorCollection extends ISelectorCollection {
	mainText: Selector;
}

export default abstract class Widget<T extends IWidgetSelectorCollection> extends BaseComponent<T> {
	constructor(selectors: T, containerElement: WebdriverIO.Element) {
		super(selectors, containerElement);
	}
}
