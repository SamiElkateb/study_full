import Carousel from '../../../components/UI/Carousel/Carousel';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import classes from './ManageCards.module.scss';

const ManageCards: React.FC = (props) => {
	const {
		showChapters,
		showLessons,
		courses,
		chapters,
		lessons,
		navigateToChapterHandler,
		navigateToLessonHandler,
	} = useNavigateLearnModules();

	return (
		<>
			<h1>Manage Cards</h1>
			<h2>Courses</h2>
			<Carousel list={courses} onClick={navigateToChapterHandler} />
			{showChapters && (
				<div className={classes.chapters}>
					<h2>Chapters</h2>
					<Carousel
						list={chapters}
						onClick={navigateToLessonHandler}
					/>
				</div>
			)}
			{showLessons && (
				<div className={classes.lessons}>
					<h2>Lessons</h2>
					<Carousel
						list={lessons}
						onClick={navigateToLessonHandler}
					/>
				</div>
			)}
		</>
	);
};

export default ManageCards;
