export interface ISelectorOptions {
	isMandatory?: boolean;
}
export type SelectorFn = () => void;
export type FindElementParam = string | SelectorFn;

export default class Selector implements ISelectorOptions {
	public readonly isMandatory: boolean;

	constructor(readonly value: FindElementParam, options?: ISelectorOptions ) {
		this.isMandatory = options ? Boolean(options.isMandatory) : true;
	}
}
