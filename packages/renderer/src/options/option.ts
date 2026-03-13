import type {TypeOfOption} from '../client';

export type PicusOption<SsrName extends string, Type> = {
	name: string;
	cliFlag: string;
	ssrName: SsrName | null;
	description: (mode: 'ssr' | 'cli') => React.ReactNode;
	docLink: string | null;
	type: Type;
	getValue: (
		values: {commandLine: Record<string, unknown>},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		more?: any,
	) => {
		value: Type;
		source: string;
	};
	setConfig: (value: Type) => void;
	id: string;
};

export type AnyPicusOption<T> = PicusOption<string, T>;

// Intentional any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ToOptions<T extends Record<string, AnyPicusOption<any>>> = {
	[K in keyof T]: TypeOfOption<T[K]>;
};
