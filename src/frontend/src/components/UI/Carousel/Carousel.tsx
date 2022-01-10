import { useRef, useState } from 'react';
import { Course, Chapter, Lesson } from '../../../DataStructures/LearnModule';
import useCarousel from '../../../hooks/useCarousel';
import LearnCard from '../../Learn/LearnCard/LearnCard';
import classes from './Carousel.module.scss';

interface props {
	length: number;
}

const Carousel: React.FC<props> = (props) => {
	const { children, length } = props;
	const carouselRef = useRef<HTMLDivElement>(null);

	const {
		scrollLeftHandler,
		scrollRightHandler,
		canScrollLeft,
		canScrollRight,
	} = useCarousel(carouselRef, length);

	const leftVisibleClasses = canScrollLeft ? classes.visible : '';
	const rightVisibleClasses = canScrollRight ? classes.visible : '';
	return (
		<div className={classes.carousel}>
			<div className={`${classes.left} ${leftVisibleClasses}`}>
				<button onClick={scrollLeftHandler}>&lt;</button>
			</div>
			<div className={classes.carousel__inner} ref={carouselRef}>
				{children}
			</div>
			<div className={`${classes.right} ${rightVisibleClasses}`}>
				<button onClick={scrollRightHandler}>&gt;</button>
			</div>
		</div>
	);
};

export default Carousel;
