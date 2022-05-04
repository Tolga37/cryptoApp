import I18n from "i18n-js";
import * as RnLocalize from 'react-native-localize';
import {I18nManager} from 'react-native';
import en from './en';
import tr from './tr';

const locales = RnLocalize.getLocales(); // cihazın tercih edilen dil listesini getirir



I18n.locale = locales[0].languageTag // dilimizin dil kodunu getiriyor. Örneğin türkçe = tr

export const isRtl = locales[0].isRTL // sağdan sola mı soldan sağa mı yazılıyor 'u belirtiyor.

I18nManager.forceRTL = isRtl //arayüzdeki bileşenlerin soldan sağa yerine sağdan sola dizilmesini zorunlu tutar

I18n.fallbacks = true // belirtilen dile ait kayıt olmadığında bir sonraki dilden telafi eder

I18n.locales.no = 'tr' // default dil

I18n.translations = { // diller
    tr,
    en
}
export default I18n;

