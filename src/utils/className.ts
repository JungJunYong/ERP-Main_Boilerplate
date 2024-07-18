type ClassNameObject = {
  [key: string]: boolean;
};


export function setClassName(classNames: ClassNameObject): string {
  return Object.entries(classNames).reduce((acc, [clsName, value]) => {
    if (value) {
      return `${acc} ${clsName}`;
    }
    return acc;
  }, '').trim();
}
