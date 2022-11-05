import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, createStyles, Text, Button, Loader, PasswordInput, Alert, Progress } from '@mantine/core';
import { authApi } from '../api';
import FormInputWrapperComponent from '../components/FormInputWrapper';
import { useMutation } from 'react-query';
import { SERVER_DOWN } from '../constants/messages';
import { getStrength, PasswordRequirement, requirements } from '../components/Password';

type FormInputType = {
	email: string;
	password: string;
	confirmPassword: string;
	confirmationCode: string;
};

type ResetPasswordMutationType = {
	email: string;
	password: string;
	confirmationCode: string;
};

type ErrorFieldsType = [...[keyof FormInputType]];

const useStyles = createStyles(() => ({
	container: {
		height: '101vh',
		width: '100%',
	},
	showCaseSide: {
		backgroundColor: '#228be6',
	},
	rootResetPasswordContainer: {
		paddingLeft: '35px',
		paddingRight: '20px',
	},
	merchFlowTitleContainer: {
		marginTop: '40px',
		height: '80px',
	},
	merchFlowTitle: {
		color: '#228be6',
		fontSize: '30px',
	},
	resetPasswordContainer: {
		height: '80px',
	},
	resetPasswordTitle: {
		fontSize: '30px',
		color: '#00000099 !important',
	},
	inputWrapper: {
		label: {
			color: '#00000099 !important',
		},
	},
	GetCodeBtnContainer: {
		marginTop: '20px',
		display: 'flex',
		flexDirection: 'column',
		width: '90%',
	},
	accountContainer: {
		maxWidth: 'unset',
	},
	haveAccount: {
		fontSize: '15px',
		color: '#00000099 !important',
		cursor: 'pointer',
	},
	resetPassword: {
		color: '#228be6 !important',
	},
	alertInfoContainer: {
		height: 'auto',
		marginBottom: '7px',
	},
}));

const ResetPassword = () => {
	const { classes } = useStyles();
	const router = useRouter();
	const [error, setError] = useState({
		error: false,
		message: '',
	});
	const [successAlert, setSuccessAlert] = useState(false);
	const [errorFields, setErrorFields] = useState<ErrorFieldsType>();
	const { register, handleSubmit, formState, setValue } = useForm<FormInputType>({
		mode: 'onChange',
	});

	const [password, setPassword] = useState('');
	const strength = getStrength(password);
	const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
	const checks = requirements.map((requirement, index) => (
		<PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
	));

	const resetPasswordMutation = useMutation('resetPassword', async (variables: ResetPasswordMutationType) => {
		return await authApi.resetPassword({
			path: 'auth/resetPassword',
			email: variables.email,
			password: variables.password,
			confirmationCode: variables.confirmationCode,
		});
	});

	const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
		if (formData.email && formData.password && formData.confirmPassword && formData.confirmationCode) {
			const email = formData.email;
			const password = formData.password;
			const confirmPassword = formData.confirmPassword;
			const confirmationCode = formData.confirmationCode;
			if (confirmPassword === password) {
				setError({
					error: false,
					message: '',
				});
				await resetPasswordMutation.mutateAsync(
					{
						email,
						password,
						confirmationCode,
					},
					{
						onSuccess: (data) => {
							setError({
								error: false,
								message: '',
							});
							setSuccessAlert(true);
							if (!data.data.error) {
								setTimeout(() => {
									router.push('/login');
								}, 2000);
							}
						},
						onError: (err: any) => {
							if (err?.response.data === undefined) {
								setError({
									error: true,
									message: SERVER_DOWN,
								});
							} else {
								if (!!err?.response.data?.zodError) {
									setErrorFields(err?.response.data?.errorFields);
								} else {
									setErrorFields(undefined);
									setError(err?.response.data);
								}
							}
						},
					}
				);
			} else {
				setError({
					error: true,
					message: 'password and confirm password must be same',
				});
			}
		}
	};

	return (
		<Grid className={classes.container}>
			<Grid.Col span={7} className={classes.showCaseSide} />
			<Grid.Col span={5} className={classes.rootResetPasswordContainer}>
				<Grid.Col span={12} className={classes.merchFlowTitleContainer}>
					<Text component="span" align="center" size="xl" weight={700} className={classes.merchFlowTitle}>
						Merchflow
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.resetPasswordContainer}>
					<Text component="span" align="center" size="xl" weight={700} className={classes.resetPasswordTitle}>
						Reset Password
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.alertInfoContainer}>
					{!!error?.error && <span style={{ color: 'red' }}>{error.message}</span>}
					{!!successAlert && (
						<Alert title="Success" color="green">
							Password Reset Successfully
						</Alert>
					)}
				</Grid.Col>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid.Col span={12} pl={0} pb={0}>
						<Grid.Col span={7} pb={0}>
							<FormInputWrapperComponent
								label="Email"
								name="email"
								placeholder="Enter your email or username"
								required={true}
								className={classes.inputWrapper}
								register={register}
								pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
								error={
									!!errorFields?.includes('email')
										? 'Email must be valid'
										: formState.errors.email?.type === 'pattern'
										? 'Email must be valid'
										: ''
								}
							/>
						</Grid.Col>
					</Grid.Col>
					<Grid.Col span={12} pl={0} pb={0}>
						<Grid.Col span={7} pb={0}>
							<PasswordInput
								placeholder="Enter your new password"
								label="New Password"
								required
								className={classes.inputWrapper}
								onChange={(event) => {
									setPassword(event.target.value);
									setValue('password', event.target.value);
								}}
							/>

							<Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
							<PasswordRequirement label="Includes at least 8 characters" meets={password.length > 7} />
							{checks}
						</Grid.Col>
					</Grid.Col>
					<Grid.Col span={12} pl={0} pb={0}>
						<Grid.Col span={7} pb={0}>
							<PasswordInput
								placeholder="Enter password again"
								label="Confirm Password"
								required
								{...register('confirmPassword', {
									required: true,
								})}
								className={classes.inputWrapper}
							/>
						</Grid.Col>
					</Grid.Col>
					<Grid.Col span={12} pl={0} pb={0}>
						<Grid.Col span={7} pb={0}>
							<FormInputWrapperComponent
								label="Confirmation code"
								name="confirmationCode"
								placeholder="Enter your code here"
								required={true}
								className={classes.inputWrapper}
								register={register}
								error={!!errorFields?.includes('confirmationCode') ? 'email field is not valid' : ''}
							/>
						</Grid.Col>
					</Grid.Col>
					<Grid.Col span={7}>
						<Grid className={classes.GetCodeBtnContainer}>
							<Grid.Col span={12}>
								<Button fullWidth type="submit" disabled={!formState.isValid || strength !== 100}>
									{resetPasswordMutation.isLoading ? (
										<Loader color="white" variant="dots" size="lg" />
									) : (
										'Submit'
									)}
								</Button>
							</Grid.Col>
							<Grid.Col span={12}>
								<Text
									component="a"
									align="center"
									weight={500}
									className={classes.resetPassword}
									href={'/forgotPassword'}
								>
									Back
								</Text>
							</Grid.Col>
						</Grid>
					</Grid.Col>
				</form>
			</Grid.Col>
		</Grid>
	);
};

export default ResetPassword;
