import { Chapter, Course } from '../../DataStructures/LearnModule';
import { learnModule } from '../../types/learnModules';

const learnModuleHasIcon = (learnModule: learnModule | undefined) => {
	if (learnModule instanceof Course) return true;
	if (learnModule instanceof Chapter) return true;
	return false;
};
export default learnModuleHasIcon;
