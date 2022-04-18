import { _afterPluginsLoaded } from '../helpers/_afterPluginsLoaded';
import { _extractMeaningfulErrorMessage } from '../helpers/_extractMeaningfulErrorMessage';
import { __cadesAsyncToken__, __createCadesPluginObject__, _generateCadesFn } from '../helpers/_generateCadesFn';
import { _getCadesCert } from '../helpers/_getCadesCert';

/**
 * Создает XML подпись для документа в формате XML по шаблону
 *
 *
 * @param thumbprint - отпечаток сертификата
 * @param unencryptedMessage - подписываемое сообщение в формате XML
 * @param checkCertificate - необходимость валидации сертификата. (По умолчанию - true)
 * @returns подпись
 */
export const createTemplatedXMLSignature = _afterPluginsLoaded(
  async (thumbprint: string, unencryptedMessage: string, checkCertificate = true): Promise<string> => {
    const { cadesplugin } = window;
    const cadesCertificate = await _getCadesCert(thumbprint);

    return eval(
      _generateCadesFn(function createXMLSignature(): string {
        let cadesSigner;
        let cadesSignedXML;

        try {
          cadesSigner = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.CPSigner');
          cadesSignedXML = __cadesAsyncToken__ + __createCadesPluginObject__('CAdESCOM.SignedXML');
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при инициализации подписи');
        }

        try {

          const signatureMethod = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34102012-gostr34112012-256';
          const digestMethod = 'urn:ietf:params:xml:ns:cpxmlsec:algorithms:gostr34112012-256';

          void (__cadesAsyncToken__ + cadesSigner.propset_Certificate(cadesCertificate));
          void (__cadesAsyncToken__ + cadesSigner.propset_CheckCertificate(checkCertificate));
          void (__cadesAsyncToken__ + cadesSignedXML.propset_Content(unencryptedMessage));
          void (
            __cadesAsyncToken__ + cadesSignedXML.propset_SignatureType(cadesplugin.CADESCOM_XML_SIGNATURE_TYPE_TEMPLATE)
          );
          void (__cadesAsyncToken__ + cadesSignedXML.propset_SignatureMethod(signatureMethod));
          void (__cadesAsyncToken__ + cadesSignedXML.propset_DigestMethod(digestMethod));
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при указании данных для подписи');
        }

        let signature: string;

        try {
          signature = __cadesAsyncToken__ + cadesSignedXML.Sign(cadesSigner);
        } catch (error) {
          console.error(error);

          throw new Error(_extractMeaningfulErrorMessage(error) || 'Ошибка при подписании данных');
        }

        return signature;
      }),
    );
  },
);
