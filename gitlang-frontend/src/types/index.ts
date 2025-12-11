export interface Word {
	id: string;
	word: string; // in the target language
	definition: string;
	usage: string; // example usage
	translation: string; // in the user's spoken language
	language: string;
	createdAt: number;
}

export interface SearchResult {
	word: Word;
	matchPercentage: number;
}
