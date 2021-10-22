import { readFile, writeFile } from "fs/promises";

const INPUT_WORDS_PATH = "./input/words.txt";
const OUTPUT_FREQ_PATH = "./output/words.json";
const WORD_SEPARATOR = "\r\n";
const COMBO_LENGTHS = [2, 3, 4];

const output = {};

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

	output[length] = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);
}

writeFile(OUTPUT_FREQ_PATH, JSON.stringify(output));
