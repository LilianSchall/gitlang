/**
 * Calculate the similarity between a search query and a target string
 * Returns a percentage (0-100) of how well they match
 */
export const calculateMatchPercentage = (
	query: string,
	target: string,
): number => {
	if (!query) return 0;

	const q = query.toLowerCase();
	const t = target.toLowerCase();

	// Exact match
	if (t === q) return 100;

	// Starts with
	if (t.startsWith(q)) return 90;

	// Contains
	if (t.includes(q)) return 70;

	// Fuzzy match - calculate based on character proximity
	let matches = 0;
	let queryIndex = 0;
	let targetIndex = 0;

	while (queryIndex < q.length && targetIndex < t.length) {
		if (q[queryIndex] === t[targetIndex]) {
			matches++;
			queryIndex++;
		}
		targetIndex++;
	}

	// Calculate percentage based on matched characters
	const matchPercentage = (matches / q.length) * 100;

	// Minimum threshold of 40% match
	return matchPercentage >= 40 ? matchPercentage : 0;
};

/**
 * Search words by query string
 * Searches both the word itself and its translation
 */
export const searchWords = (
	words: Array<{ word: string; translation: string; [key: string]: any }>,
	query: string,
): Array<{ item: any; matchPercentage: number }> => {
	if (!query.trim()) {
		return [];
	}

	const results = words
		.map((item) => {
			const wordMatch = calculateMatchPercentage(query, item.word);
			const translationMatch = calculateMatchPercentage(
				query,
				item.translation,
			);
			const matchPercentage = Math.max(wordMatch, translationMatch);

			return {
				item,
				matchPercentage,
			};
		})
		.filter((result) => result.matchPercentage > 0)
		.sort((a, b) => b.matchPercentage - a.matchPercentage);

	return results;
};
