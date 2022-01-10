import { iconNames } from '../../constants/IconNames';

const isIconName = (name: string) => {
	if (name === 'close') return true;
	if (name === 'question') return true;
	if (name === 'check') return true;
	if (name === 'flag') return true;
	if (name === 'calendar') return true;
	if (name === 'trophy') return true;
	if (name === 'curved-flag') return true;
	if (name === 'html') return true;
	if (name === 'sql') return true;
	if (name === 'git') return true;
	if (name === 'github') return true;
	if (name === 'javascript') return true;
	if (name === 'typescript') return true;
	if (name === 'docker') return true;
	if (name === 'kubernetes') return true;
	if (name === 'css') return true;
	if (name === 'sass') return true;
	if (name === 'arrowdown') return true;
	if (name === 'done') return true;
	if (name === 'square') return true;
	if (name === 'react') return true;
	if (name === 'backend') return true;
	return false;
};

export default isIconName;
