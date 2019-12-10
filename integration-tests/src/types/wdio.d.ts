declare module WebdriverIO {
  // adding command to `browser`
  interface Browser {
    checkElement: (element: WebdriverIO.Element, tag: string, options?: any) => any
  }
}
