type UserFormInput = {
	name: string;
	photoURL?: string;
	blurb?: string;
	location: string;
	resumeURL: string;
	email?: string;
	linkedin: string;
	github?: string;
	website?: string;
	calendly?: string;
	options: {
		openToRelocation?: boolean;
		openToRemote?: boolean;
	};
	assets: {
		photoURL?: string;
		vimeoURL?: string;
	};
	block: Block;
};

type Block = {
	linkBlock?: {
		name: string;
		link: string;
		itemPosition: int;
	}[];
	referenceBlock?: {
		name: string;
		linkedin: string;
		relationship: string;
		link?: string;
		company: string;
		itemPosition: int;
	}[];
};

export type { UserFormInput, Block };
