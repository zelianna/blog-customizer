import React, { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const toggleSidebar = () => {
		console.log('>>>>>>>>here');
		console.log(isOpen);
		setIsOpen((prev) => !prev);
		console.log(isOpen);
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
				   className={`${styles.container} ${isOpen ? styles.open : ''}`}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
