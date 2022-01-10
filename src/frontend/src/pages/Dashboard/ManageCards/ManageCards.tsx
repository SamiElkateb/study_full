import LearnCard from '../../../components/Learn/LearnCard/LearnCard';
import Carousel from '../../../components/UI/Carousel/Carousel';
import Button from '../../../components/UserEvents/Button/Button';
import { Course } from '../../../DataStructures/LearnModule';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import classes from './ManageCards.module.scss';

const ManageCards: React.FC = (props) => {
	const {
		showChapters,
		showLessons,
		courses,
		chapters,
		lessons,
		selectedCourse,
		selectedChapter,
		selectedLesson,
		navigateToChapterHandler,
		navigateToLessonHandler,
	} = useNavigateLearnModules();

	return (
		<>
			<h1>Manage Cards</h1>
			<h2>Courses</h2>
			<Carousel length={courses.length}>
				<Button styling="card">Add</Button>
				{courses.map((course) => {
					return (
						<LearnCard
							key={course.id}
							learningModule={course}
							selected={selectedCourse === course.id}
							onClick={navigateToChapterHandler.bind(
								null,
								course.id
							)}
						/>
					);
				})}
			</Carousel>

			{showChapters && (
				<div className={classes.chapters}>
					<h2>Chapters</h2>
					<Carousel length={courses.length}>
						<Button styling="card">Add</Button>
						{chapters.map((chapter) => {
							return (
								<LearnCard
									key={chapter.id}
									learningModule={chapter}
									selected={selectedChapter === chapter.id}
									onClick={navigateToLessonHandler.bind(
										null,
										chapter.id
									)}
								/>
							);
						})}
					</Carousel>
				</div>
			)}

			{showLessons && (
				<div className={classes.lessons}>
					<h2>Lessons</h2>
					<Carousel length={lessons.length}>
						<Button styling="card">Add</Button>
						{lessons.map((lesson) => {
							return (
								<LearnCard
									key={lesson.id}
									learningModule={lesson}
									selected={selectedLesson === lesson.id}
									onClick={() => {}}
								/>
							);
						})}
					</Carousel>
				</div>
			)}
		</>
	);
};

export default ManageCards;
