export type CssModuleClass = string | false | null | undefined;

export function createClassName(styles: Record<string, string>) {
  return (...classNames: CssModuleClass[]) =>
    classNames
      .filter((className): className is string => Boolean(className))
      .flatMap((className) => className.split(/\s+/))
      .map((className) => styles[className] ?? className)
      .join(" ");
}
