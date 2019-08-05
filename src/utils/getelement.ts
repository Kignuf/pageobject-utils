import { get } from "lodash";
import Selector from "../selector";

export default function getElement(
	selector: Selector,
	maxRetries = 3,
	currentRetries = 0,
	): WebdriverIO.Element {

	let nbRetries = currentRetries;
	const elem = $(selector.value);
	const elemError: string = get(elem, "error.message", get(elem, "error", ""));
	if (elemError.includes("no such element")) {
		nbRetries += 1;
		if (nbRetries < maxRetries) {
			browser.pause(1000);
			return getElement(selector, maxRetries, nbRetries);
		}
		throw new Error(`Failed to find "${selector.value}"`);
	}
	return elem;
}
