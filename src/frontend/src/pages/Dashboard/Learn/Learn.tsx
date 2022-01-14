import LearnModuleSection from '../../../components/Learn/LearnModuleSection/LearnModuleSection';
import Card from '../../../components/UI/Card/Card';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import Button from '../../../components/UserEvents/Button/Button';
import useNavigateLearnModules from '../../../hooks/useNavigateLearnModules';
import SectionTitle from '../SectionTitle/SectionTitle';
import classes from './Learn.module.scss';
import sectionTitlesData from '../../../data/sectionTitlesData.json';

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
	const { title, description } = sectionTitlesData.learn;
	return (
		<Wrapper>
			<SectionTitle
				title={title}
				description={description}
				iconName="rocket"
			/>
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
					Start learning
				</Button>
			)}
		</Wrapper>
	);
};

export default Learn;
