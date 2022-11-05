import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, createStyles, Text, Checkbox, Button, PasswordInput, Loader, Progress } from '@mantine/core';
import { authApi } from '../api';
import FormInputWrapperComponent from '../components/FormInputWrapper';
import { getStrength, PasswordRequirement, requirements } from '../components/Password';
import { SERVER_DOWN } from '../constants/messages';

type FormInputType = {
	email: string;
	lastName: string;
	password: string;
	firstName: string;
	companyName?: string;
	industryNumber: string;
};

type SignUpMutationType = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	industryNumber: string;
	inviteId?: string;
	companyName?: string;
};

type SignInMutationResponse = {
	AccessToken: string;
	ExpiresIn: number;
	IdToken: string;
	RefreshToken: string;
	TokenType: string;
};

type ErrorFields = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	industryNumber: number;
};

type ErrorFieldsType = [...[keyof ErrorFields]];

const useStyles = createStyles(() => ({
	container: {
		height: '101vh',
		width: '100%',
	},
	showCaseSide: {
		backgroundColor: '#228be6',
	},
	rootSignUpContainer: {
		paddingLeft: '35px',
		paddingRight: '20px',
	},
	merchFlowTitleContainer: {
		marginTop: '25px',
		height: '80px',
	},
	merchFlowTitle: {
		color: '#228be6',
		fontSize: '30px',
	},
	signUpTitleContainer: {
		height: '80px',
	},
	alertInfoContainer: {
		height: 'auto',
		marginBottom: '7px',
	},
	signUpTitle: {
		fontSize: '30px',
		color: '#00000099 !important',
	},
	SignUpContainer: {
		height: 'auto',
		padding: '10px',
	},
	checkbox: {
		color: '#228be6',
	},
	haveAccountContainer: {
		maxWidth: 'unset',
	},
	haveAccount: {
		fontSize: '15px',
		color: '#00000099 !important',
		cursor: 'pointer',
	},
	signUpBtnContainer: {
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'column',
		width: '90%',
	},
	logInSpan: {
		color: '#228be6',
	},
	industryNumber: {
		marginTop: '0px',
		marginBottom: '0px',
		color: '#00000099 !important',
		fontSize: '15px',
		textAlign: 'start',
		marginLeft: '10px',
	},
	industryNumberDesc: {
		fontSize: '12px',
		textAlign: 'start',
		marginLeft: '10px',
	},
	inputWrapper: {
		label: {
			color: '#00000099 !important',
		},
	},
}));

