import { iconNamesType, sizes } from '../../../types/types';
import { iconSizes } from '../../../constants/Size';
import { IoCloseSharp, IoLogoHtml5, IoRocket } from 'react-icons/io5';
import {
	SiDocker,
	SiJavascript,
	SiKubernetes,
	SiReact,
	SiTypescript,
} from 'react-icons/si';
import classes from './Card.module.scss';
import { IoMdCalendar } from 'react-icons/io';
import { AiTwotoneTrophy } from 'react-icons/ai';
import { FaDatabase, FaGit, FaSass, FaServer } from 'react-icons/fa';
import { DiCss3 } from 'react-icons/di';
import { BsGithub, BsSquareFill } from 'react-icons/bs';
import { FiCheckCircle } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { HiDotsHorizontal } from 'react-icons/hi';
interface props {
	name: iconNamesType;
	size?: sizes;
	color?: string;
	className?: string;
}
const Icon: React.FC<props> = (props) => {
	const { name, size, color } = props;
	const iconSize = size ? iconSizes[size] : undefined;
	const { className = '' } = props;
	if (name === 'close') {
		return (
			<IoCloseSharp size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'options') {
		return (
			<HiDotsHorizontal
				size={iconSize}
				color={color}
				className={className}
			/>
		);
	}

	if (name === 'calendar') {
		return (
			<IoMdCalendar size={iconSize} color={color} className={className} />
		);
	}

	if (name === 'trophy') {
		return (
			<AiTwotoneTrophy
				size={iconSize}
				color={color}
				className={className}
			/>
		);
	}
	if (name === 'rocket') {
		return <IoRocket size={iconSize} color={color} className={className} />;
	}
	if (name === 'sql') {
		return (
			<FaDatabase size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'git') {
		return <FaGit size={iconSize} color={color} className={className} />;
	}
	if (name === 'javascript') {
		return (
			<SiJavascript size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'css') {
		return <DiCss3 size={iconSize} color={color} className={className} />;
	}
	if (name === 'sass') {
		return <FaSass size={iconSize} color={color} className={className} />;
	}
	if (name === 'typescript') {
		return (
			<SiTypescript size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'docker') {
		return <SiDocker size={iconSize} color={color} className={className} />;
	}
	if (name === 'kubernetes') {
		return (
			<SiKubernetes size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'html') {
		return (
			<IoLogoHtml5 size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'done') {
		return (
			<FiCheckCircle
				size={iconSize}
				color={color}
				className={className}
			/>
		);
	}
	if (name === 'square') {
		return (
			<BsSquareFill size={iconSize} color={color} className={className} />
		);
	}
	if (name === 'react') {
		return <SiReact size={iconSize} color={color} className={className} />;
	}
	if (name === 'backend') {
		return <FaServer size={iconSize} color={color} className={className} />;
	}
	if (name === 'github') {
		return <BsGithub size={iconSize} color={color} className={className} />;
	}

	return <IoRocket size={iconSize} color={color} className={className} />;
};

export default Icon;
