/** @format */

import { create } from 'zustand';
interface LayoutState {
	showMenu: boolean;
	setShowMenu: (showMenu: boolean) => void;
}

export const layoutSlice = create<LayoutState>(() => ({
	showMenu: false,
	setShowMenu: (showMenu) => ({ showMenu }),
}));
