import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';

export type learnModule = Course | Chapter | Lesson;
export type learnModuleWithIcon = Course | Chapter;
export type learnModuleArray = Course[] | Chapter[] | Lesson[];
