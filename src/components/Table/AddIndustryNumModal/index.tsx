import { Button, Grid, Loader, Modal, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { userApi } from '../../../api';
import { UpdateUserType } from '../../../api/userApi';
import { SERVER_DOWN } from '../../../constants/messages';
import FormInputWrapperComponent from '../../FormInputWrapper';

type AddIndustryNumModalProps = {
	show: boolean;
	setShow: any;
};

type UpdateIndustryNumType = Pick<UpdateUserType, 'industryNumber'>

type ErrorFields = {
	industryNumber: number;
};

type ErrorFieldsType = [...[keyof ErrorFields]];

const AddIndustryNumModal = ({ show, setShow }: AddIndustryNumModalProps) => {
	const [errorFields, setErrorFields] = useState<ErrorFieldsType>();

	const [error, setError] = useState({
		error: false,
		message: '',
	});

	const { register, handleSubmit, formState, setValue } = useForm<UpdateIndustryNumType>({
		mode: 'onChange',
	});

	const updateUserMutation = useMutation('updateUser', async (variables: UpdateIndustryNumType) => {
		return await userApi.updateUser({
			industryNumber: variables.industryNumber,
		});
	});

	const onSubmit: SubmitHandler<UpdateIndustryNumType> = async (formData) => {
		if (formData.industryNumber) {
			const industryNumber = formData.industryNumber.toString();

			await updateUserMutation.mutateAsync(
				{
					industryNumber,
				},
				{
					onSuccess: (data) => {
						setError({
							error: false,
							message: '',
						});
						localStorage.setItem('industryNumber', industryNumber);
                        setShow(false);
					},
					onError: (err: any) => {
						setError({
							error: true,
							message: SERVER_DOWN,
						});
					},
				}
			);
		}
	};

	useEffect(() => {
		if (!show) {
			setError({
				error: false,
				message: '',
			});
		}
	}, [show]);

	return (
		<Modal opened={show} onClose={() => setShow(false)} title={<Title order={3}>Add Industry Number</Title>}>
			<Grid>
				{error.error && (
					<Grid.Col span={12}>
						{!!error?.error && <span style={{ color: 'red' }}>{error.message}</span>}
					</Grid.Col>
				)}
				<form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
					<Grid.Col span={12} style={{ marginTop: 'auto' }}>
						<FormInputWrapperComponent
							label="Industry Number"
							name="industryNumber"
							pattern="/^[0-9]{1,10}$/"
							placeholder="Enter your industry number"
							required={true}
							register={register}
							error={
								!!errorFields?.includes('industryNumber')
									? 'Industry Number must be a number within 10 digits'
									: formState.errors.industryNumber?.type === 'pattern'
									? 'Industry Number must be a number within 10 digits'
									: ''
							}
						/>
					</Grid.Col>
					<Grid.Col span={12}>
						<Button fullWidth type="submit" disabled={!formState.isValid}>
							{updateUserMutation.isLoading ? (
								<Loader color="white" variant="dots" size="lg" />
							) : (
								'Add'
							)}
						</Button>
					</Grid.Col>
				</form>
			</Grid>
		</Modal>
	);
};

export default AddIndustryNumModal;
