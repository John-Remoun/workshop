var longestCommonPrefix = function(strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let s of strs) {
    while (!s.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
};
