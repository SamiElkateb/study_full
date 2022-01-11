import LearnModuleSection from '../../../components/Learn/LearnModuleSection/LearnModuleSection';
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
	} = useNavigateLearnModules();

	return (
		<>
			<h1>Manage Cards</h1>
			<LearnModuleSection
				learnModuleType="course"
				learnModules={courses}
				selectedLearnModule={selectedCourse}
				onNavigate={navigateToChapterHandler}
				onAdded={updateCoursesHandler}
			/>

			{showChapters && (
				<LearnModuleSection
					learnModuleType="chapter"
					learnModules={chapters}
					selectedLearnModule={selectedChapter}
					selectedParent={selectedCourse}
					onNavigate={navigateToLessonHandler}
					onAdded={updateChaptersHandler}
				/>
			)}
			{showLessons && (
				<LearnModuleSection
					learnModuleType="lesson"
					learnModules={lessons}
					selectedLearnModule={selectedLesson}
					selectedParent={selectedChapter}
					onAdded={updateLessonsHandler}
				/>
			)}
		</>
	);
};

export default ManageCards;
