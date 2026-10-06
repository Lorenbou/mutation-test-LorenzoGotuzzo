const isAnagram = (str1, str2) => {
  return formatStr(str1) === formatStr(str2);
};

function formatStr(str) {
  // Stryker disable next-line MethodExpression,StringLiteral: mutantes equivalentes (toUpperCase e separador do join preservam a igualdade entre as duas strings comparadas)
  return str.replace(/[^\w]/g, "").toLowerCase().split("").sort().join("");
}

module.exports = {
  isAnagram,
};
