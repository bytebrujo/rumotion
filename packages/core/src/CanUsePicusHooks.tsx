import React, {createContext} from 'react';

export const CanUsePicusHooks = createContext<boolean>(false);

export const CanUsePicusHooksProvider: React.FC<{
	readonly children: React.ReactNode;
}> = ({children}) => {
	return (
		<CanUsePicusHooks.Provider value>
			{children}
		</CanUsePicusHooks.Provider>
	);
};
