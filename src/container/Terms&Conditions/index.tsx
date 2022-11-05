import React from 'react';
import { GenericHeader } from '../../components';
import { heading, terms, termsWithSubHeadings } from '../../constants/terms';
import emotionStyled from '@emotion/styled';

const FilterContainer = emotionStyled.h1`
  height: 100%;
`;

const TermsmainTitle = emotionStyled.h2`
  width: 100%;
  height: 10vh;
  color: #000000;
  font-size: 2.0rem;
  font-weight: 600;
  padding-top: 6px;
  padding-left: 25px !important;
  text-align: center;
  margin-top: center;
  margin-bottom: -18px;
`;
const TermsHeading = emotionStyled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  display: inline-block;
  border-bottom: 2px solid #e3676;
  margin-top: 20px;
  margin-bottom: 15px;

`;

const TermText = emotionStyled.div`
  line-height: 23px
`;

const TermSubHeading = emotionStyled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  display: inline-block;
  border-bottom: 2px solid #e3676;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const TermsOptionMainUl = emotionStyled.ul`
  list-style: lower-alpha;
  padding-left: 34px;
  line-height: 23px;
`;
const TermsOptionTextli = emotionStyled.li`

`;

const TermsOtherOptionMainUl = emotionStyled.ul`
  list-style: lower-roman;
  padding-left: 34px;
  line-height: 23px;

`;
const TermsOtherOptionTextLi = emotionStyled.li`


`;
const ContentWrapper = emotionStyled.div`
  width: 95%;
  margin: auto;
`;

const UlWrapper = emotionStyled.strong`
  padding-left: 12px;
`;

const TermsAndConditionsContainer = () => {
	const termsSubHeading = (subheadings: any) => {
		return subheadings.map((heading: any) => (
			<>
				<TermSubHeading>{heading.name}</TermSubHeading>
				<TermText>{heading.text}</TermText>
			</>
		));
	};

	const termsOptions = (options: any) => {
		return options.map((option: string) => <TermsOptionTextli key={option}>{option}</TermsOptionTextli>);
	};
	const termsOtherOptions = (otherOptions: any) => {
		return otherOptions.map((otheroption: string) => (
			<TermsOtherOptionTextLi key={otheroption}>{otheroption}</TermsOtherOptionTextLi>
		));
	};

	return (
		<>
			{/* <GenericHeader links={backLink}/> */}
			<GenericHeader links={[]} />
			<ContentWrapper>
				<FilterContainer>
					<TermsmainTitle>MerchFlow, Inc.’s Terms & Conditions</TermsmainTitle>
				</FilterContainer>
				{heading.map((item, index) => (
					<>
						<TermsHeading>{item.name}</TermsHeading>
						<TermText>{item.text}</TermText>
					</>
				))}
				{terms.map((item) => (
					<>
						<TermsHeading>{item.name}</TermsHeading>
						{item.text && <TermText>{item.text}</TermText>}
						{item.options && (
							<>
								<UlWrapper className="d_block"> You Will Not </UlWrapper>{' '}
								<TermsOptionMainUl>{termsOptions(item.options)}</TermsOptionMainUl>
							</>
						)}
						{item.otherOptions && (
							<>
								{' '}
								<UlWrapper className="d_block">You hereby agree </UlWrapper>{' '}
								<TermsOtherOptionMainUl> {termsOtherOptions(item.otherOptions)}</TermsOtherOptionMainUl>
							</>
						)}
					</>
				))}
				{termsWithSubHeadings.map((item) => (
					<>
						<TermsHeading className={item.class ? item.class : ''}>{item.name}</TermsHeading>
						<div>{termsSubHeading(item.subheading)}</div>
					</>
				))}
			</ContentWrapper>
		</>
	);
};

export default TermsAndConditionsContainer;
