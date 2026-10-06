const { isAnagram } = require("../src/anagram");

describe("anagram", () => {
  test("deve retornar true para palavras anagramas ignorando maiusculas e pontuacao", () => {
    // Arrange
    const primeira = "Dormitory";
    const segunda = "Dirty room!!";

    // Act
    const resultado = isAnagram(primeira, segunda);

    // Assert
    expect(resultado).toBe(true);
  });

  test("deve retornar false para palavras que nao sao anagramas", () => {
    // Arrange
    const primeira = "teste";
    const segunda = "toast";

    // Act
    const resultado = isAnagram(primeira, segunda);

    // Assert
    expect(resultado).toBe(false);
  });
});

describe("anagram (mutation tests)", () => {
  test("deve retornar false quando os caracteres sao os mesmos mas em quantidades diferentes", () => {
    // Arrange
    const primeira = "aab";
    const segunda = "abb";

    // Act
    const resultado = isAnagram(primeira, segunda);

    // Assert
    expect(resultado).toBe(false);
  });
});
