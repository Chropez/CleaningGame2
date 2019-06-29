declare module 'animal-id' {
  export type Input = string;
  export function useAnimals(animals: string[]): void;
  export function useAdjectives(adjectives: string[]): void;
  export function getId(input?: Input): string;
}
