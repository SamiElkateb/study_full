import AddLearnModule from '../../../components/Learn/AddLearnModule/AddLearnModule';
import LearnCard from '../../../components/Learn/LearnCard/LearnCard';
import Carousel from '../../../components/UI/Carousel/Carousel';
import Button from '../../../components/UserEvents/Button/Button';
import { Course } from '../../../DataStructures/LearnModule';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import { useShowAddLearnModule } from '../../../hooks/useToggleVisible';
import classes from './ManageCards.module.scss';

//TODO: REFACTOR IN SECTIONS

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
		updateCoursesHandler,
		updateChaptersHandler,
		updateLessonsHandler,
	} = useNavigateLearnModules();
	const {
		showAddCourse,
		showAddChapter,
		showAddLesson,
		toggleShowAddCourse,
		toggleShowAddChapter,
		toggleShowAddLesson,
	} = useShowAddLearnModule();

	const addedCourseHandler = () => {
		updateCoursesHandler();
		toggleShowAddCourse(false);
	};
	const addedChapterHandler = () => {
		updateChaptersHandler();
		toggleShowAddChapter(false);
	};
	const addedLessonHandler = () => {
		updateLessonsHandler();
		toggleShowAddLesson(false);
	};

	return (
		<>
			<h1>Manage Cards</h1>
			<h2>Courses</h2>
			<Carousel length={courses.length}>
				<Button
					styling="card"
					onClick={toggleShowAddCourse.bind(null, true)}
					selected={showAddCourse}
				>
					Add
				</Button>
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
			{showAddCourse && (
				<AddLearnModule type="course" onAdded={addedCourseHandler} />
			)}

			{showChapters && (
				<div className={classes.chapters}>
					<h2>Chapters</h2>
					<Carousel length={courses.length}>
						<Button
							styling="card"
							onClick={toggleShowAddChapter.bind(null, true)}
							selected={showAddChapter}
						>
							Add
						</Button>
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
					{showAddChapter && (
						<AddLearnModule
							type="chapter"
							courseId={selectedCourse}
							onAdded={addedChapterHandler}
						/>
					)}
				</div>
			)}

			{showLessons && (
				<div className={classes.lessons}>
					<h2>Lessons</h2>
					<Carousel length={lessons.length}>
						<Button
							styling="card"
							onClick={toggleShowAddLesson.bind(null, true)}
							selected={showAddLesson}
						>
							Add
						</Button>
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
					{showAddLesson && (
						<AddLearnModule
							type="lesson"
							onAdded={addedLessonHandler}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default ManageCards;
