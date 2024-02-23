import { faker } from "@faker-js/faker";

export const useRandomColors = (numberOfColors: number) => {
	return new Array(numberOfColors).fill(0).map((v, i) => faker.color.rgb({ casing: "upper" }));
};
