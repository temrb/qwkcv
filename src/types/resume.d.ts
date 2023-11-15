type ResumeFormInput = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	location: string;
	website: string;
	linkedin: string;
	github: string;

	ProfessionalExperience: {
		companyName: string;
		companyLocation: string;
		jobTitle: string;
		startDate: string;
		endDate?: string;
		bulletPoints: string[];
	}[];

	Projects: {
		projectName: string;
		projectDescription: string;
		startDate: string;
		endDate?: string;
		bulletPoints: string[];
	}[];

	Education: {
		schoolName: string;
		degree: string;
		fieldOfStudy: string;
		startDate: string;
		endDate?: string;
		bulletPoints: string[];
	}[];

	Skills: {
		skillName: string;
		skillType: SkillType;
	}[];
};

type SkillType = 'General' | 'Technical' | 'Other' | 'Certification';

export type { ResumeFormInput };
