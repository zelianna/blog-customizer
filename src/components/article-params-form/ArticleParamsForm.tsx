import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {Text} from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import {RadioGroup} from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	ArticleStateType
} from 'src/constants/articleProps';


import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>({ ...defaultArticleState });
    
	
	const containerRef = useRef<HTMLDivElement | null>(null);
	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};
	const handleClickOutside = (event: MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};
	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);


	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside ref={containerRef} 
				   className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>	
				<form className={styles.form}>
				    <Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
                    <Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
					/>
					<RadioGroup
						title='Размер шрифта'
						name=''
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
                    />
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
					/>

					<Separator></Separator>

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
