import React, { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
interface ArticleParamsFormProps {
	initialState: ArticleStateType;
	onApply: (newState: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	initialState,
	onApply,
	onReset,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>({
		...defaultArticleState,
	});

	const containerRef = useRef<HTMLDivElement | null>(null);
	useOutsideClickClose({
		isOpen,
		rootRef: containerRef,
		onChange: (newValue) => setIsOpen(newValue),
	});

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};
	useEffect(() => {
		setFormState({ ...initialState });
	}, [initialState]);

	const handleApply = () => {
		onApply(formState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={containerRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(newValue) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: newValue,
							}))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(newValue) =>
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: newValue,
							}))
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(newValue) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: newValue,
							}))
						}
					/>

					<Separator></Separator>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(newValue) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: newValue,
							}))
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(newValue) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: newValue,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
