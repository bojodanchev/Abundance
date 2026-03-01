// ============================================================
// Numerology & Astrology Calculations
// ============================================================

// --- Core Reduction Helper ---

export function reduceToDigit(n: number, preserveMaster = true): number {
  if (preserveMaster && (n === 11 || n === 22 || n === 33)) return n;
  while (n > 9) {
    n = String(n)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0);
    if (preserveMaster && (n === 11 || n === 22 || n === 33)) return n;
  }
  return n;
}

// --- Life Path Number (Pythagorean Numerology) ---

export function calculateLifePath(birthDate: string): {
  number: number;
  isMaster: boolean;
} {
  // birthDate = "YYYY-MM-DD"
  const [year, month, day] = birthDate.split("-").map(Number);
  const reducedMonth = reduceToDigit(month);
  const reducedDay = reduceToDigit(day);
  const reducedYear = reduceToDigit(
    String(year)
      .split("")
      .reduce((sum, d) => sum + Number(d), 0)
  );
  const total = reducedMonth + reducedDay + reducedYear;
  const lifePathNumber = reduceToDigit(total);
  return {
    number: lifePathNumber,
    isMaster: [11, 22, 33].includes(lifePathNumber),
  };
}

// --- Sun Sign from Birth Date ---

const ZODIAC_SIGNS = [
  { sign: "Capricorn", start: [1, 1], end: [1, 19] },
  { sign: "Aquarius", start: [1, 20], end: [2, 18] },
  { sign: "Pisces", start: [2, 19], end: [3, 20] },
  { sign: "Aries", start: [3, 21], end: [4, 19] },
  { sign: "Taurus", start: [4, 20], end: [5, 20] },
  { sign: "Gemini", start: [5, 21], end: [6, 20] },
  { sign: "Cancer", start: [6, 21], end: [7, 22] },
  { sign: "Leo", start: [7, 23], end: [8, 22] },
  { sign: "Virgo", start: [8, 23], end: [9, 22] },
  { sign: "Libra", start: [9, 23], end: [10, 22] },
  { sign: "Scorpio", start: [10, 23], end: [11, 21] },
  { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  { sign: "Capricorn", start: [12, 22], end: [12, 31] },
] as const;

export function getSunSign(birthDate: string): string {
  const [, month, day] = birthDate.split("-").map(Number);
  if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error(`Invalid birth date for Sun Sign calculation: ${birthDate}`);
  }
  for (const z of ZODIAC_SIGNS) {
    const afterStart =
      month > z.start[0] || (month === z.start[0] && day >= z.start[1]);
    const beforeEnd =
      month < z.end[0] || (month === z.end[0] && day <= z.end[1]);
    if (afterStart && beforeEnd) return z.sign;
  }
  // This should be unreachable with valid month/day, but guard anyway
  throw new Error(`Could not determine Sun Sign for date: ${birthDate}`);
}

// --- Chinese Zodiac ---

const CHINESE_ANIMALS = [
  "Monkey",
  "Rooster",
  "Dog",
  "Pig",
  "Rat",
  "Ox",
  "Tiger",
  "Rabbit",
  "Dragon",
  "Snake",
  "Horse",
  "Goat",
] as const;

const CHINESE_ELEMENTS = [
  "Metal",
  "Metal",
  "Water",
  "Water",
  "Wood",
  "Wood",
  "Fire",
  "Fire",
  "Earth",
  "Earth",
] as const;

