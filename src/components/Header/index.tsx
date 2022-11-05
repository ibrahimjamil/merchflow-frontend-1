import React, { Fragment, useState, useContext } from 'react';
import { createStyles, Header, Container, Group, Burger, Paper, Transition } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import emotionStyled from '@emotion/styled';
import { useRouter } from 'next/router';
import { UserContext, UserType } from '../../guards/authGuard';
import InviteUserModal from './InviteUserModal';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
	root: {
		position: 'relative',
		zIndex: 1,
		backgroundColor: '#f4f6f8',
		borderBottom: 'none',
		marginBottom: '0px !important',
		height: '10vh',
	},

	dropdown: {
		position: 'absolute',
		top: HEADER_HEIGHT,
		left: 0,
		right: 0,
		zIndex: 0,
		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopWidth: 0,
		overflow: 'hidden',

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
		maxWidth: 'none',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: "#000000",
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,
		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		backgroundColor: 'auto',
		'&, &:hover': {
			backgroundColor: 'auto',
			color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
		},
	},
}));

const LogoText = emotionStyled.h1`
  color: #1C7ED6;
  font-family: 'Montserrat';
  margin-left: 10px
`;

type GenericHeaderProps = {
	links: {
		link: string;
		label: string;
	}[];
};


export function GenericHeader(props: GenericHeaderProps) {
	const [showInviteModal,  setShowInviteModal] = useState(false);
	const { links } = props;
	const user: UserType | null = useContext(UserContext);
	const router = useRouter();
	const { classes, cx } = useStyles();
	const [active, setActive] = useState(links[0].link);
	const [opened, toggleOpened] = useBooleanToggle(false);

	const items = links.map((link) => {
		if (link.label === 'Login') {
			if (!!user?.id) {
				<></>
			}else{
				return (
					<a
					key={link.label}
					href={link.link}
					className={cx(classes.link, { [classes.linkActive]: active === link.link })}
					onClick={(event) => {
						router.push('/login');
						event.preventDefault();
						setActive(link.link);
						toggleOpened(false);
					}}
					>
						{link.label}
				</a>
				)
			}
		}else if (link.label === 'Logout'){
			if (user?.id) {
				return (
				<a
					key={link.label}
					href={link.link}
					className={cx(classes.link, { [classes.linkActive]: active === link.link })}
					onClick={(event) => {
						localStorage.removeItem('accessToken');
						localStorage.removeItem('idToken');
						router.push('/login');
						event.preventDefault();
						setActive(link.link);
						toggleOpened(false);
					}}
					>
						{link.label}
				</a>
				)
			}
		}
		else if(link.label === 'Invite'){
			return (
				<a
				key={link.label}
				href={link.link}
				className={cx(classes.link, { [classes.linkActive]: active === link.link })}
				onClick={(event) => {
					event.preventDefault();
					setActive(link.link);
					setShowInviteModal(true);
				}}
				>
					{link.label}
				</a>
			)
		}
		else{
			return (
				<a
				key={link.label}
				href={link.link}
				className={cx(classes.link, { [classes.linkActive]: active === link.link })}
				onClick={(event) => {
					event.preventDefault();
					setActive(link.link);
					toggleOpened(false);
				}}
				>
					{link.label}
				</a>
			)
		}
	});

	return (
		<Fragment>
			<Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
				<Container className={classes.header}>
					<LogoText>MerchFlow</LogoText>
					<Group spacing={5} className={classes.links}>
						{items}
					</Group>

					<Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />

					<Transition transition="pop-top-right" duration={200} mounted={opened}>
						{(styles) => (
							<Paper className={classes.dropdown} withBorder style={styles}>
								{items}
							</Paper>
						)}
					</Transition>
				</Container>
			</Header>
			<InviteUserModal  opened={showInviteModal} setOpened={setShowInviteModal}/>
		</Fragment>
	);
}
