import { Button, Grid, Loader, Modal, Title } from '@mantine/core';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { userApi } from '../../../api';
import { SERVER_DOWN } from '../../../constants/messages';
import FormInputWrapperComponent from '../../FormInputWrapper';

type FormInputType = {
	email: string;
};

type ErrorFieldsType = [...[keyof FormInputType]];

type InviteUserMutationResponse = {
	sent: string;
};

const InviteUserModal = ({ opened, setOpened }: any) => {
	const [error, setError] = useState({
		error: false,
		message: '',
	});
	const [errorFields, setErrorFields] = useState<ErrorFieldsType>();
	const { register, handleSubmit, formState, setValue } = useForm<FormInputType>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		},
	});

	const sendInviteMutation = useMutation('sendInvite', async (variables: FormInputType) => {
		return await userApi.sendInvite({
			email: variables.email,
		});
	});

	const onSubmit: SubmitHandler<FormInputType> = async (formData) => {
		setError({ error: false, message: '' });
		if (formData.email) {
			const email = formData.email;
			await sendInviteMutation.mutateAsync(
				{
					email,
				},
				{
					onSuccess: (data) => {
						setError({ error: false, message: '' });
						const inviteResponse: InviteUserMutationResponse = data.data;
                        setErrorFields(undefined);
                        setOpened(false);
                        setValue('email','');
					},
					onError: (err: any) => {
						if (err?.response.data === undefined) {
							setError({ error: true, message: SERVER_DOWN });
							setErrorFields(undefined);
						} else if (err?.response?.data?.errorFields) {
							setError({ error: false, message: '' });
							setErrorFields(err?.response.data?.errorFields);
						} else {
							setError({
								error: true,
								message: 'Something went wrong',
							});
							setErrorFields(undefined);
						}
					},
				}
			);
		}
	};

	return (
		<Modal opened={opened} onClose={() => setOpened(false)} title={<Title order={3}>Invite User</Title>}>
			<Grid>
				{!!error?.error && <Grid.Col span={12}>{!!error?.error && <span style={{ color: 'red' }}>{error.message}</span>}</Grid.Col>}
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
					<Grid.Col span={12}>
						<FormInputWrapperComponent
							label="Email"
							name="email"
							placeholder="Enter user email to send invite"
							required={true}
							register={register}
							pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
							error={!!errorFields?.includes('email') ? 'Email field is not valid' : ''}
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Button fullWidth type="submit" disabled={!formState.isValid || !formState.isDirty}>
							{sendInviteMutation.isLoading ? (
								<Loader color="white" variant="dots" size="lg" />
							) : (
								'Send Invite'
							)}
						</Button>
					</Grid.Col>
				</form>
			</Grid>
		</Modal>
	);
};

export default InviteUserModal;
