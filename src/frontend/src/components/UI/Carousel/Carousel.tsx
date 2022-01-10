import { useRef, useState } from 'react';
import Chapter from '../../../DataStructures/Chapter';
import Course from '../../../DataStructures/Courses';
import Lesson from '../../../DataStructures/Lesson';
import useCarousel from '../../../hooks/useCarousel';
import LearnCard from '../../Learn/LearnCard/LearnCard';
import classes from './Carousel.module.scss';

interface props {
	list: Course[] | Chapter[] | Lesson[];
}

const Carousel: React.FC<props> = (props) => {
	const { list } = props;
	const carouselRef = useRef<HTMLDivElement>(null);

	const {
		scrollLeftHandler,
		scrollRightHandler,
		canScrollLeft,
		canScrollRight,
	} = useCarousel(carouselRef, list.length);

	const leftVisibleClasses = canScrollLeft ? classes.visible : '';
	const rightVisibleClasses = canScrollRight ? classes.visible : '';
	return (
		<div className={classes.carousel}>
			<div className={`${classes.left} ${leftVisibleClasses}`}>
				<button onClick={scrollLeftHandler}>&lt;</button>
			</div>
			<div className={classes.carousel__inner} ref={carouselRef}>
				{list.map((item) => {
					return (
						<LearnCard
							key={item.id}
							learningModule={item}
							onClick={() => {}}
						/>
					);
				})}
			</div>
			<div className={`${classes.right} ${rightVisibleClasses}`}>
				<button onClick={scrollRightHandler}>&gt;</button>
			</div>
		</div>
	);
};

export default Carousel;
