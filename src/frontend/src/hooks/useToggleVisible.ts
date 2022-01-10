import { useState } from 'react';

const useToggleVisible = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleIsVisible = (override?: boolean) => {
		if (typeof override !== 'undefined') {
			setIsVisible(override);
			return;
		}
		setIsVisible((prevState) => !prevState);
	};
	return {
		isVisible,
		toggleIsVisible,
	};
};

export default useToggleVisible;

const useShowAddLearnModule = () => {
	const { isVisible: showAddCourse, toggleIsVisible: toggleShowAddCourse } =
		useToggleVisible();
	const { isVisible: showAddChapter, toggleIsVisible: toggleShowAddChapter } =
		useToggleVisible();
	const { isVisible: showAddLesson, toggleIsVisible: toggleShowAddLesson } =
		useToggleVisible();

	return {
		showAddCourse,
		showAddChapter,
		showAddLesson,
		toggleShowAddCourse,
		toggleShowAddChapter,
		toggleShowAddLesson,
	};
};
export { useShowAddLearnModule, useToggleVisible };
