import { readFile, writeFile } from "fs/promises";

const INPUT_WORDS_PATH = "./input/words.txt";
const OUTPUT_FREQ_DEFUALT_PATH = "./output/words.json";
const OUTPUT_FREQ_SORTED_PATH = "./output/words_sorted.json";
const WORD_SEPARATOR = "\r\n";
const COMBO_LENGTHS = [2, 3, 4];
const FREQ_THRESHOLD = 100;

const defaultOutput = {};
const sortedOutput = {};

const data = await readFile(INPUT_WORDS_PATH, "utf-8");
const words = data.split(WORD_SEPARATOR);

for (const length of COMBO_LENGTHS) {
	const frequencies: { [combo: string]: number } = {};

	for (const word of words) {
		if (word.length <= length) continue;

		const combos = new Set<string>();

		for (let i = 0; i < word.length - length + 1; i++)
			combos.add(word.substring(i, i + length));

		for (const combo of combos)
			frequencies[combo] = (frequencies[combo] || 0) + 1;
	}

	for (const [combo, freq] of Object.entries(frequencies)) {
		if (freq >= FREQ_THRESHOLD) continue;
		delete frequencies[combo];
	}

	defaultOutput[length] = frequencies;
	sortedOutput[length] = Object.entries(frequencies).sort(
		(a, b) => b[1] - a[1]
	);
}

writeFile(OUTPUT_FREQ_DEFUALT_PATH, JSON.stringify(defaultOutput));
writeFile(OUTPUT_FREQ_SORTED_PATH, JSON.stringify(sortedOutput));
