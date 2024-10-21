const safeObjectDataGetter = (obj: any, path: string, defaultValue: any = null) => {
    return path.split('.').reduce((o, key) => (o || {})[key], obj) || defaultValue;
}

export default safeObjectDataGetter;