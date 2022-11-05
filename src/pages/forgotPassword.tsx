import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Grid, createStyles, Text, Button, Loader } from '@mantine/core';
import { authApi } from '../api';
import FormInputWrapperComponent from '../components/FormInputWrapper';
import { useMutation } from 'react-query';
import { SERVER_DOWN } from '../constants/messages';

type FormInputType = {
	email: string;
};

type ForgotPasswordMutationType = {
	email: string;
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
	rootSignInContainer: {
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
	forgotPasswordContainer: {
		height: '80px',
	},
	forgotPasswordTitle: {
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
	forgotPassword: {
		color: '#228be6 !important',
	},
	alertInfoContainer: {
		height: '10px',
		marginBottom: '7px',
	},
}));

const ForgotPassword = () => {
	const { classes } = useStyles();
	const router = useRouter();
	const [error, setError] = useState({
		error: false,
		message: '',
	});
	const [errorFields, setErrorFields] = useState<ErrorFieldsType>();
	const { register, handleSubmit, formState } = useForm<FormInputType>({
		mode: 'onChange',
	});

	const forgotPasswordMutation = useMutation('forgotPassword', async (variables: ForgotPasswordMutationType) => {
		return await authApi.forgotPassword({
			path: 'auth/forgotPassword',
			email: variables.email,
		});
	});

	const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
		if (formData.email) {
			const email = formData.email;
			await forgotPasswordMutation.mutateAsync(
				{
					email,
				},
				{
					onSuccess: (data) => {
						setError({
							error: false,
							message: '',
						});
						if (!data.data.error) {
							setTimeout(() => {
								router.push('/resetPassword');
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
		}
	};

	return (
		<Grid className={classes.container}>
			<Grid.Col span={7} className={classes.showCaseSide} />
			<Grid.Col span={5} className={classes.rootSignInContainer}>
				<Grid.Col span={12} className={classes.merchFlowTitleContainer}>
					<Text component="span" align="center" size="xl" weight={700} className={classes.merchFlowTitle}>
						Merchflow
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.forgotPasswordContainer}>
					<Text
						component="span"
						align="center"
						size="xl"
						weight={700}
						className={classes.forgotPasswordTitle}
					>
						Forgot Password
					</Text>
				</Grid.Col>
				<Grid.Col span={12} className={classes.alertInfoContainer}>
					{!!error?.error && <span style={{ color: 'red' }}>{error.message}</span>}
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
									!!errorFields?.includes('email') ? 'Email must be valid' :
									formState.errors.email?.type === "pattern" ? 'Email must be valid' : ''
								}
							/>
						</Grid.Col>
					</Grid.Col>
					<Grid.Col span={7}>
						<Grid className={classes.GetCodeBtnContainer}>
							<Grid.Col span={12}>
								<Button fullWidth type="submit" disabled={!formState.isValid}>
									{forgotPasswordMutation.isLoading ? (
										<Loader color="white" variant="dots" size="lg" />
									) : (
										'Get Code'
									)}
								</Button>
							</Grid.Col>
							<Grid.Col span={12}>
								<Text
									component="a"
									align="center"
									weight={500}
									className={classes.forgotPassword}
									href={'/login'}
								>
									Login
								</Text>
							</Grid.Col>
						</Grid>
					</Grid.Col>
				</form>
			</Grid.Col>
		</Grid>
	);
};

export default ForgotPassword;
