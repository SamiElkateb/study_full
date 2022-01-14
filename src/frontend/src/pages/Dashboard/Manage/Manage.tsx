import { useNavigate } from 'react-router-dom';
import LearnModuleSection from '../../../components/Learn/LearnModuleSection/LearnModuleSection';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import Button from '../../../components/UserEvents/Button/Button';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import SectionTitle from '../SectionTitle/SectionTitle';
import classes from './Manage.module.scss';
import sectionTitlesData from '../../../data/sectionTitlesData.json';

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
	const { title, description } = sectionTitlesData.manage;

	const navigate = useNavigate();
	const goToLessonHandler = () => {
		navigate(`/study/manage-cards/${selectedLesson}`);
	};

	return (
		<Wrapper>
			<SectionTitle
				title={title}
				description={description}
				iconName="edit"
			/>
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
		</Wrapper>
	);
};

export default Manage;
