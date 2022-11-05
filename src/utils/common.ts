export function stringToRegex(str: string) {
    const match = str.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
    return match ? 
      new RegExp(
        match[2],
        match[3]
          .split('')
          .filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
          .join('')
      ) 
      : new RegExp(str);
}
