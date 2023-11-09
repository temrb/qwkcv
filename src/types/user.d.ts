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
	block: Blocks;
};

type Blocks = {
	linkBlock?: {
		title: string;
		link: string;
		itemPosition: int;
	}[];
	imageBlock?: {
		title: string;
		imageURL: string;
		itemPosition: int;
	}[];
	videoBlock?: {
		title: string;
		videoURL: string;
		itemPosition: int;
	}[];
	referenceBlock: {
		name: string;
		linkedin: string;
		relationship: string;
		link?: string;
		company: string;
		itemPosition: int;
	}[];
};

export type { UserFormInput, Blocks };