// Lunar New Year dates (month, day) for years 1920–2050.
// Birthdays before this date belong to the PREVIOUS Chinese year.
const LUNAR_NEW_YEAR: Record<number, [number, number]> = {
  1920: [2, 20], 1921: [2, 8], 1922: [1, 28], 1923: [2, 16], 1924: [2, 5],
  1925: [1, 24], 1926: [2, 13], 1927: [2, 2], 1928: [1, 23], 1929: [2, 10],
  1930: [1, 30], 1931: [2, 17], 1932: [2, 6], 1933: [1, 26], 1934: [2, 14],
  1935: [2, 4], 1936: [1, 24], 1937: [2, 11], 1938: [1, 31], 1939: [2, 19],
  1940: [2, 8], 1941: [1, 27], 1942: [2, 15], 1943: [2, 5], 1944: [1, 25],
  1945: [2, 13], 1946: [2, 2], 1947: [1, 22], 1948: [2, 10], 1949: [1, 29],
  1950: [2, 17], 1951: [2, 6], 1952: [1, 27], 1953: [2, 14], 1954: [2, 3],
  1955: [1, 24], 1956: [2, 12], 1957: [1, 31], 1958: [2, 18], 1959: [2, 8],
  1960: [1, 28], 1961: [2, 15], 1962: [2, 5], 1963: [1, 25], 1964: [2, 13],
  1965: [2, 2], 1966: [1, 21], 1967: [2, 9], 1968: [1, 30], 1969: [2, 17],
  1970: [2, 6], 1971: [1, 27], 1972: [2, 15], 1973: [2, 3], 1974: [1, 23],
  1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7], 1979: [1, 28],
  1980: [2, 16], 1981: [2, 5], 1982: [1, 25], 1983: [2, 13], 1984: [2, 2],
  1985: [2, 20], 1986: [2, 9], 1987: [1, 29], 1988: [2, 17], 1989: [2, 6],
  1990: [1, 27], 1991: [2, 15], 1992: [2, 4], 1993: [1, 23], 1994: [2, 10],
  1995: [1, 31], 1996: [2, 19], 1997: [2, 7], 1998: [1, 28], 1999: [2, 16],
  2000: [2, 5], 2001: [1, 24], 2002: [2, 12], 2003: [2, 1], 2004: [1, 22],
  2005: [2, 9], 2006: [1, 29], 2007: [2, 18], 2008: [2, 7], 2009: [1, 26],
  2010: [2, 14], 2011: [2, 3], 2012: [1, 23], 2013: [2, 10], 2014: [1, 31],
  2015: [2, 19], 2016: [2, 8], 2017: [1, 28], 2018: [2, 16], 2019: [2, 5],
  2020: [1, 25], 2021: [2, 12], 2022: [2, 1], 2023: [1, 22], 2024: [2, 10],
  2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13],
  2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19],
  2035: [2, 8], 2036: [1, 28], 2037: [2, 15], 2038: [2, 4], 2039: [1, 24],
  2040: [2, 12], 2041: [2, 1], 2042: [1, 22], 2043: [2, 10], 2044: [1, 30],
  2045: [2, 17], 2046: [2, 6], 2047: [1, 26], 2048: [2, 14], 2049: [2, 2],
  2050: [1, 23],
};

/**
 * Get the effective Chinese zodiac year, accounting for Lunar New Year.
 * Births before LNY belong to the previous year's animal/element.
 */
function getEffectiveChineseYear(year: number, month: number, day: number): number {
  const lny = LUNAR_NEW_YEAR[year];
  if (!lny) return year; // Fallback if year not in table
  const [lnyMonth, lnyDay] = lny;
  if (month < lnyMonth || (month === lnyMonth && day < lnyDay)) {
    return year - 1;
  }
  return year;
}

export function calculateChineseZodiac(birthDate: string): {
  animal: string;
  element: string;
  full: string;
} {
  const [gYear, month, day] = birthDate.split("-").map(Number);
  const effectiveYear = getEffectiveChineseYear(gYear, month, day);
  const animal = CHINESE_ANIMALS[effectiveYear % 12];
  const element = CHINESE_ELEMENTS[effectiveYear % 10];
  return {
    animal,
    element,
    full: `${element} ${animal}`,
  };
}

// --- Personal Year ---

export function calculatePersonalYear(
  birthDate: string,
  forYear?: number
): number {
  const [, month, day] = birthDate.split("-").map(Number);
  const year = forYear ?? new Date().getFullYear();
  const sum = year + month + day;
  return reduceToDigit(sum, false); // personal years are 1-9 only
}

// --- Universal Timing ---

export function calculateUniversalTiming(forDate?: Date): {
  universalYear: number;
  universalMonth: number;
} {
  const date = forDate ?? new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const universalYear = reduceToDigit(year, false);
  const universalMonth = reduceToDigit(universalYear + month, false);
  return { universalYear, universalMonth };
}
