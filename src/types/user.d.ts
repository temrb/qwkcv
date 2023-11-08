export type UserFormInput = {
	name: string;
	photoURL?: string;
	blurb?: string;
	location: string;
	jobTitle: string;
	resumeURL?: string;
	email?: string;
	linkedin?: string;
	github?: string;
	website?: string;
	calendly?: string;
	options: {
		openToRelocation?: boolean;
		openToRemote?: boolean;
	};
	education?: {
		school: string;
		focus: string;
		degree: string;
		startDate: string;
		endDate?: string;
		gpa?: float;
		description?: string;
		itemPosition: number;
	}[];
	experience: {
		company: string;
		startDate: string;
		endDate?: string;
		description?: string;
		position: string;
		itemPosition: number;
	}[];
	skill?: {
		name: string;
		itemPosition: number;
	}[];
	project?: {
		name: string;
		description: string;
		link?: string;
		itemPosition: number;
	}[];
	reference?: {
		name: string;
		linkedin: string;
		relationship: string;
		link?: string;
		company: string;
		itemPosition: int;
	}[];
};
