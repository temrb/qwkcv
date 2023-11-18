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
	assets: {
		photoURL?: string;
		vimeoURL?: string;
	};
	block: Block;
};

type Block = {
	linkBlock?: {
		name: string;
		description: string;
		link: string;
		itemPosition: number;
	}[]?;
	referenceBlock?: {
		name: string;
		linkedin: string;
		relationship: string;
		link?: string;
		company: string;
		itemPosition: number;
	}[]?;
};

export type { UserFormInput, Block };
