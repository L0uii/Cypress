
/**
 * 
 * convert from { 'example.key': value }
 * to { exampleKey: value }
 * 
 * it was made to avoid the object call like: obj['example.key']
 * 
 */
export function convertMetadata(metadata: Object): Object {
  return Object.entries(metadata)
    .reduce((previousValue, [key, value]) => {
    return { ...previousValue, ...{ [convertMetadataKey(key)]: value } }
    }, {}) as Object;
}

function convertMetadataKey(key: string): string {
  const splitedKey = key.split(':');
  return splitedKey[0] + splitedKey[1].replace(splitedKey[1].charAt(0), splitedKey[1].charAt(0).toUpperCase())
}