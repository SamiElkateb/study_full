import LearnModuleSection from '../../../components/Learn/LearnModuleSection/LearnModuleSection';
import Button from '../../../components/UserEvents/Button/Button';
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
		updateCoursesHandler,
		updateChaptersHandler,
		updateLessonsHandler,
		selectLessonHandler,
	} = useNavigateLearnModules();

	return (
		<>
			<h1>Manage Cards</h1>
			<LearnModuleSection
				learnModuleType="course"
				learnModules={courses}
				selectedLearnModule={selectedCourse}
				onNavigate={navigateToChapterHandler}
				onEdited={updateCoursesHandler}
			/>

			{showChapters && (
				<LearnModuleSection
					learnModuleType="chapter"
					learnModules={chapters}
					selectedLearnModule={selectedChapter}
					selectedParent={selectedCourse}
					onNavigate={navigateToLessonHandler}
					onEdited={updateChaptersHandler}
				/>
			)}
			{showLessons && (
				<LearnModuleSection
					learnModuleType="lesson"
					learnModules={lessons}
					selectedLearnModule={selectedLesson}
					onNavigate={selectLessonHandler}
					selectedParent={selectedChapter}
					onEdited={updateLessonsHandler}
				/>
			)}
			{selectedLesson && (
				<Button className={classes.button} size="big">
					Go to lesson
				</Button>
			)}
		</>
	);
};

export default ManageCards;
