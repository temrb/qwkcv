'use client';
import base64url from 'base64url';

import {
	ArrowUpRightSquare,
	CalendarRange,
	ChevronDown,
	ChevronUp,
	FileText,
	Github,
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// TODO - REFACTOR REGEX
const Home = () => {
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
			description: '',
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
		} else {
			setValue('name', '');
			setValue('blurb', '');
			setValue('photoURL', '');
			setValue('location', '');
			setValue('resumeURL', '');
			setValue('email', '');
			setValue('linkedin', '');
			setValue('github', '');
			setValue('website', '');
			setValue('calendly', '');
			setValue('block.referenceBlock', null);
			setValue('block.linkBlock', null);
			setValue('assets.photoURL', '');
			setValue('assets.vimeoURL', '');

			referenceArray.remove();
			linkArray.remove();
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
				<Input
					type='text'
					className={`w-full text-xs ${
						searchError.error &&
						'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
					}`}
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
							<Input
								className={`w-full text-xs ${
									errors.name &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Textarea
								className={`w-full text-xs ${
									errors.blurb &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
										? 'Enter valid image URL'
										: 'Avatar URL'}
								</p>
							</span>
							<Input
								className={`w-full text-xs ${
									errors.photoURL &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
								type='text'
								placeholder='https://...'
								{...register('photoURL', {
									pattern: {
										value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?\.(png|jpe?g)$/,
										message:
											'Entered value does not match image format',
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
							<Input
								className={`w-full text-xs ${
									errors.location &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Input
								className={`w-full text-xs ${
									errors.resumeURL &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Input
								className={`w-full text-xs ${
									errors.email &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Input
								className={`w-full text-xs ${
									errors.linkedin &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Input
								className={`w-full text-xs ${
									errors.github &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Input
								className={`w-full text-xs ${
									errors.website &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
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
							<Input
								className={`w-full text-xs ${
									errors.calendly &&
									'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
								}`}
								type='url'
								placeholder=' https://calendly.com/.../...'
								{...register('calendly', {
									pattern: {
										value: /^https?:\/\/(www\.)?calendly\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/?$/,
										message:
											'Entered value does not match Calendly format',
									},
								})}
							/>
						</div>
					</div>

					{/* references */}
					<div className='space-y-2'>
						<div className='border-foreground flex w-full flex-row items-center justify-center border-b-2 border-dotted p-2'>
							<h1 className='text-lg font-semibold tracking-wider'>
								References
							</h1>
						</div>
						<div className='flex flex-col space-y-7 pt-1'>
							{referenceArray.fields.map((item, index) => (
								<div
									key={item.id}
									className={`flex w-full space-x-4 ${
										index !== 0 &&
										'border-foreground/20 border-t-[1px] pt-6'
									}`}
								>
									<div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
										<div className='flex flex-col space-y-1'>
											<label className='text-sm font-light'>
												Name:
											</label>
											<Input
												className={`w-full text-xs ${
													errors.block
														?.referenceBlock?.[
														index
													]?.name &&
													'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
												}`}
												type='text'
												placeholder='Tim Apple'
												{...register(
													`block.referenceBlock.${index}.name`,
													{
														required: true,
													},
												)}
											/>
										</div>
										<div className='flex flex-col space-y-1'>
											<label className='text-sm font-light'>
												LinkedIn:
											</label>
											<Input
												className={`w-full text-xs ${
													errors.block
														?.referenceBlock?.[
														index
													]?.linkedin &&
													'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
												}`}
												type='url'
												placeholder='https://www.linkedin.com/in/...'
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
										</div>
										<div className='flex flex-col space-y-1'>
											<label className='text-sm font-light'>
												Company:
											</label>
											<Input
												className={`w-full text-xs ${
													errors.block
														?.referenceBlock?.[
														index
													]?.company &&
													'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
												}`}
												type='text'
												placeholder='Apple'
												{...register(
													`block.referenceBlock.${index}.company`,
													{
														required: true,
													},
												)}
											/>
										</div>
										<div className='flex flex-col space-y-1'>
											<label className='text-sm font-light'>
												Relationship:
											</label>
											<Input
												className={`w-full text-xs ${
													errors.block
														?.referenceBlock?.[
														index
													]?.relationship &&
													'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
												}`}
												type='url'
												placeholder='Manager'
												{...register(
													`block.referenceBlock.${index}.relationship`,
													{
														required: true,
													},
												)}
											/>
										</div>
										<div className='flex flex-col space-y-1'>
											<label className='text-sm font-light'>
												Reference Link:
											</label>
											<Input
												className={`w-full text-xs ${
													errors.block
														?.referenceBlock?.[
														index
													]?.link &&
													'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
												}`}
												type='url'
												placeholder='https://docs.google.com/document/d/...'
												{...register(
													`block.referenceBlock.${index}.link`,
													{
														required: false,
														pattern: {
															value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
															message:
																'Entered value is not a valid URL',
														},
													},
												)}
											/>
										</div>
									</div>
									<div className='flex w-10 flex-col items-center justify-start space-y-4'>
										<p className='bg-foreground/30 h-fit w-full items-center rounded-full p-2 text-center text-sm font-semibold'>
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
								<Button
									variant={'outline'}
									className='flex w-fit flex-row items-center space-x-2'
									type='button'
									onClick={handleAddReference}
								>
									<Plus size={14} />
									<p className='text-sm font-semibold'>Add</p>
								</Button>
							</span>
						</div>
					</div>

					{/* links */}
					<div className='space-y-2'>
						<div className='border-foreground flex w-full flex-row items-center justify-center border-b-2 border-dotted p-2'>
							<h1 className='text-lg font-semibold tracking-wider'>
								Links
							</h1>
						</div>
						<div className='flex flex-col space-y-7 pt-1'>
							{linkArray.fields.map((item, index) => (
								<div
									key={item.id}
									className={`flex w-full space-x-4 ${
										index !== 0 &&
										'border-foreground/20 border-t-[1px] pt-6'
									}`}
								>
									<div className='flex w-full flex-col'>
										<div className='grid w-full grid-cols-1 gap-4 lg:grid-cols-2'>
											<div className='flex flex-col space-y-1'>
												<label className='text-sm font-light'>
													Name:
												</label>
												<Input
													className={`w-full text-xs ${
														errors.block
															?.linkBlock?.[index]
															?.name &&
														'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
													}`}
													type='text'
													placeholder='Tim Apple'
													{...register(
														`block.linkBlock.${index}.name`,
														{
															required: true,
														},
													)}
												/>
											</div>
											<div className='flex flex-col space-y-1'>
												<label className='text-sm font-light'>
													Link:
												</label>
												<Input
													className={`w-full text-xs ${
														errors.block
															?.linkBlock?.[index]
															?.link &&
														'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
													}`}
													type='url'
													placeholder='somelink.com'
													{...register(
														`block.referenceBlock.${index}.link`,
														{
															required: false,
															pattern: {
																value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/,
																message:
																	'Entered value is not a valid URL',
															},
														},
													)}
												/>
											</div>
										</div>
										<div className='flex flex-col space-y-1 pt-4'>
											<label className='text-sm font-light'>
												Description:
											</label>
											<Textarea
												className={`w-full text-xs ${
													errors.block?.linkBlock?.[
														index
													]?.description &&
													'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
												}`}
												placeholder='What did you do?'
												{...register(
													`block.linkBlock.${index}.description`,
													{
														required: false,
													},
												)}
											/>
										</div>
									</div>
									<div className='flex w-10 flex-col items-center justify-start space-y-4'>
										<p className='bg-foreground/30 h-fit w-full items-center rounded-full p-2 text-center text-sm font-semibold'>
											{index + 1}
										</p>

										<button
											className='h-fit'
											onClick={(e: any) => {
												e.preventDefault();
												linkArray.move(
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
												linkArray.move(
													index,
													index + 1,
												);
											}}
										>
											{index !==
												linkArray.fields.length - 1 && (
												<ChevronDown size={18} />
											)}
										</button>
										<button
											className='h-fit'
											onClick={(e: any) => {
												e.preventDefault();
												linkArray.remove(index);
											}}
										>
											<Trash2 size={18} />
										</button>
									</div>
								</div>
							))}

							<span className='flex w-full justify-center'>
								<Button
									variant={'outline'}
									className='flex w-fit flex-row items-center space-x-2'
									type='button'
									onClick={handleAddLink}
								>
									<Plus size={14} />
									<p className='text-sm font-semibold'>Add</p>
								</Button>
							</span>
						</div>
					</div>

					{/* assets */}
					<div className='space-y-2'>
						<div className='border-foreground flex w-full flex-row items-center justify-center border-b-2 border-dotted p-2'>
							<h1 className='text-lg font-semibold tracking-wider'>
								Assets
							</h1>
						</div>
						<div className='grid items-center gap-4 px-2 pt-2 lg:grid-cols-2 lg:px-0'>
							<div className='flex w-full flex-col space-y-2'>
								<span className='flex flex-row items-center space-x-2'>
									<ImageIcon size={16} />
									<p
										className={`w-full truncate text-ellipsis text-sm
							${errors?.assets?.photoURL && 'error-text'}`}
									>
										{errors?.assets?.photoURL
											? 'Enter valid Photo URL'
											: 'Photo URL'}
									</p>
								</span>
								<Input
									className={`w-full text-xs ${
										errors?.assets?.photoURL &&
										'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
									}`}
									type='text'
									placeholder='https://...'
									{...register('assets.photoURL', {
										pattern: {
											value: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?\.(png|jpe?g)$/,
											message:
												'Entered value does not match image format',
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
								<Input
									className={`w-full text-xs ${
										errors?.assets?.vimeoURL &&
										'!ring-2 !ring-red-600 !ring-offset-2 dark:!ring-red-400'
									}`}
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
				</div>
				<div className='bg-background border-foreground/20 sticky bottom-0 flex  h-16 w-full items-center justify-between border-t-2'>
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
					<Button
						variant={'default'}
						className=' w-fit'
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						<span className='flex h-full w-full flex-row items-center justify-center space-x-2'>
							<h1 className='text-lg font-semibold'>View</h1>
							<ArrowUpRightSquare size={18} />
						</span>
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Home;
