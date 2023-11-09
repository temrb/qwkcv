'use client';
import base64url from 'base64url';

import {
	ArrowUpRightSquare,
	Building2,
	CalendarRange,
	CaseSensitive,
	ChevronDown,
	ChevronUp,
	FileText,
	Github,
	HeartHandshake,
	Image as ImageIcon,
	Link as LinkIcon,
	Linkedin,
	Mail,
	MapPin,
	Plus,
	Text,
	Trash2,
	User2,
	Video,
} from 'lucide-react';
import React, { useState } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { UserFormInput } from '@/types/user';
import Link from 'next/link';

const Home = () => {
	const [options, setOptions] = useState({
		openToRelocation: false,
		openToRemote: false,
	});

	const [searchError, setSearchError] = useState({
		error: false,
		errorMessage: '',
	});

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<UserFormInput>({});

	const referenceArray = useFieldArray({
		control,
		name: 'block.referenceBlock',
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

	const linkArray = useFieldArray({
		control,
		name: 'block.linkBlock',
	});

	const handleAddLink = () => {
		linkArray.append({
			name: '',
			link: '',
			itemPosition: 0,
		});
	};

	const onSubmit: SubmitHandler<UserFormInput> = async (data) => {
		const encodedData = base64url.encode(JSON.stringify(data));
		window.open(`/cv/${encodedData}`, '_blank');
	};

	function decodeData(data: string): UserFormInput | null {
		try {
			const encodedData = data.split('/cv/')[1]; // Extract data after /cv/
			const decodedData = JSON.parse(
				base64url.decode(encodedData),
			) as UserFormInput;

			if (decodedData) {
				setSearchError({
					error: false,
					errorMessage: '',
				});
			}

			return decodedData;
		} catch (error: any) {
			console.error('Error decoding or parsing JSON:', error);
			setSearchError({
				error: true,
				errorMessage: 'Invalid QwkCV link. 😢',
			});
			return null;
		}
	}

	const handleLoadData = (e: any) => {
		const data = e.target.value;
		const jsonData = decodeData(data);

		if (jsonData) {
			const blockOptions = {
				openToRelocation: jsonData.options?.openToRelocation,
				openToRemote: jsonData.options?.openToRemote,
			};

			setValue('name', jsonData.name || '');
			setValue('blurb', jsonData.blurb);
			setValue('photoURL', jsonData.photoURL);
			setValue('location', jsonData.location || '');
			setValue('resumeURL', jsonData.resumeURL || '');
			setValue('email', jsonData.email);
			setValue('linkedin', jsonData.linkedin || '');
			setValue('github', jsonData.github);
			setValue('website', jsonData.website);
			setValue('calendly', jsonData.calendly);
			setValue('assets.photoURL', jsonData.assets?.photoURL);
			setValue('assets.vimeoURL', jsonData.assets?.vimeoURL);

			jsonData.block?.referenceBlock?.forEach((item, index) => {
				referenceArray.append({
					...item,
					itemPosition: index,
				});
			});

			jsonData.block?.linkBlock?.forEach((item, index) => {
				linkArray.append({
					...item,
					itemPosition: index,
				});
			});

			setOptions((prevOptions) => ({
				openToRelocation:
					blockOptions.openToRelocation ??
					prevOptions.openToRelocation,
				openToRemote:
					blockOptions.openToRemote ?? prevOptions.openToRemote,
			}));
		}
	};

	return (
		<div className='mx-auto h-full max-w-3xl flex-col items-center justify-center '>
			<div className='flex w-full flex-col space-y-2 pb-8'>
				<h2
					className={`text-center text-sm font-semibold tracking-tighter lg:text-xl ${
						searchError.error && 'error-text'
					}`}
				>
					{searchError.error
						? searchError.errorMessage
						: '👇 Paste your QwkCV link to load data. 👇'}
				</h2>
				<input
					type='text'
					className='border-b-2 border-bgAccentDark bg-transparent p-2
					text-bgAccentDark placeholder-bgAccentDark/50 outline-none dark:border-bgAccentLight
					dark:text-bgAccentLight dark:placeholder-bgAccentLight/50'
					onChange={(e: any) => {
						e.preventDefault();
						handleLoadData(e);
					}}
					placeholder='https://qwkcv.com/cv/...'
				/>
			</div>
			<form className='h-full w-full flex-col space-y-4'>
				<div className='w-full space-y-6'>
					<div className='flex w-full flex-col space-y-6'>
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
								className={`primary-input w-full text-xs lg:w-96
										${errors.name && 'error-input'}`}
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
								${errors.blurb && 'error-input'}`}
								placeholder='I am a Product Designer with 5 years of experience in the field. I have worked with companies like Google, Facebook, and Amazon.'
								{...register('blurb', {
									required: false,
								})}
							/>
						</div>
					</div>

					{/* general links */}
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
								  `}
								type='text'
								placeholder='https://...'
								{...register('photoURL', {
									pattern: {
										value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
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
								${errors.location && 'error-input'}`}
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
								  `}
								type='url'
								placeholder='https://docs.google.com/document/d/{id}'
								{...register('resumeURL', {
									required: true,
									pattern: {
										value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
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
									{errors.email
										? 'Enter valid email'
										: 'Email'}
								</p>
							</span>
							<input
								className={`primary-input w-full text-xs lg:w-72
							${errors.email && 'error-input'}
							  `}
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
							  `}
								type='url'
								placeholder='https://www.linkedin.com/in/...'
								{...register('linkedin', {
									required: true,
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
					  `}
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
									{errors.website
										? 'Enter valid URL'
										: 'Website'}
								</p>
							</span>
							<input
								className={`primary-input w-full text-xs lg:w-72
							${errors.website && 'error-input'}   `}
								type='url'
								placeholder='Personal Website'
								{...register('website', {
									pattern: {
										value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
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
								}   `}
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
											${errors.block?.referenceBlock?.[index]?.name && 'error-input'}`}
												type='text'
												placeholder='Name'
												{...register(
													`block.referenceBlock.${index}.name`,
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
											  `}
												type='url'
												placeholder='Reference LinkedIn'
												{...register(
													`block.referenceBlock.${index}.linkedin`,
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
											${errors.block?.referenceBlock?.[index]?.company && 'error-input'}
											  `}
												type='text'
												placeholder='Company'
												{...register(
													`block.referenceBlock.${index}.company`,
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
											${errors.block?.referenceBlock?.[index]?.relationship && 'error-input'}
											  `}
												type='text'
												placeholder='Relationship'
												{...register(
													`block.referenceBlock.${index}.relationship`,
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
											${errors.block?.referenceBlock?.[index]?.link && 'error-input'}
											  `}
												type='url'
												placeholder='Reference Link'
												{...register(
													`block.referenceBlock.${index}.link`,
													{
														required: false,
														pattern: {
															value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
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
											{index !== 0 && (
												<ChevronUp size={18} />
											)}
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
													1 && (
												<ChevronDown size={18} />
											)}
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

					{/* links */}
					<div className='space-y-2'>
						<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
							<h1 className='text-sm font-semibold lg:text-lg'>
								Links
							</h1>
						</div>
						<div className='flex flex-col space-y-7 pt-2'>
							{linkArray.fields.map((item, index) => (
								<div
									key={item.id}
									className='flex w-full space-x-4'
								>
									<div className='grid w-full grid-cols-2 items-center gap-2 space-y-2'>
										<span className='flex flex-row items-center space-x-2 font-light'>
											<CaseSensitive size={18} />
											<input
												className={`primary-input w-full text-xs lg:w-56
											${errors.block?.linkBlock?.[index]?.name && 'error-input'}`}
												type='text'
												placeholder='Name'
												{...register(
													`block.linkBlock.${index}.name`,
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
											${errors.block?.linkBlock?.[index]?.link && 'error-input'}`}
												type='url'
												placeholder='Link'
												{...register(
													`block.linkBlock.${index}.link`,
													{
														required: true,
														pattern: {
															value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
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
									</div>
								</div>
							))}
							<span className='flex w-full justify-center'>
								<button
									className='primary-button flex w-fit flex-row items-center space-x-2'
									type='button'
									onClick={handleAddLink}
								>
									<Plus size={14} />
									<p className='text-sm font-semibold'>Add</p>
								</button>
							</span>
						</div>
					</div>

					{/* assets */}
					<div className='space-y-2'>
						<div className='flex w-full flex-row items-center border-b-2 border-dotted border-bgAccentDark p-2 dark:border-bgAccentLight'>
							<h1 className='text-sm font-semibold lg:text-lg'>
								Assets
							</h1>
						</div>
						<div className='grid items-center gap-4 space-y-4 px-2 pt-2 lg:grid-cols-2 lg:space-y-0 lg:px-0'>
							<div className='flex w-full flex-col space-y-2'>
								<span className='flex flex-row items-center space-x-2'>
									<ImageIcon size={16} />
									<p
										className={`w-full truncate text-ellipsis text-sm
							${errors?.assets?.photoURL && 'error-text'}`}
									>
										{errors?.assets?.photoURL
											? 'Enter valid URL'
											: 'Photo URL'}
									</p>
								</span>
								<input
									className={`primary-input w-full text-xs lg:w-72
								${errors?.assets?.photoURL && 'error-input'}`}
									type='text'
									placeholder='https://...'
									{...register('assets.photoURL', {
										pattern: {
											value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
											message:
												'Entered value does not match website format',
										},
									})}
								/>
							</div>
							<div className='flex w-full flex-col space-y-2'>
								<span className='flex flex-row items-center space-x-2'>
									<Video size={16} />
									<p
										className={`w-full truncate text-ellipsis text-sm
							${errors?.assets?.vimeoURL && 'error-text'}`}
									>
										{errors?.assets?.vimeoURL
											? 'Enter valid URL'
											: 'Vimeo Video URL'}
									</p>
								</span>
								<input
									className={`primary-input w-full text-xs lg:w-72
								${errors?.assets?.vimeoURL && 'error-input'}`}
									type='text'
									placeholder='https://vimeo.com/867098346'
									{...register('assets.vimeoURL', {
										pattern: {
											value: /^https?:\/\/(www\.)?vimeo\.com\/[0-9]+$/,
											message:
												'Entered value does not match website format',
										},
									})}
								/>
							</div>
						</div>
					</div>

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
										openToRelocation:
											!options.openToRelocation,
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
					className='sticky bottom-0 flex h-16 w-full  items-center justify-between border-t-2
				border-bgAccentDark/20 bg-bgAccentLight text-bgAccentDark
				dark:border-bgAccentLight/20 dark:bg-bgAccentDark dark:text-bgAccentLight'
				>
					<Link
						className='h-16 w-fit underline-offset-4 hover:underline'
						href='https://dub.co/'
						target='_blank'
					>
						<span className='flex h-full w-full flex-row items-center justify-center'>
							<p className='text-sm font-light'>
								Shorten link with Dub.co
							</p>
						</span>
					</Link>
					<button
						className='h-16 w-fit'
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						<span className='flex h-full w-full flex-row items-center justify-center space-x-2'>
							<h1 className='text-lg font-semibold'>View</h1>
							<ArrowUpRightSquare size={18} />
						</span>
					</button>
				</div>
			</form>
		</div>
	);
};

export default Home;
