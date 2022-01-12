import LearnModuleSection from '../../../components/Learn/LearnModuleSection/LearnModuleSection';
import Button from '../../../components/UserEvents/Button/Button';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import classes from './Learn.module.scss';

const Learn: React.FC = (props) => {
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
		selectLessonHandler,
	} = useNavigateLearnModules();

	return (
		<>
			<h1>Learn</h1>
			<LearnModuleSection
				learnModuleType="course"
				learnModules={courses}
				selectedLearnModule={selectedCourse}
				onNavigate={navigateToChapterHandler}
			/>

			{showChapters && (
				<LearnModuleSection
					learnModuleType="chapter"
					learnModules={chapters}
					selectedLearnModule={selectedChapter}
					onNavigate={navigateToLessonHandler}
				/>
			)}
			{showLessons && (
				<LearnModuleSection
					learnModuleType="lesson"
					learnModules={lessons}
					onNavigate={selectLessonHandler}
					selectedLearnModule={selectedLesson}
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

export default Learn;
