/**
 * Создает XML подпись для документа в формате XML по шаблону
 *
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @returns подпись
 */
export declare const createTemplatedXMLSignature: (thumbprint: string, unencryptedMessage: string) => Promise<string>;
