import { Chapter, Course } from '../../DataStructures/LearnModule';
import { learnModule, learnModuleType } from '../../types/learnModules';

const learnModuleHasIcon = (
	learnModule: learnModule | learnModuleType | undefined
) => {
	if (learnModule instanceof Course) return true;
	if (learnModule instanceof Chapter) return true;
	if (learnModule === 'course') return true;
	if (learnModule === 'chapter') return true;
	return false;
};
export default learnModuleHasIcon;
