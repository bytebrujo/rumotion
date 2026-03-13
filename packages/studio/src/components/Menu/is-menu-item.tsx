export const MENU_INITIATOR_CLASSNAME = '__picus-studio-menu-initiator';
export const MENU_ITEM_CLASSNAME = '__picus-studio-menu-item';
export const HORIZONTAL_SCROLLBAR_CLASSNAME = '__picus-horizontal-scrollbar';
export const VERTICAL_SCROLLBAR_CLASSNAME = '__picus-vertical-scrollbar';

export const isMenuItem = (el: HTMLElement): boolean => {
	return Boolean(
		el.classList.contains(MENU_ITEM_CLASSNAME) ||
		el.closest(`.${MENU_ITEM_CLASSNAME}`) ||
		el.classList.contains(MENU_INITIATOR_CLASSNAME) ||
		el.closest(`.${MENU_INITIATOR_CLASSNAME}`),
	);
};
