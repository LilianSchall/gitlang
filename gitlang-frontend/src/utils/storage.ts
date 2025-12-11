import type { Word } from "../types";

const STORAGE_KEY = "gitlang_vocabulary";

const SAMPLE_WORDS: Word[] = [
	{
		id: "1",
		word: "안녕하세요",
		definition: "A formal greeting meaning hello",
		usage: "안녕하세요, 저는 한국인입니다",
		translation: "Hello",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "2",
		word: "감사합니다",
		definition: "Thank you (formal)",
		usage: "도와주셔서 감사합니다",
		translation: "Thank you",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "3",
		word: "미안합니다",
		definition: "I am sorry (formal)",
		usage: "늦어서 미안합니다",
		translation: "Sorry",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "4",
		word: "좋아요",
		definition: "It is good, I like it",
		usage: "이 음식이 정말 좋아요",
		translation: "Good / I like it",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "5",
		word: "물",
		definition: "Water",
		usage: "물을 한 잔 주세요",
		translation: "Water",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "6",
		word: "밥",
		definition: "Cooked rice / meal",
		usage: "밥을 먹어요",
		translation: "Rice / Meal",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "7",
		word: "친구",
		definition: "Friend",
		usage: "그는 나의 친구입니다",
		translation: "Friend",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
	{
		id: "8",
		word: "학교",
		definition: "School",
		usage: "학교에 갑니다",
		translation: "School",
		language: "Korean",
		createdAt: Date.now() - 86400000,
	},
];

export const getWords = (): Word[] => {
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) {
		return JSON.parse(stored);
	}
	setWords(SAMPLE_WORDS);
	return SAMPLE_WORDS;
};

export const setWords = (words: Word[]): void => {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
};

export const addWord = (word: Omit<Word, "id" | "createdAt">): Word => {
	const words = getWords();
	const newWord: Word = {
		...word,
		id: Date.now().toString(),
		createdAt: Date.now(),
	};
	words.push(newWord);
	setWords(words);
	return newWord;
};
