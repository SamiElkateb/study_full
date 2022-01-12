import { useNavigate } from 'react-router-dom';
import LearnModuleSection from '../../../components/Learn/LearnModuleSection/LearnModuleSection';
import Button from '../../../components/UserEvents/Button/Button';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import classes from './Manage.module.scss';

const Manage: React.FC = (props) => {
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

	const navigate = useNavigate();
	const goToLessonHandler = () => {
		navigate(`/study/manage-cards/${selectedLesson}`);
	};

	return (
		<>
			<h1>Manage</h1>
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
				<Button
					className={classes.button}
					size="big"
					onClick={goToLessonHandler}
				>
					Manage lesson cards
				</Button>
			)}
		</>
	);
};

export default Manage;
