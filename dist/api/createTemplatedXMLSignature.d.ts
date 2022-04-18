/**
 * Создает XML подпись для документа в формате XML по шаблону
 *
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @param checkCertificate - необходимость валидации сертификата. (По умолчанию - true)
 * @returns подпись
 */
export declare const createTemplatedXMLSignature: (thumbprint: string, unencryptedMessage: string, checkCertificate?: boolean) => Promise<string>;
