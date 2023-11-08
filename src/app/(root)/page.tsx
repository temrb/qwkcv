'use client';

import base64url from 'base64url';

import {
	Book,
	Briefcase,
	Building2,
	CalendarRange,
	CaseSensitive,
	ChevronDown,
	ChevronUp,
	FileText,
	Focus,
	Github,
	GraduationCap,
	HeartHandshake,
	Image as ImageIcon,
	Link as LinkIcon,
	Linkedin,
	Mail,
	MapPin,
	Plus,
	Save,
	School2,
	Text,
	Trash2,
	User2,
} from 'lucide-react';
import React, { useState } from 'react';
import {
	useForm,
	SubmitHandler,
	useFieldArray,
	useWatch,
	Control,
} from 'react-hook-form';
import { UserFormInput } from '@/types/user';

const Home = () => {
	const [loading, setLoading] = useState(false);

	const [options, setOptions] = useState({
		openToRelocation: false,
		openToRemote: false,
	});

	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<UserFormInput>({});

	const skillsText = useWatch({
		control,
		name: 'skill',
	});

	const referenceArray = useFieldArray({
		control,
		name: 'reference',
	});

	const experienceArray = useFieldArray({
		control,
		name: 'experience',
	});

	const educationArray = useFieldArray({
		control,
		name: 'education',
	});

	const skillArray = useFieldArray({
		control,
		name: 'skill',
	});

	const projectArray = useFieldArray({
		control,
		name: 'project',
	});

	const handleAddReference = () => {
		referenceArray.append({
			name: '',
			linkedin: '',
			company: '',
			relationship: '',
			link: '',
			itemPosition: 0,
		});
	};
	const handleAddExperience = () => {
		experienceArray.append({
			company: '',
			position: '',
			startDate: '',
			endDate: '',
			description: '',
			itemPosition: 0,
		});
	};

	const handleAddEducation = () => {
		educationArray.append({
			school: '',
			degree: '',
			focus: '',
			startDate: '',
			endDate: '',
			gpa: '',
			description: '',
			itemPosition: 0,
		});
	};

	const handleAddSkill = () => {
		skillArray.append({
			name: skillsText?.toString() || '',
			itemPosition: 0,
		});
	};

	const handleAddProject = () => {
		projectArray.append({
			name: '',
			link: '',
			description: '',
			itemPosition: 0,
		});
	};

	const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
		const encodedData = base64url.encode(JSON.stringify(data));
		window.open(`/cv/${encodedData}`, '_blank');
	};

	return (
		<form className='mx-auto h-full max-w-3xl flex-col items-center justify-center space-y-4'>
			<div className='w-full space-y-6'>
				<div className='flex w-full flex-col space-y-6'>
					<div className='flex flex-col items-center justify-between space-y-4 lg:flex-row lg:space-x-2 lg:space-y-0'>
						<div className='flex w-full flex-col space-y-2'>
							<span className='flex flex-row items-center space-x-2'>
								<User2 size={16} />
								<p
									className={`w-full truncate text-ellipsis text-sm
								${errors.name && 'error-text'}`}
								>
									{errors.name ? 'Name Required' : 'Name'}
								</p>
							</span>
							<input
								className={`primary-input w-full text-xs lg:w-72
									${errors.name && 'error-input'}
									${loading && 'cursor-progress'}`}
								type='text'
								placeholder={
									errors.name ? 'Name Required' : 'Tem'
								}
								required
								{...register('name', {
									required: true,
								})}
							/>
						</div>
						<div className='flex w-full flex-col space-y-2'>
							<span className='flex flex-row items-center space-x-2'>
								<Briefcase size={16} />
								<p
									className={`w-full truncate text-ellipsis text-sm
								${errors.jobTitle && 'error-text'}`}
								>
									{errors.jobTitle
										? 'Job Title Required'
										: 'Job Title'}
								</p>
							</span>
							<input
								className={`primary-input w-full text-xs lg:w-72
									${errors.jobTitle && 'error-input'}
									${loading && 'cursor-progress'}`}
								type='text'
								placeholder={
									errors.jobTitle
										? 'Job Title Required'
										: 'Product Designer'
								}
								required
								{...register('jobTitle', {
									required: true,
								})}
							/>
						</div>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<Text size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.blurb && 'error-text'}`}
							>
								{errors.blurb ? 'Blurb Required' : 'Blurb'}
							</p>
						</span>
						<textarea
							className={`text-area h-20 text-xs font-light
								${errors.blurb && 'error-input'}
								${loading && 'cursor-progress'}
								`}
							placeholder='I am a Product Designer with 5 years of experience in the field. I have worked with companies like Google, Facebook, and Amazon.'
							{...register('blurb', {
								required: false,
							})}
						/>
					</div>
				</div>

				{/* links */}
				<div className='grid items-center gap-4 space-y-4 px-2 lg:grid-cols-2 lg:space-y-0 lg:px-0'>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<ImageIcon size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.photoURL && 'error-text'}`}
							>
								{errors.photoURL
									? 'Enter valid URL'
									: 'Photo URL'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72
								${errors.photoURL && 'error-input'}
								${loading && 'cursor-progress'}`}
							type='text'
							placeholder='https://...'
							{...register('photoURL', {
								pattern: {
									value: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
									message:
										'Entered value does not match website format',
								},
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<MapPin size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.location && 'error-text'}`}
							>
								{errors.location
									? 'Location Required'
									: 'Current Location'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72
								${errors.location && 'error-input'}
								${loading && 'cursor-progress'}`}
							type='text'
							placeholder='City'
							required
							{...register('location', {
								required: true,
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<FileText size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.resumeURL && 'error-text'}`}
							>
								{errors.resumeURL
									? 'Enter valid URL'
									: 'Resume URL'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72
								${errors.resumeURL && 'error-input'}
								${loading && 'cursor-progress'}`}
							type='url'
							placeholder='https://docs.google.com/document/d/{id}'
							{...register('resumeURL', {
								pattern: {
									value: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
									message:
										'Entered value does not match website format',
								},
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<Mail size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.email && 'error-text'}`}
							>
								{errors.email ? 'Enter valid email' : 'Email'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72
							${errors.email && 'error-input'}
							${loading && 'cursor-progress'}`}
							type='email'
							placeholder='superdupercoolemail@gmail.com'
							{...register('email', {
								pattern: {
									value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
									message:
										'Entered value does not match email format',
								},
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<Linkedin size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.linkedin && 'error-text'}`}
							>
								{errors.linkedin
									? 'Enter valid LinkedIn URL'
									: 'LinkedIn'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72
							${errors.linkedin && 'error-input'}
							${loading && 'cursor-progress'}`}
							type='url'
							placeholder='https://www.linkedin.com/in/...'
							{...register('linkedin', {
								pattern: {
									value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
									message:
										'Entered value does not match LinkedIn format',
								},
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<Github size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.github && 'error-text'}`}
							>
								{errors.github
									? 'Enter valid GitHub URL'
									: 'GitHub'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72 ${
								errors.github && 'error-input'
							}
					${loading && 'cursor-progress'}`}
							type='url'
							placeholder='https://github.com/...'
							{...register('github', {
								pattern: {
									value: /^https?:\/\/(www\.)?github.com\/[A-Za-z0-9_-]+/,
									message:
										'Entered value does not match GitHub format',
								},
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<LinkIcon size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.website && 'error-text'}`}
							>
								{errors.website ? 'Enter valid URL' : 'Website'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72
							${errors.website && 'error-input'} ${loading && 'cursor-progress'}`}
							type='url'
							placeholder='Personal Website'
							{...register('website', {
								pattern: {
									value: /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
									message:
										'Entered value does not match website format',
								},
							})}
						/>
					</div>
					<div className='flex w-full flex-col space-y-2'>
						<span className='flex flex-row items-center space-x-2'>
							<CalendarRange size={16} />
							<p
								className={`w-full truncate text-ellipsis text-sm
							${errors.calendly && 'error-text'}`}
							>
								{errors.calendly
									? 'Enter valid Calendly event URL'
									: 'Calendly Event'}
							</p>
						</span>
						<input
							className={`primary-input w-full text-xs lg:w-72 ${
								errors.calendly && 'error-input'
							} ${loading && 'cursor-progress'}`}
							type='url'
							placeholder=' https://calendly.com/.../...'
							{...register('calendly', {
								pattern: {
									value: /^https?:\/\/(www\.)?calendly\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/,
									message:
										'Entered value does not match Calendly format',
								},
							})}
						/>
					</div>
				</div>

				{/* references */}
				<div className='space-y-2'>
					<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
						<h1 className='text-sm font-semibold lg:text-lg'>
							References
						</h1>
					</div>
					<div className='flex flex-col space-y-7 pt-2'>
						{referenceArray.fields.map((item, index) => (
							<div
								key={item.id}
								className='flex w-full space-x-4'
							>
								<div className='grid w-full grid-cols-2 items-center gap-2 space-y-2'>
									<span className='flex flex-row items-center space-x-2 font-light'>
										<CaseSensitive size={18} />
										<input
											className={`primary-input w-full text-xs lg:w-56
											${errors.reference?.[index]?.name && 'error-input'}
											${loading && 'cursor-progress'}`}
											type='text'
											placeholder='Name'
											{...register(
												`reference.${index}.name`,
												{
													required: true,
												},
											)}
										/>
									</span>
									<span className='flex flex-row items-center space-x-2 font-light'>
										<Linkedin size={18} />
										<input
											className={`primary-input w-full text-xs lg:w-56
											${loading && 'cursor-progress'}`}
											type='url'
											placeholder='Reference LinkedIn'
											{...register(
												`reference.${index}.linkedin`,
												{
													required: false,
													pattern: {
														value: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
														message:
															'Entered value does not match LinkedIn format',
													},
												},
											)}
										/>
									</span>
									<span className='flex flex-row items-center space-x-2 font-light'>
										<Building2 size={18} />
										<input
											className={`primary-input w-full text-xs lg:w-56
											${errors.reference?.[index]?.company && 'error-input'}
											${loading && 'cursor-progress'}`}
											type='text'
											placeholder='Company'
											{...register(
												`reference.${index}.company`,
												{
													required: true,
												},
											)}
										/>
									</span>
									<span
										className={
											'flex flex-row items-center space-x-2 font-light'
										}
									>
										<HeartHandshake size={18} />
										<input
											className={`primary-input w-full text-xs lg:w-56
											${errors.reference?.[index]?.relationship && 'error-input'}
											${loading && 'cursor-progress'}`}
											type='text'
											placeholder='Relationship'
											{...register(
												`reference.${index}.relationship`,
												{
													required: true,
												},
											)}
										/>
									</span>
									<span className='flex flex-row items-center space-x-2 font-light '>
										<LinkIcon size={18} />
										<input
											className={`primary-input w-full text-xs lg:w-56
											${errors.reference?.[index]?.link && 'error-input'}
											${loading && 'cursor-progress'}`}
											type='url'
											placeholder='Reference Link'
											{...register(
												`reference.${index}.link`,
												{
													required: false,
													pattern: {
														value: /^https?:\/\/(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]{2,3}(\/[a-zA-Z0-9_-]+)*\/?$/,
														message:
															'Entered value does not match website format',
													},
												},
											)}
										/>
									</span>
								</div>
								<div className='flex w-10 flex-col items-center justify-start space-y-4'>
									<p className='h-fit w-full items-center rounded-full bg-bgAccentDark/30 p-2 text-center text-sm font-semibold dark:bg-bgAccentLight/30'>
										{index + 1}
									</p>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											referenceArray.move(
												index,
												index - 1,
											);
										}}
									>
										{index !== 0 && <ChevronUp size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											referenceArray.move(
												index,
												index + 1,
											);
										}}
									>
										{index !==
											referenceArray.fields.length -
												1 && <ChevronDown size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											referenceArray.remove(index);
										}}
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						))}
						<span className='flex w-full justify-center'>
							<button
								className='primary-button flex w-fit flex-row items-center space-x-2'
								type='button'
								onClick={handleAddReference}
							>
								<Plus size={14} />
								<p className='text-sm font-semibold'>Add</p>
							</button>
						</span>
					</div>
				</div>

				{/* experience */}
				<div className='space-y-2'>
					<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
						<h1 className='text-sm font-semibold lg:text-lg'>
							Experience
						</h1>
					</div>
					<div className='flex flex-col space-y-7 pt-2'>
						{experienceArray.fields.map((item, index) => (
							<div
								key={item.id}
								className='flex w-full space-x-4'
							>
								<div className='flex h-full w-full flex-col space-y-4'>
									<div className='grid w-full grid-cols-2 items-center gap-2 space-y-2'>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<Building2 size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.experience?.[index]?.company && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='Company'
												{...register(
													`experience.${index}.company`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<CaseSensitive size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.experience?.[index]?.position && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='Position'
												{...register(
													`experience.${index}.position`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<p className='text-xs'>Start</p>
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.experience?.[index]?.startDate && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='date'
												placeholder='Start Date'
												{...register(
													`experience.${index}.startDate`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<p className='text-xs'>End</p>
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.experience?.[index]?.endDate && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='date'
												placeholder='End Date'
												{...register(
													`experience.${index}.endDate`,
													{
														required: false,
													},
												)}
											/>
										</span>
									</div>
									<span className='flex w-full flex-row items-center space-x-2 font-light'>
										<Text size={18} />
										<textarea
											className={`text-area h-20 w-full text-xs font-light
												${errors.experience?.[index]?.description && 'error-input'}
												${loading && 'cursor-progress'}`}
											placeholder='Description'
											{...register(
												`experience.${index}.description`,
												{
													required: true,
												},
											)}
										/>
									</span>
								</div>
								<div className='flex w-10 flex-col items-center justify-start space-y-4'>
									<p className='h-fit w-full items-center rounded-full bg-bgAccentDark/30 p-2 text-center text-sm font-semibold dark:bg-bgAccentLight/30'>
										{index + 1}
									</p>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											experienceArray.move(
												index,
												index - 1,
											);
										}}
									>
										{index !== 0 && <ChevronUp size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											experienceArray.move(
												index,
												index + 1,
											);
										}}
									>
										{index !==
											experienceArray.fields.length -
												1 && <ChevronDown size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											experienceArray.remove(index);
										}}
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						))}
						<span className='flex w-full justify-center'>
							<button
								className='primary-button flex w-fit flex-row items-center space-x-2'
								type='button'
								onClick={handleAddExperience}
							>
								<Plus size={14} />
								<p className='text-sm font-semibold'>Add</p>
							</button>
						</span>
					</div>
				</div>

				{/* education */}
				<div className='space-y-2'>
					<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
						<h1 className='text-sm font-semibold lg:text-lg'>
							Education
						</h1>
					</div>
					<div className='flex flex-col space-y-7 pt-2'>
						{educationArray.fields.map((item, index) => (
							<div
								key={item.id}
								className='flex w-full space-x-4'
							>
								<div className='flex h-full w-full flex-col space-y-4'>
									<div className='grid w-full grid-cols-2 items-center gap-2 space-y-2'>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<School2 size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.education?.[index]?.school && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='School'
												{...register(
													`education.${index}.school`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<GraduationCap size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.education?.[index]?.degree && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='Degree'
												{...register(
													`education.${index}.degree`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<Focus size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.education?.[index]?.focus && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='Focus'
												{...register(
													`education.${index}.focus`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<Book size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.education?.[index]?.gpa && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='GPA'
												{...register(
													`education.${index}.gpa`,
													{
														required: false,
														pattern: {
															value: /^[0-4]?(?:\.\d{1,2})?$/,
															message:
																'Entered value does not match GPA format',
														},
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<p className='text-xs'>Start</p>
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.education?.[index]?.startDate && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='date'
												placeholder='Start Date'
												{...register(
													`education.${index}.startDate`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<p className='text-xs'>End</p>
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.education?.[index]?.endDate && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='date'
												placeholder='End Date'
												{...register(
													`education.${index}.endDate`,
													{
														required: false,
													},
												)}
											/>
										</span>
									</div>
									<span className='flex w-full flex-row items-center space-x-2 font-light'>
										<Text size={18} />
										<textarea
											className={`text-area h-20 w-full text-xs font-light
												${errors.education?.[index]?.description && 'error-input'}
												${loading && 'cursor-progress'}`}
											placeholder='Description'
											{...register(
												`education.${index}.description`,
												{
													required: true,
												},
											)}
										/>
									</span>
								</div>
								<div className='flex w-10 flex-col items-center justify-start space-y-4'>
									<p className='h-fit w-full items-center rounded-full bg-bgAccentDark/30 p-2 text-center text-sm font-semibold dark:bg-bgAccentLight/30'>
										{index + 1}
									</p>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											educationArray.move(
												index,
												index - 1,
											);
										}}
									>
										{index !== 0 && <ChevronUp size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											educationArray.move(
												index,
												index + 1,
											);
										}}
									>
										{index !==
											educationArray.fields.length -
												1 && <ChevronDown size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											educationArray.remove(index);
										}}
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						))}
						<span className='flex w-full justify-center'>
							<button
								className='primary-button flex w-fit flex-row items-center space-x-2'
								type='button'
								onClick={handleAddEducation}
							>
								<Plus size={14} />
								<p className='text-sm font-semibold'>Add</p>
							</button>
						</span>
					</div>
				</div>

				{/* projects */}
				<div className='space-y-2'>
					<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
						<h1 className='text-sm font-semibold lg:text-lg'>
							Projects
						</h1>
					</div>
					<div className='flex flex-col space-y-7 pt-2'>
						{projectArray.fields.map((item, index) => (
							<div
								key={item.id}
								className='flex w-full space-x-4'
							>
								<div className='flex h-full w-full flex-col space-y-4'>
									<div className='grid w-full grid-cols-2 items-center gap-2 space-y-2'>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<CaseSensitive size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.project?.[index]?.name && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='text'
												placeholder='Name'
												{...register(
													`project.${index}.name`,
													{
														required: true,
													},
												)}
											/>
										</span>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<LinkIcon size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
												${errors.project?.[index]?.link && 'error-input'}
												${loading && 'cursor-progress'}`}
												type='url'
												placeholder='Link'
												{...register(
													`project.${index}.link`,
													{
														required: false,
														pattern: {
															value: /^https?:\/\/(www\.)?[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]{2,3}(\/[a-zA-Z0-9_-]+)*\/?$/,
															message:
																'Entered value does not match website format',
														},
													},
												)}
											/>
										</span>
									</div>
									<span className='flex flex-row items-center space-x-2 font-light'>
										<Text size={18} />
										<textarea
											className={`text-area h-20 w-full text-xs font-light
												${errors.project?.[index]?.description && 'error-input'}
												${loading && 'cursor-progress'}`}
											placeholder='Description'
											{...register(
												`project.${index}.description`,
												{
													required: true,
												},
											)}
										/>
									</span>
								</div>
								<div className='flex w-10 flex-col items-center justify-start space-y-4'>
									<p className='h-fit w-full items-center rounded-full bg-bgAccentDark/30 p-2 text-center text-sm font-semibold dark:bg-bgAccentLight/30'>
										{index + 1}
									</p>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											projectArray.move(index, index - 1);
										}}
									>
										{index !== 0 && <ChevronUp size={18} />}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											projectArray.move(index, index + 1);
										}}
									>
										{index !==
											projectArray.fields.length - 1 && (
											<ChevronDown size={18} />
										)}
									</button>

									<button
										className='h-fit'
										onClick={(e: any) => {
											e.preventDefault();
											projectArray.remove(index);
										}}
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
						))}

						<span className='flex w-full justify-center'>
							<button
								className='primary-button flex w-fit flex-row items-center space-x-2'
								type='button'
								onClick={handleAddProject}
							>
								<Plus size={14} />
								<p className='text-sm font-semibold'>Add</p>
							</button>
						</span>
					</div>
				</div>

				{/* TODO */}
				{/* skills */}

				{/* options */}
				<div className='space-y-4'>
					<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
						<h1 className='text-sm font-semibold lg:text-lg'>
							Options
						</h1>
					</div>

					<div className='flex flex-col items-center justify-center space-x-0 space-y-4 px-2 lg:flex-row lg:space-x-4 lg:space-y-0'>
						<button
							type='button'
							className={`select-button flex w-full flex-col rounded-2xl
						${!options.openToRelocation ? 'select-button-hover' : 'select-button-active'}`}
							onClick={() => {
								setOptions({
									...options,
									openToRelocation: !options.openToRelocation,
								});
								setValue(
									'options.openToRelocation',
									!options.openToRelocation,
								);
							}}
						>
							<h1 className='text-left text-lg font-semibold'>
								{options.openToRelocation
									? '✅ Relocate'
									: '❌ Relocate'}
							</h1>
							<p className='text-left text-xs font-light'>
								You are open to relocate to other cities.
							</p>
						</button>
						<button
							type='button'
							className={`select-button flex w-full flex-col rounded-2xl
						${!options.openToRemote ? 'select-button-hover' : 'select-button-active'}`}
							onClick={() => {
								setOptions({
									...options,
									openToRemote: !options.openToRemote,
								});
								setValue(
									'options.openToRemote',
									!options.openToRemote,
								);
							}}
						>
							<h1 className='text-left text-lg font-semibold'>
								{options.openToRemote
									? '✅ Remote'
									: '❌ Remote'}
							</h1>
							<p className='text-left text-xs font-light'>
								You are open to working remotely.
							</p>
						</button>
					</div>
				</div>
			</div>
			<div
				className='sticky bottom-0 flex h-16 w-full  items-center justify-center border-t-2
				border-bgAccentDark/20 bg-bgAccentLight text-bgAccentDark dark:border-bgAccentLight/20
				dark:bg-bgAccentDark dark:text-bgAccentLight'
			>
				<button
					className='h-16 w-fit'
					type='submit'
					onClick={handleSubmit(onSubmit)}
				>
					<span className='flex h-full w-full flex-row items-center justify-center space-x-2'>
						<Save size={18} />
						<h1 className='text-lg font-semibold'>Save</h1>
					</span>
				</button>
			</div>
		</form>
	);
};

export default Home;