const SignUp = () => {
	const { classes } = useStyles();
	const router = useRouter();
	const [error, setError] = useState({
		error: false,
		message: '',
	});
	const [errorFields, setErrorFields] = useState<ErrorFieldsType>();
	const [checked, setChecked] = useState(false);
	const { register, handleSubmit, formState, setValue } = useForm<FormInputType>({
		mode: 'onChange',
	});

	const [password, setPassword] = useState('');
	const strength = getStrength(password);
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
	));

	const [isInvited, setIsInvited] = useState(false);

	const signUpMutation = useMutation('signUp', async (variables: SignUpMutationType) => {
		return await authApi.signUp({
			path: 'auth/signUp',
			...variables,
		});
	});

	const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
		if (!isInvited && !formData.companyName) return;

		let { firstName, lastName, email, password, companyName, industryNumber } = formData;

		if (firstName && lastName && password && email && checked) {
			industryNumber = industryNumber.toString();

			const signupData: SignUpMutationType = { firstName, lastName, email, password, industryNumber };

			if (isInvited) signupData['inviteId'] = router.query.id as string;
			else signupData['companyName'] = companyName;

			await signUpMutation.mutateAsync(
				{ ...signupData },
				{
					onSuccess: (data) => {
						setError({
							error: false,
							message: '',
						});
						const signInResponse: SignInMutationResponse = data.data.AuthenticationResult;
						localStorage.setItem('accessToken', signInResponse.AccessToken);
						localStorage.setItem('idToken', signInResponse.IdToken);

						setTimeout(() => {
							router.push('/app');
						}, 2000);
					},
					onError: (err: any) => {
						if (err?.response?.data === undefined) {
							setError({
								error: true,
								message: SERVER_DOWN,
							});
						} else {
							if (!!err?.response.data?.zodError) {
								setErrorFields(err?.response.data?.errorFields);
								if (isInvited && err?.response.data?.errorFields.includes('companyName')) {
									setError({ error: true, message: 'Company Name is required' });
								}
							} else {
								setErrorFields(undefined);
								setError(err?.response.data);
							}
						}
					},
				}
			);
		}
	};

	useEffect(() => {
		const { id } = router.query;
		if (id) {
			setIsInvited(true);
		}
	}, [router.query]);

	return (
		<Grid className={classes.container}>
			<Grid.Col span={6} className={classes.showCaseSide} />
			<Grid.Col span={6} className={classes.rootSignUpContainer}>
				<Grid.Col span={12} className={classes.merchFlowTitleContainer}>
					<Text component="span" align="center" size="xl" weight={700} className={classes.merchFlowTitle}>
						Merchflow
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.signUpTitleContainer}>
					<Text component="span" align="center" size="xl" weight={700} className={classes.signUpTitle}>
						Sign Up
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.alertInfoContainer}>
					{!!error?.error && <span style={{ color: 'red' }}>{error.message}</span>}
				</Grid.Col>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid className={classes.SignUpContainer}>
						<Grid.Col span={6}>
							<FormInputWrapperComponent
								label="First Name"
								name="firstName"
								placeholder="Enter your first name"
								required={true}
								className={classes.inputWrapper}
								register={register}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<FormInputWrapperComponent
								label="Last Name"
								name="lastName"
								required={true}
								placeholder="Enter your last name"
								className={classes.inputWrapper}
								register={register}
							/>
						</Grid.Col>
						{!isInvited && (
							<Grid.Col span={6}>
								<FormInputWrapperComponent
									label="Company Name"
									name="companyName"
									required={true}
									placeholder="Enter your company name"
									className={classes.inputWrapper}
									register={register}
								/>
							</Grid.Col>
						)}
						<Grid.Col span={6}>
							<FormInputWrapperComponent
								label="Company Email"
								name="email"
								required={true}
								placeholder="Enter your email"
								className={classes.inputWrapper}
								register={register}
								pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
								error={
									!!errorFields?.includes('email')
										? 'email field is not valid'
										: formState.errors.email?.type === 'pattern'
										? 'Email must be valid'
										: ''
								}
							/>
						</Grid.Col>
						<Grid.Col span={6}>
							<FormInputWrapperComponent
								label="Industry Number"
								name="industryNumber"
								pattern="/^[0-9]{1,10}$/"
								placeholder="Enter your industry number"
								className={classes.inputWrapper}
								register={register}
								error={
									!!errorFields?.includes('industryNumber')
										? 'Industry number has exceeded maximum length'
										: ''
								}
							/>
						</Grid.Col>
						{!isInvited && <Grid.Col span={6} style={{ marginTop: 'auto' }}></Grid.Col>}
						<Grid.Col span={6}>
							<PasswordInput
								placeholder="Enter your password"
								label="Password"
								required
								className={classes.inputWrapper}
								onChange={(event) => {
									setPassword(event.target.value);
									setValue('password', event.target.value);
								}}
							/>
							{!!password.length ? (
								<>
									<Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
									<PasswordRequirement
										label="Includes at least 6 characters"
										meets={password.length > 5}
									/>
									{checks}
								</>
							) : (
								''
							)}
						</Grid.Col>
						<Grid.Col span={6}></Grid.Col>
						<Grid.Col span={6}>
							<Grid className={classes.signUpBtnContainer}>
								<Grid.Col span={12}>
									<Checkbox
										label={
											<>
												Accept{' '}
												<Text
													component="a"
													href="/terms"
													target="_blank"
													className={classes.logInSpan}
												>
													{' '}
													Terms & Conditions{' '}
												</Text>
											</>
										}
										className={classes.checkbox}
										checked={checked}
										onChange={(event) => setChecked(event.currentTarget.checked)}
									/>
								</Grid.Col>
								<Grid.Col span={12}>
									<Button
										fullWidth
										type="submit"
										disabled={!formState.isValid || !checked || strength !== 100}
									>
										{signUpMutation.isLoading ? (
											<Loader color="white" variant="dots" size="lg" />
										) : (
											'Sign Up'
										)}
									</Button>
								</Grid.Col>
								<Grid.Col span={12} className={classes.haveAccountContainer}>
									<Text
										component="a"
										align="center"
										weight={500}
										className={classes.haveAccount}
										href={'/login'}
									>
										Already have an account? <span className={classes.logInSpan}>Log In</span>
									</Text>
								</Grid.Col>
							</Grid>
						</Grid.Col>
						<Grid.Col span={6}>
							<Grid className={classes.signUpBtnContainer}>
								<Grid.Col span={12}>
									<Text component="p" align="center" weight={500} className={classes.industryNumber}>
										Why do we need an industry number
									</Text>
									<Text
										component="p"
										align="center"
										weight={300}
										className={classes.industryNumberDesc}
									>
										This tool is intended solely for the use of distributors in the promotional
										product industry. An industry number allow us to verify your business is a
										legitimate distributor in the industry
									</Text>
								</Grid.Col>
							</Grid>
						</Grid.Col>
					</Grid>
				</form>
			</Grid.Col>
		</Grid>
	);
};

export default SignUp;
